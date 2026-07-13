# The Field Map of Mark Garza

*A hand-drawn map of a career: storyteller → nonprofit founder → AI growth architect.*

This is a scrollable expedition map you travel **east** through. A fox cartographer
rides along with you, past the waypoints of a working life, each pinned to the map as
a handwritten note card. The map loops: it is never finished, and neither is the work.

▶ **[See it live](https://kram3131.github.io/mark-garza/)** — scroll the map in your browser.

## The route

| stop | chapter |
|---|---|
| 00 | **Brown University** — Business & Modern American History |
| 01 | **The agency years** — big ad agencies in New York and San Francisco |
| 02 | **Flatwater Foundation** — a paddleboard ride that became a nonprofit erasing the cost of mental-health care for cancer families |
| 03 | **Inspirus** — first formal sales role, and where the LLM and automation work began |
| 04 | **Laimen AI** — founder and principal consultant, helping Austin businesses put Gen AI to work |

## Run it

No build step, no runtime dependencies. One HTML file plus painted PNG cutouts.

```bash
python3 -m http.server 8231
# → http://localhost:8231
```

Scroll, swipe, or use the arrow keys to travel. Deep links: `?p=0.5` jumps halfway; `#0`–`#4` jump to waypoints.

## How it works

`index.html` is the engine (a single Three.js scene: the paper wall, the travelling
fox, the smooth looping scroll). It never gets edited. Everything that makes the map
about a specific person lives in one data file, **`map.config.js`** — the name, the
chapters, the notes, the aphorisms, and which artwork sits where. The watercolor art is
generated on white paper, then baked to transparent RGBA with `bake_alpha.py` so the
paint sits inked onto the map.

## Credit

Built on **The Cartographer's Desk** by [Danney Trieu](https://github.com/Danneytrieu/cartographers-desk),
an open-source template for turning your own life into a scrollable field map. Made with a fox, and Claude riding shotgun.
