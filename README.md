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

# Website: Melia server changes

Changes made to Melia's web server so the website can show the leaderboard and the game database. 

## Changed files

| File | Status | Purpose |
| `src/Shared/Server.cs` | Modified | Web server now also loads `db/recipes.txt` (one line, added after `items.txt` in the `ServerType.Web` )
| `src/WebServer/WebServer.cs` | Modified | Registers the database API: `_server.WithWebApi("/api/db/", m => m.WithController<DatabaseController>());` |
| `src/WebServer/Controllers/Api/InfoController.cs` | Modified | Added `using Melia.Shared.Game.Const;` and the `Leaderboard()` endpoint |
| `src/WebServer/Database/WebDb.Leaderboard.cs` | New | `LeaderboardEntry` class and `GetTopCharacters()` SQL query |
| `src/WebServer/Controllers/Api/DatabaseController.cs` | New | Search and detail endpoints for items, recipes, monsters and maps |
| `src/WebServer/Util/SpawnIndex.cs` | New | Reads the Laima spawn scripts to know which monsters spawn on which map |

After changing any of these: close all Melia windows, run `dotnet build Melia.sln`, check for `Build succeeded`, and start the servers again.

## Endpoints

| Endpoint | Returns |
|---|---|
| `GET /api/info/leaderboard` | Top 20 characters: name, team, job ID, job name, level |
| `GET /api/db/{items\|recipes\|monsters\|maps}?search=...` | Up to 50 matching entries: id, name, short info |
| `GET /api/db/items/{id}` | Item stats, recipe (product + materials) if it's a recipe, monsters that drop it |
| `GET /api/db/monsters/{id}` | Level, rank, race, element, HP, EXP, class EXP, silver, drops with %, maps it spawns in |
| `GET /api/db/maps/{id}` | Map info and the monsters that spawn there |

## Where the data comes from

### Leaderboard: MySQL
 `GetTopCharacters()` queries the `characters` table joined with `accounts`, keeps only non-GM accounts (`authority = 0`), and orders by `level`, then `totalExp`.
 The character's `job` column is a numeric ID. The class name comes from Melia's job data (`jobs.txt`), which the web server already loads, via `JobDb.Find(...)`.
-Characters are written to the database on autosave and on logout, so changes in game show up after that.

### Items, recipes, monsters, maps: Melia's data files
The web server loads these files into memory when it starts: `system/db` → `packages/laima/db` → `user/db`.



Changes made to Melia's web server so the website can show the leaderboard and the game database. Registration uses Melia's existing `POST /api/account/create` endpoint and required no server changes.



## Limitations
**Base values only.** Drop chances ignore the rate multipliers in `drops.conf`, item stats ignore enhancements and random options, and per-map stat overrides in spawn scripts aren't shown.
**Restart needed for data changes.** The web server reads data files only at startup, so after editing `user/db/*.txt`, restart it. `>reloaddata` only reloads the game server.
 **Only monster drops and script spawns.** Global drops, map bonus drops, quest or event drops, and monsters spawned by other scripts don't appear.
 **Laima paths are hardcoded.** `SpawnIndex.cs` reads from the Laima package folders. If the server stops using Laima, update those two paths.
 **GM characters are excluded** from the leaderboard.:
 **Item stats:** a fixed list of stat fields from the item data, only showing the ones that aren't zero.
 **Recipes:** items with type `Recipe`. The matching `recipes.txt` entry (same class name) gives the product and ingredients. The recipe itself is removed from the materials list.
 **Silver:** item `900011` ("Silver") in a monster's drop list, shown separately from the other drops.
 **Dropped by:** scans every monster's drop list for the item.
 **Monster search:** only monsters with EXP above 0, which leaves out NPCs and objects.

