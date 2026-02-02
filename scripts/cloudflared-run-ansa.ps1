# Run the named Cloudflare Tunnel for ansabrasil.org (local hosting).
# Requires cloudflared/config.yml with tunnel ID and credentials path set.
# Start the web app first (npm run web:dev or cd apps\web && npm start).
#
# Usage: .\scripts\cloudflared-run-ansa.ps1

$ErrorActionPreference = "Stop"
$RepoRoot = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$ConfigPath = Join-Path $RepoRoot "cloudflared\config.yml"

if (-not (Test-Path $ConfigPath)) {
    Write-Host "Config not found: $ConfigPath"
    Write-Host "Copy cloudflared\config.yml.example to cloudflared\config.yml and set tunnel ID + credentials path."
    Write-Host "See docs\MIGRATE_ANSABRASIL_LOCAL.md"
    exit 1
}

$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cloudflared) {
    Write-Host "cloudflared not found. Install: winget install Cloudflare.cloudflared"
    exit 1
}

Set-Location $RepoRoot
# Use tunnel ID from config (same tunnel can serve vsol.software + ansabrasil.org)
& cloudflared tunnel --config $ConfigPath run 64674aa9-03b3-4063-82fe-0aae3d8642c5
