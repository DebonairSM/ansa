const dns = require('dns');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const envPath = path.join(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  content.split(/\r?\n/).forEach((line) => {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let value = match[2].trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  });
}

const url = process.env.SUPABASE_URL;
if (!url) {
  console.error('SUPABASE_URL not set. Add it to apps/web/.env.local');
  process.exit(1);
}

const serviceKey = process.env.SUPABASE_SERVICE_KEY;
if (!serviceKey) {
  console.error('SUPABASE_SERVICE_KEY not set. Add the service_role key to apps/web/.env.local');
  process.exit(1);
}

let host;
try {
  host = new URL(url).hostname;
} catch {
  console.error('Invalid SUPABASE_URL:', url);
  process.exit(1);
}

const lookup = promisify(dns.lookup);

async function main() {
  console.log('Checking Supabase connectivity...');
  console.log('Host:', host);

  try {
    const { address } = await lookup(host);
    console.log('DNS OK, resolved to:', address);
  } catch (err) {
    console.error('DNS failed (ENOTFOUND = this machine cannot resolve the host):', err.message);
    console.error('Fix: use another network, or add the host to your hosts file with a known IP.');
    process.exit(1);
  }

  try {
    const res = await fetch(url + '/rest/v1/subscribers?select=id&limit=1', {
      headers: {
        apikey: serviceKey,
        authorization: `Bearer ${serviceKey}`,
      },
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('Supabase REST check failed, status:', res.status);
      console.error(body.slice(0, 500));
      process.exit(1);
    }
    console.log('REST OK: service key can read the subscribers table.');
  } catch (err) {
    console.error('Request failed:', err.message);
    if (err.cause) console.error('Cause:', err.cause.message);
    process.exit(1);
  }

  console.log('Supabase is reachable from this machine.');
}

main();
