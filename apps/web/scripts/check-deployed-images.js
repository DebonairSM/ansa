/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WEB_ROOT = path.join(__dirname, '..');
const PUBLIC_ROOT = path.join(WEB_ROOT, 'public');
const CONTENT_ROOT = path.join(WEB_ROOT, 'src', 'content');
const DEFAULT_TIMEOUT_MS = 15_000;
const DEFAULT_CONCURRENCY = 6;

function usage() {
  console.log(`Usage:
  npm run deploy:check-images -- https://example.org
  npm run deploy:check-images -- https://example.org /uploads/2024/new-profile.jpg
  npm run assets:check

Without image path arguments, the check automatically verifies every team profile image and
project featured image referenced by the current deployment. The base URL can
also come from DEPLOY_URL, RENDER_EXTERNAL_URL, or NEXT_PUBLIC_SITE_URL. Named
--base-url and --image options are supported when invoking this file directly.`);
}

function parseArgs(argv) {
  const options = {
    baseUrl:
      process.env.DEPLOY_URL ||
      process.env.RENDER_EXTERNAL_URL ||
      process.env.NEXT_PUBLIC_SITE_URL,
    images: [],
    timeoutMs: DEFAULT_TIMEOUT_MS,
    concurrency: DEFAULT_CONCURRENCY,
    localOnly: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    const [flag, inlineValue] = arg.split(/=(.*)/s, 2);
    const nextValue = () => {
      if (inlineValue !== undefined) return inlineValue;
      index += 1;
      if (index >= argv.length) throw new Error(`Missing value for ${flag}`);
      return argv[index];
    };

    if (flag === '--base-url') options.baseUrl = nextValue();
    else if (flag === '--image') options.images.push(nextValue());
    else if (flag === '--timeout-ms') options.timeoutMs = Number(nextValue());
    else if (flag === '--concurrency') options.concurrency = Number(nextValue());
    else if (flag === '--local-only') options.localOnly = true;
    else if (flag === '--help' || flag === '-h') options.help = true;
    else if (!arg.startsWith('-') && /^https?:\/\//i.test(arg)) options.baseUrl = arg;
    else if (!arg.startsWith('-') && arg.startsWith('/uploads/')) options.images.push(arg);
    else throw new Error(`Unknown argument: ${arg}`);
  }

  if (!Number.isInteger(options.timeoutMs) || options.timeoutMs < 1) {
    throw new Error('--timeout-ms must be a positive integer');
  }
  if (!Number.isInteger(options.concurrency) || options.concurrency < 1) {
    throw new Error('--concurrency must be a positive integer');
  }
  return options;
}

function readFrontmatterFiles(type, field) {
  const references = [];
  for (const locale of ['pt', 'en']) {
    const directory = path.join(CONTENT_ROOT, type, locale);
    if (!fs.existsSync(directory)) continue;

    for (const filename of fs.readdirSync(directory).filter((name) => name.endsWith('.md'))) {
      const fullPath = path.join(directory, filename);
      const data = matter(fs.readFileSync(fullPath, 'utf8')).data || {};
      if (typeof data[field] !== 'string' || data[field].trim() === '') continue;
      references.push({
        imagePath: data[field].trim(),
        source: path.relative(WEB_ROOT, fullPath).replace(/\\/g, '/'),
        kind: type === 'team' ? 'profile' : 'project',
      });
    }
  }
  return references;
}

function discoverReferences() {
  return [
    ...readFrontmatterFiles('team', 'image'),
    ...readFrontmatterFiles('projects', 'featuredImage'),
  ];
}

function normalizeImagePath(imagePath) {
  let parsed;
  try {
    parsed = new URL(imagePath, 'https://local.invalid');
  } catch {
    throw new Error(`Invalid image path: ${imagePath}`);
  }
  if (parsed.origin !== 'https://local.invalid' || !parsed.pathname.startsWith('/uploads/')) {
    throw new Error(`Image must use a local /uploads/ path: ${imagePath}`);
  }
  return decodeURIComponent(parsed.pathname);
}

function assertLocalImage(imagePath, source) {
  const normalized = normalizeImagePath(imagePath);
  const relativePath = normalized.replace(/^\/+/, '');
  const fullPath = path.resolve(PUBLIC_ROOT, relativePath);
  const publicPrefix = `${path.resolve(PUBLIC_ROOT)}${path.sep}`;

  if (!fullPath.startsWith(publicPrefix)) {
    throw new Error(`Image escapes public directory: ${imagePath}`);
  }
  if (!fs.existsSync(fullPath) || !fs.statSync(fullPath).isFile()) {
    throw new Error(`Local image is missing: ${imagePath}${source ? ` (${source})` : ''}`);
  }
  if (fs.statSync(fullPath).size === 0) {
    throw new Error(`Local image is empty: ${imagePath}${source ? ` (${source})` : ''}`);
  }
  return normalized;
}

function uniqueReferences(references) {
  const unique = new Map();
  for (const reference of references) {
    const normalized = assertLocalImage(reference.imagePath, reference.source);
    if (!unique.has(normalized)) unique.set(normalized, { ...reference, imagePath: normalized });
  }
  return [...unique.values()];
}

async function fetchImage(baseUrl, reference, timeoutMs) {
  const url = new URL(reference.imagePath, baseUrl);
  url.searchParams.set('__deploy_check', Date.now().toString());
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'image/*',
        Range: 'bytes=0-0',
        'Cache-Control': 'no-cache',
      },
      cache: 'no-store',
      redirect: 'follow',
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.toLowerCase().startsWith('image/')) {
      throw new Error(`unexpected content-type ${contentType || '(missing)'}`);
    }

    if (!response.body) throw new Error('empty response body');
    const reader = response.body.getReader();
    const firstChunk = await reader.read();
    await reader.cancel();
    if (firstChunk.done || !firstChunk.value || firstChunk.value.byteLength === 0) {
      throw new Error('empty response body');
    }

    return `${response.status} ${contentType.split(';')[0]}`;
  } finally {
    clearTimeout(timer);
  }
}

