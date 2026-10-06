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


| Piece | What it does |

| `Navbar` | Shows on every page; clicking the title goes home |
| `Home` | Full-screen background; the button leads to the register page |
| `Register` | Signal Forms validation (username 4+, password 6+, passwords match), shows success or Melia's error message |
| `AccountService` | The only file that calls the server |
| `meliaHash` | Hashes the password the same way the game client does, so web-created accounts can log in |