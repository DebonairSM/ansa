# PowerShell 7: set Supabase env vars in apps/web/.env.local
# Run from repo root:  ./apps/web/set-supabase-env.ps1
# Or from apps/web:    ./set-supabase-env.ps1

$envFile = Join-Path $PSScriptRoot '.env.local'

Write-Host 'This app uses Supabase with two values from Dashboard > Settings > API:'
Write-Host '  - Project URL (e.g. https://xxxxx.supabase.co)'
Write-Host '  - service_role key (long JWT, under "Project API keys")'
Write-Host ''

$url = Read-Host -Prompt 'SUPABASE_URL (Project URL)'
$key = Read-Host -Prompt 'SUPABASE_SERVICE_KEY (service_role secret)'

if ([string]::IsNullOrWhiteSpace($url) -or [string]::IsNullOrWhiteSpace($key)) {
  Write-Error 'Both SUPABASE_URL and SUPABASE_SERVICE_KEY are required.'
  exit 1
}

$url = $url.Trim()
$key = $key.Trim()

$lines = @()
if (Test-Path $envFile) {
  $lines = Get-Content $envFile | Where-Object {
    $_ -notmatch '^\s*SUPABASE_URL=' -and $_ -notmatch '^\s*SUPABASE_SERVICE_KEY='
  }
}
$lines += "SUPABASE_URL=$url"
$lines += "SUPABASE_SERVICE_KEY=$key"
$lines | Set-Content $envFile -Encoding utf8

Write-Host ''
Write-Host "Updated $envFile with SUPABASE_URL and SUPABASE_SERVICE_KEY."
Write-Host 'Restart the dev server if it is running.'
