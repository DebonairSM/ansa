# PowerShell 7: set ADMIN_SECRET in apps/web/.env.local (run from repo root or apps/web)

$envFile = Join-Path $PSScriptRoot '.env.local'
$secret = Read-Host -Prompt 'Enter ADMIN_SECRET password'

if ([string]::IsNullOrWhiteSpace($secret)) {
  Write-Error 'Password cannot be empty.'
  exit 1
}

$lines = @()
if (Test-Path $envFile) {
  $lines = Get-Content $envFile | Where-Object { $_ -notmatch '^\s*ADMIN_SECRET=' }
}
$lines += "ADMIN_SECRET=$secret"
$lines | Set-Content $envFile -Encoding utf8

Write-Host "Updated $envFile with ADMIN_SECRET. Restart the dev server and sign in at /admin/login with this password."
