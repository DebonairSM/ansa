# Host ANSA locally with Cloudflare Tunnel

Expose your local Next.js app (port 4545) to the internet using Cloudflare Tunnel so others can access it without deploying to Render.

## Prerequisites

- **cloudflared** installed:
  - Windows: `winget install Cloudflare.cloudflared`
  - Or download: [Cloudflare: Download and install](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/download-and-install/)

## Option A: Quick Tunnel (no account)

No Cloudflare account. You get a random `*.trycloudflare.com` URL. Good for quick sharing or testing.

1. Start the web app (dev or production):
   ```powershell
   npm run web:dev
   # Or production: cd apps/web && npm start
   ```

2. In another terminal, run the tunnel:
   ```powershell
   .\scripts\cloudflared-quick-tunnel.ps1
   ```
   Or directly:
   ```powershell
   cloudflared tunnel --url http://localhost:4545
   ```

3. Use the URL printed in the terminal (e.g. `https://random-name.trycloudflare.com`).

Quick Tunnels have a limit of 200 concurrent requests and do not support Server-Sent Events. For a stable or custom domain, use a named tunnel (Option B).

## Option B: Named tunnel (custom domain)

Requires a Cloudflare account and a domain (or subdomain) on Cloudflare DNS.

1. Log in and create a tunnel:
   ```powershell
   cloudflared tunnel login
   cloudflared tunnel create ansa-local
   ```
   This creates a tunnel and saves credentials to `%USERPROFILE%\.cloudflared\` (e.g. `<TUNNEL_ID>.json`).

2. Add a DNS record in the Cloudflare dashboard:
   - Zone: your domain
   - Type: CNAME
   - Name: the subdomain you want (e.g. `ansa-local` or `local`)
   - Target: `<TUNNEL_ID>.cfargotunnel.com` (shown after `tunnel create`)

3. Create a config file. Copy `cloudflared/config.yml.example` to `config.yml` (in the same folder or in `%USERPROFILE%\.cloudflared\config.yml`). Set:
   - `tunnel`: the tunnel UUID from step 1
   - `credentials-file`: full path to the `.json` file (e.g. `C:\Users\You\.cloudflared\<TUNNEL_ID>.json`)
   - `hostname`: the full hostname you used in DNS (e.g. `ansa-local.yourdomain.com`)

4. Start the web app on port 4545, then run the tunnel:
   ```powershell
   cloudflared tunnel run ansa-local
   ```
   If your config is not in the default `%USERPROFILE%\.cloudflared\config.yml`, use:
   ```powershell
   cloudflared tunnel --config path\to\config.yml run ansa-local
   ```

Traffic to your subdomain will be proxied to `http://localhost:4545`.

## Notes

- If you use a config file in `.cloudflared` for a named tunnel, Quick Tunnels may still pick it up. Use a separate config path or a dedicated quick-tunnel script to avoid conflicts.
- Keep the terminal running while you want the site reachable. Closing it closes the tunnel.