async function checkInParallel(references, concurrency, check) {
  const failures = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < references.length) {
      const reference = references[nextIndex];
      nextIndex += 1;
      try {
        const result = await check(reference);
        console.log(`PASS ${reference.imagePath} (${result})`);
      } catch (error) {
        failures.push({ reference, error });
        console.error(`FAIL ${reference.imagePath}: ${error.message}`);
      }
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, references.length) }, () => worker()),
  );
  return failures;
}

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    usage();
    process.exit(1);
  }

  if (options.help) {
    usage();
    return;
  }
  let references;
  try {
    references = options.images.length
      ? options.images.map((imagePath) => ({ imagePath, source: 'command line', kind: 'explicit' }))
      : discoverReferences();
    references = uniqueReferences(references);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }

  if (references.length === 0) {
    console.error('No profile or project images were found to check.');
    process.exit(1);
  }

  if (options.localOnly) {
    console.log(`Local asset check passed: ${references.length} profile/project image(s) exist and are non-empty.`);
    return;
  }

  if (!options.baseUrl) {
    console.error('Missing deployment URL. Pass --base-url or set DEPLOY_URL.');
    usage();
    process.exit(1);
  }

  let baseUrl;
  try {
    baseUrl = new URL(options.baseUrl);
    if (!['http:', 'https:'].includes(baseUrl.protocol)) throw new Error('unsupported protocol');
  } catch (error) {
    console.error(`Invalid deployment URL "${options.baseUrl}": ${error.message}`);
    process.exit(1);
  }

  console.log(`Checking ${references.length} deployed image(s) at ${baseUrl.origin}...`);
  const failures = await checkInParallel(
    references,
    options.concurrency,
    (reference) => fetchImage(baseUrl, reference, options.timeoutMs),
  );

  if (failures.length > 0) {
    console.error(`Deployed image check failed: ${failures.length}/${references.length} image(s) unavailable.`);
    process.exit(1);
  }
  console.log(`Deployed image check passed: ${references.length}/${references.length} image(s) available.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
