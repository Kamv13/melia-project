## Register site:
**Done and tested locally**
- Angular 22 site in `melia-site/` (homepage + register page)
- Registers through Melia's existing `POST /api/account/create`, no Melia code changes
- Passwords sent as uppercase MD5 (same format the game client uses), stored by Melia as BCrypt
- Confirmed: request returns 200 and the account appears in `melia.accounts`


**Need someone with hosting experience**
- Public deployment with HTTPS. 
   Site in Melia's `user/web`, Caddy in front for HTTPS (Melia web moves to port 8080)
- `user/db/servers.txt`: public IP for Barracks/Zone/Social, plus port forwarding
- behind any proxy, Melia's "5 registrations per minute per IP" limit applies to all players combined

**Build commands**
- Dev: `npm start` (uses `proxy.conf.json`)
- Production: `npm run build` (output in `dist/melia-site/browser`)