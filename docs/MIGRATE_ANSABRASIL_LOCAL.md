# Migrate ansabrasil.org to local hosting (Cloudflare Tunnel)

Steps to point ansabrasil.org and www.ansabrasil.org at your local machine via a Cloudflare Tunnel. Your current DNS has an A record for the root and a www CNAME; we will point both at the tunnel.

## Before you start

- Cloudflare is already the DNS for ansabrasil.org (nameservers indie.ns.cloudflare.com, kianchau.ns.cloudflare.com).
- You will run the Next.js app and cloudflared on your machine. While the tunnel is running and DNS points to it, all traffic for ansabrasil.org goes to your local app.

## Step 1: Create the tunnel

In PowerShell (from any directory):

```powershell
cloudflared tunnel login
```

A browser window opens; choose the Cloudflare account that owns ansabrasil.org and authorize. This saves a cert under `%USERPROFILE%\.cloudflared\`.

Then create the tunnel:

```powershell
cloudflared tunnel create ansa-local
```

Note the **Tunnel ID** (UUID) in the output. The credentials file is saved as `%USERPROFILE%\.cloudflared\<TUNNEL_ID>.json`.

## Step 2: Configure the tunnel for ansabrasil.org and www

Copy the example config and fill in your tunnel ID and credentials path:

```powershell
cd d:\prod\ansa
copy cloudflared\config.yml.example cloudflared\config.yml
```

Edit `cloudflared\config.yml`:

1. Replace `<TUNNEL_ID>` with the UUID from Step 1.
2. Replace `<PATH_TO_CREDENTIALS_JSON>` with the full path to the JSON file, e.g.:
   `C:\Users\Administrator\.cloudflared\<TUNNEL_ID>.json`

The example already sets hostnames `ansabrasil.org` and `www.ansabrasil.org` to `http://localhost:4545`. Save the file.

## Step 3: Update DNS in Cloudflare

In [Cloudflare DNS for ansabrasil.org](https://dash.cloudflare.com):

1. **Root domain (ansabrasil.org)**  
   - Remove the existing **A** record for `ansabrasil.org` (content `151.101.66.159`).  
   - Add a **CNAME** record:  
     - **Name:** `@` (or `ansabrasil.org`)  
     - **Target:** `<TUNNEL_ID>.cfargotunnel.com`  
     - **Proxy status:** Proxied (orange cloud)

2. **www**  
   - Edit the existing **CNAME** for `www`:  
     - **Name:** `www`  
     - **Target:** `<TUNNEL_ID>.cfargotunnel.com`  
     - **Proxy status:** Proxied  
   - Or leave **Target** as `ansabrasil.org` so www follows the root (both will use the tunnel once the root CNAME is in place).

Save the DNS changes. Propagation is usually quick when using Cloudflare.

## Step 4: Run the site and tunnel locally

1. **Start the web app** (terminal 1):

   ```powershell
   cd d:\prod\ansa
   npm run web:dev
   ```
   Or, for production build: `cd apps\web && npm start`

2. **Start the tunnel** (terminal 2):

   ```powershell
   cd d:\prod\ansa
   cloudflared tunnel --config cloudflared\config.yml run ansa-local
   ```

Leave both terminals open. While they are running, https://ansabrasil.org and https://www.ansabrasil.org will serve your local app.

## Reverting (point back to Render or previous host)

1. In Cloudflare DNS, remove the CNAME(s) pointing to `<TUNNEL_ID>.cfargotunnel.com`.
2. Restore the **A** record for `ansabrasil.org` with content `151.101.66.159` (Proxied).
3. Restore or leave **www** as a CNAME to `ansabrasil.org` (Proxied).
4. Stop the tunnel and local dev server when you are done.

## Optional: Run tunnel as a Windows service

To keep the tunnel running in the background without an open terminal, you can install it as a service (see [Cloudflare: Run as a service](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/configure-tunnels/local-management/as-a-service/)). The web app still needs to be running (e.g. via another process or service) for the site to respond.
