# Production env vars for PowerShell 7.
# Option A: Source this file after replacing placeholders (session-only):
#   cd apps\web
#   . .\set-production-env.ps1
# Option B: Use .env.production.local (recommended). Create it and add your vars; Next.js loads it when NODE_ENV=production. It is gitignored.

$ErrorActionPreference = "Stop"

# Site
$env:NODE_ENV = "production"
$env:NEXT_PUBLIC_SITE_URL = "https://ansa-brasil.org"

# Resend (replace with your Resend key and verified from-addresses)
$env:RESEND_API_KEY = "re_xxxxxxxx"
$env:RESEND_FROM_NEWSLETTER = "ANSA Newsletter <newsletter@ansa-brasil.org>"
$env:RESEND_FROM_CONTACT = "ANSA Contact Form <contact@ansa-brasil.org>"

# Supabase (replace with your project URL, service key, and DB URL)
$env:SUPABASE_URL = "https://xxxxxxxx.supabase.co"
$env:SUPABASE_SERVICE_KEY = "your-service-role-key"
$env:DATABASE_URL = "postgresql://postgres:xxxxx@db.xxxxxxxx.supabase.co:5432/postgres"

# Admin (replace with a strong secret)
$env:ADMIN_SECRET = "your-strong-admin-secret"

# NextAuth + Google OAuth (replace with your OAuth credentials and admin emails)
$env:AUTH_GOOGLE_ID = "your-client-id.apps.googleusercontent.com"
$env:AUTH_GOOGLE_SECRET = "your-client-secret"
$env:AUTH_ADMIN_EMAILS = "admin@ansa-brasil.org"
$env:NEXTAUTH_SECRET = "run-openssl-rand-base64-32"
$env:NEXTAUTH_URL = "https://ansa-brasil.org"

Write-Host "Production env vars set for this session. Run: npm run build; npm run start" -ForegroundColor Green
