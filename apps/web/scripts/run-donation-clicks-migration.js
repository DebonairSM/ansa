const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

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

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl || databaseUrl.includes('[YOUR-PASSWORD]')) {
  console.error('Set DATABASE_URL in apps/web/.env.local with your real Postgres password (no [YOUR-PASSWORD] placeholder).');
  console.error('File used:', envPath);
  process.exit(1);
}

const sqlPath = path.join(__dirname, '..', 'supabase', 'migrations', '20260429_donation_clicks.sql');
const sql = fs.readFileSync(sqlPath, 'utf8');

async function run() {
  const client = new Client({ connectionString: databaseUrl });
  try {
    await client.connect();
    await client.query(sql);
    console.log('Donation clicks migration applied.');
  } catch (err) {
    console.error('Migration failed:', err.message);
    if (/ENOTFOUND|getaddrinfo/.test(err.message) && /db\.\w+\.supabase\.co/.test(databaseUrl || '')) {
      console.error('');
      console.error('The direct DB host (db.xxx.supabase.co) often does not resolve from your network.');
      console.error('Do one of the following:');
      console.error('  1. Use the Session pooler URI: Supabase Dashboard > Settings > Database > Connection string > Session pooler. Put that URI in .env.local as DATABASE_URL (host will be ...pooler.supabase.com).');
      console.error('  2. Run the SQL in the dashboard: Supabase Dashboard > SQL Editor, paste contents of apps/web/supabase/migrations/20260429_donation_clicks.sql, then Run.');
      console.error('');
    }
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
