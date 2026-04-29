/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WEB_ROOT = path.join(__dirname, '..');
const CONTENT_DIR = path.join(WEB_ROOT, 'src', 'content');
const PUBLIC_DIR = path.join(WEB_ROOT, 'public');
const APP_LANG_DIR = path.join(WEB_ROOT, 'src', 'app', '(lang)');
const LOCAL_PROJECTS_TS = path.join(WEB_ROOT, 'src', 'lib', 'localProjects.ts');

const LOCALES = ['pt', 'en'];

const REQUIRED_FRONTMATTER = {
  pages: ['slug', 'title', 'locale'],
  projects: ['slug', 'title', 'locale', 'description', 'featuredImage'],
  categories: ['slug', 'title', 'locale'],
};

const errors = [];
const stats = { files: 0, images: 0, links: 0 };

function relWeb(p) {
  return path.relative(WEB_ROOT, p).replace(/\\/g, '/');
}

function fail(file, msg) {
  errors.push({ file, msg });
}

function loadSlugMap() {
  if (!fs.existsSync(LOCAL_PROJECTS_TS)) {
    console.warn(`localProjects.ts not found, skipping slug map: ${LOCAL_PROJECTS_TS}`);
    return {};
  }
  const src = fs.readFileSync(LOCAL_PROJECTS_TS, 'utf-8').replace(/\r\n/g, '\n');
  const block = src.match(/slugMap[^=]*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return {};
  const map = {};
  const re = /['"]([^'"]+)['"]\s*:\s*\{\s*pt:\s*['"]([^'"]+)['"]\s*,\s*en:\s*['"]([^'"]+)['"]\s*\}/g;
  let m;
  while ((m = re.exec(block[1]))) {
    map[m[1]] = { pt: m[2], en: m[3] };
  }
  return map;
}

function readContent(type) {
  const out = { pt: [], en: [] };
  for (const locale of LOCALES) {
    const dir = path.join(CONTENT_DIR, type, locale);
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter((f) => f.endsWith('.md'));
    for (const f of files) {
      const full = path.join(dir, f);
      const raw = fs.readFileSync(full, 'utf-8');
      stats.files += 1;
      let parsed;
      try {
        parsed = matter(raw);
      } catch (e) {
        fail(relWeb(full), `YAML parse error: ${e.message}`);
        continue;
      }
      out[locale].push({
        file: f,
        full,
        fileSlug: f.replace(/\.md$/, ''),
        data: parsed.data || {},
        content: parsed.content || '',
      });
    }
  }
  return out;
}

function validateFrontmatter(type, items) {
  const required = REQUIRED_FRONTMATTER[type];
  for (const locale of LOCALES) {
    for (const it of items[locale]) {
      const rel = relWeb(it.full);
      for (const f of required) {
        const v = it.data[f];
        if (v === undefined || v === null || v === '') {
          fail(rel, `Missing required frontmatter field: ${f}`);
        }
      }
      if (
        Object.prototype.hasOwnProperty.call(it.data, 'title') &&
        typeof it.data.title === 'string' &&
        it.data.title.trim() === 'undefined'
      ) {
        fail(rel, `Frontmatter title is the literal string "undefined"`);
      }
      if (it.data.locale && it.data.locale !== locale) {
        fail(rel, `Frontmatter locale "${it.data.locale}" does not match folder "${locale}"`);
      }
      if (it.data.slug && it.data.slug !== it.fileSlug) {
        fail(rel, `Frontmatter slug "${it.data.slug}" does not match filename "${it.fileSlug}"`);
      }
    }
  }
}

function checkDuplicateSlugs(items) {
  for (const locale of LOCALES) {
    const seen = new Map();
    for (const it of items[locale]) {
      const slug = it.data.slug || it.fileSlug;
      if (seen.has(slug)) {
        fail(relWeb(it.full), `Duplicate slug "${slug}" (also in ${seen.get(slug)})`);
      } else {
        seen.set(slug, it.file);
      }
    }
  }
}

function findPtForEn(enFileSlug, slugMap) {
  if (slugMap[enFileSlug]) return slugMap[enFileSlug].pt;
  for (const v of Object.values(slugMap)) {
    if (v.en === enFileSlug) return v.pt;
  }
  return enFileSlug;
}

function checkMissingTranslations(type, items, slugMap) {
  if (type === 'projects') {
    const ptByFile = new Map(items.pt.map((it) => [it.fileSlug, it]));
    const enByFile = new Map(items.en.map((it) => [it.fileSlug, it]));
    for (const pt of items.pt) {
      const expectedEn = slugMap[pt.fileSlug] ? slugMap[pt.fileSlug].en : pt.fileSlug;
      if (!enByFile.has(expectedEn)) {
        fail(relWeb(pt.full), `Missing en translation (expected src/content/projects/en/${expectedEn}.md)`);
      }
    }
    for (const en of items.en) {
      const expectedPt = findPtForEn(en.fileSlug, slugMap);
      if (!ptByFile.has(expectedPt)) {
        fail(relWeb(en.full), `Missing pt translation (expected src/content/projects/pt/${expectedPt}.md)`);
      }
    }
    return;
  }
  const ptSlugs = new Set(items.pt.map((it) => it.fileSlug));
  const enSlugs = new Set(items.en.map((it) => it.fileSlug));
  for (const it of items.pt) {
    if (!enSlugs.has(it.fileSlug)) {
      fail(relWeb(it.full), `Missing en translation (expected src/content/${type}/en/${it.fileSlug}.md)`);
    }
  }
  for (const it of items.en) {
    if (!ptSlugs.has(it.fileSlug)) {
      fail(relWeb(it.full), `Missing pt translation (expected src/content/${type}/pt/${it.fileSlug}.md)`);
    }
  }
}

function collectImageRefs(item) {
  const refs = [];
  const d = item.data;
  if (typeof d.featuredImage === 'string') refs.push(d.featuredImage);
  if (Array.isArray(d.gallery)) {
    for (const g of d.gallery) if (typeof g === 'string') refs.push(g);
  }
  if (Array.isArray(d.media)) {
    for (const m of d.media) {
      if (m && typeof m === 'object' && typeof m.url === 'string') refs.push(m.url);
    }
  }
  for (const m of item.content.matchAll(/!\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
    refs.push(m[1]);
  }
  for (const m of item.content.matchAll(/<img\s[^>]*src=["']([^"']+)["']/gi)) {
    refs.push(m[1]);
  }
  return refs;
}

function isLocalPath(ref) {
  return typeof ref === 'string' && ref.startsWith('/') && !ref.startsWith('//');
}

function checkImages(allItems) {
  for (const type of Object.keys(allItems)) {
    for (const locale of LOCALES) {
      for (const it of allItems[type][locale]) {
        const rel = relWeb(it.full);
        for (const ref of collectImageRefs(it)) {
          if (!isLocalPath(ref)) continue;
          stats.images += 1;
          const [pathOnly] = ref.split(/[?#]/);
          const abs = path.join(PUBLIC_DIR, pathOnly);
          if (!fs.existsSync(abs)) {
            fail(rel, `Missing image: ${ref}`);
          }
        }
      }
    }
  }
}

function routeExists(loc, segments) {
  if (segments.length === 0) {
    return fs.existsSync(path.join(APP_LANG_DIR, loc, 'page.tsx'));
  }
  const candidate = path.join(APP_LANG_DIR, loc, ...segments);
  if (!fs.existsSync(candidate)) return false;
  const stat = fs.statSync(candidate);
  if (!stat.isDirectory()) return false;
  for (const ext of ['tsx', 'ts', 'jsx', 'js']) {
    if (fs.existsSync(path.join(candidate, `page.${ext}`))) return true;
  }
  return false;
}

function resolveLink(url, locale, projectSlugs, categorySlugs) {
  const [pathOnly] = url.split(/[?#]/);
  if (!pathOnly || pathOnly === '/') return true;
  if (path.extname(pathOnly)) {
    return fs.existsSync(path.join(PUBLIC_DIR, pathOnly));
  }
  const segments = pathOnly.replace(/^\/+|\/+$/g, '').split('/').filter(Boolean);
  let loc = locale;
  let rest = segments;
  if (segments[0] === 'pt' || segments[0] === 'en') {
    loc = segments[0];
    rest = segments.slice(1);
  }
  if (rest.length === 0) return true;
  if (rest[0] === 'projects' && rest.length === 2) {
    return projectSlugs[loc].has(rest[1]);
  }
  if (rest[0] === 'categories' && rest.length === 2) {
    return categorySlugs[loc].has(rest[1]);
  }
  return routeExists(loc, rest);
}

function checkLinks(allItems) {
  const projectSlugs = {
    pt: new Set(allItems.projects.pt.map((it) => it.fileSlug)),
    en: new Set(allItems.projects.en.map((it) => it.fileSlug)),
  };
  const categorySlugs = {
    pt: new Set(allItems.categories.pt.map((it) => it.fileSlug)),
    en: new Set(allItems.categories.en.map((it) => it.fileSlug)),
  };
  for (const type of Object.keys(allItems)) {
    for (const locale of LOCALES) {
      for (const it of allItems[type][locale]) {
        const rel = relWeb(it.full);
        for (const m of it.content.matchAll(/(^|[^!])\[[^\]]*\]\(([^)\s]+)(?:\s+[^)]*)?\)/g)) {
          const url = m[2];
          if (!isLocalPath(url)) continue;
          if (path.extname(url.split(/[?#]/)[0])) continue;
          stats.links += 1;
          if (!resolveLink(url, locale, projectSlugs, categorySlugs)) {
            fail(rel, `Broken local link: ${url}`);
          }
        }
      }
    }
  }
}

function main() {
  if (!fs.existsSync(CONTENT_DIR)) {
    console.error(`Content directory not found: ${CONTENT_DIR}`);
    process.exit(1);
  }
  const slugMap = loadSlugMap();
  const items = {
    pages: readContent('pages'),
    projects: readContent('projects'),
    categories: readContent('categories'),
  };

  for (const type of Object.keys(items)) {
    validateFrontmatter(type, items[type]);
    checkDuplicateSlugs(items[type]);
    checkMissingTranslations(type, items[type], slugMap);
  }
  checkImages(items);
  checkLinks(items);

  const summary = `Checked ${stats.files} files, ${stats.images} image refs, ${stats.links} local links.`;

  if (errors.length === 0) {
    console.log(`${summary}`);
    console.log('Content check passed.');
    process.exit(0);
  }

  const byFile = new Map();
  for (const e of errors) {
    if (!byFile.has(e.file)) byFile.set(e.file, []);
    byFile.get(e.file).push(e.msg);
  }
  for (const [file, msgs] of byFile) {
    console.error(`\n${file}`);
    for (const msg of msgs) console.error(`  - ${msg}`);
  }
  console.error(`\n${summary}`);
  console.error(`Content check failed with ${errors.length} error(s) across ${byFile.size} file(s).`);
  process.exit(1);
}

main();
