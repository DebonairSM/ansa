# Expose local ANSA web app (localhost:4545) via Cloudflare Quick Tunnel.
# No Cloudflare account required. You get a random *.trycloudflare.com URL.
#
# Prerequisites:
# - Install cloudflared: winget install Cloudflare.cloudflared
# - Start the web app first: npm run web:dev (or npm start from apps/web)
#
# Usage: .\scripts\cloudflared-quick-tunnel.ps1

$ErrorActionPreference = "Stop"
$LocalUrl = "http://localhost:4545"

# Optional: check if something is listening on 4545
$listening = Get-NetTCPConnection -LocalPort 4545 -State Listen -ErrorAction SilentlyContinue
if (-not $listening) {
    Write-Host "Warning: Nothing is listening on port 4545. Start the web app first:"
    Write-Host "  npm run web:dev"
    Write-Host ""
}

$cloudflared = Get-Command cloudflared -ErrorAction SilentlyContinue
if (-not $cloudflared) {
    Write-Host "cloudflared not found. Install it with: winget install Cloudflare.cloudflared"
    Write-Host "Or download from: https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/download-and-install/"
    exit 1
}

Write-Host "Starting Cloudflare Quick Tunnel to $LocalUrl"
Write-Host "Public URL will appear below. Leave this window open while hosting."
Write-Host ""
& cloudflared tunnel --url $LocalUrl
