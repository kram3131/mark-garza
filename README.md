# The Cartographer's Desk

*A field map of Jake Van Clief — marine cryptographer → AI-governance researcher → solo operator.*

This is a hand-drawn expedition map you scroll **east** through. A fox cartographer travels
the route with you — riding a tank through the Corps years, flying over Edinburgh, then a
motorcycle into the solo-practice miles — passing six waypoints of a career, each pinned to
the map as a handwritten note card. The map loops: it is never finished, and neither is the work.

Built as a gift. Map your work — don't just store it.

## Run it

No build step, no dependencies at runtime — one HTML file plus painted PNG cutouts.

```bash
python3 -m http.server 8231
# → http://localhost:8231
```

Deep links: `?p=0.46` (or `#0`–`#7`) jump to a waypoint. Scroll, swipe, or arrow keys to travel.

## How it's built

**One file, one scene.** `index.html` is a single Three.js scene: a parchment "wall" with a
survey grid, a ground plane with the dotted route, and every drawing placed as a textured
plane. A Catmull-Rom curve carries the camera east; wheel/touch/keyboard events feed a
virtual scroll target and the camera position is damped toward it every frame
(`p += d * (1 − e^(−3.5·dt))`), which is what makes the travel feel like sliding a heavy
map drawer rather than stepping through slides.

**The world is painted, not styled.** All the artwork — terrain, vignettes, props, the fox
and his vehicles — is AI-generated watercolor, produced on a white background and then
**baked to true RGBA** with `bake_alpha.py`: alpha is recovered as `255 − min(r,g,b)` and
the color un-multiplied from white, which keeps the soft watercolor edges instead of the
hard halo you get from naive background removal. The code never fakes the look with CSS
filters or blend modes — the map look lives entirely in the paint.

**The traveler.** The fox is a small state machine driven by his position on the route:
vehicle windows along the x-axis swap him between *tank → plane → motorcycle → on foot*,
each with a perch offset tuned to the vehicle's silhouette. On foot and moving, a two-frame
trot cycle flips at 7 Hz; at rest he sits. The sitting and trotting sprites were scale-matched
against each other's alpha-channel geometry (head and satchel size), so he stays the same
fox whether he's moving or waiting for you.

**The seamless loop.** The opening panel is duplicated one full route-length east, and the
finale one length west; when progress wraps past 1.0 both the target and current positions
wrap together, so scrolling past FIN lands you back at the title with no visible seam.

**No mid-scroll hitches.** After the last texture loads, every scene is rendered once
off-screen *behind the loading overlay*, so all GPU texture uploads happen before the
map is revealed — first scroll is as smooth as the tenth.

**QA.** `verify.mjs` drives the real page headless (Playwright + Chromium): it seeks every
waypoint and screenshots it, asserts the fox's mode/scale/grounding at each stop, checks the
trot↔sit swap mid-scroll, and samples requestAnimationFrame deltas across a full route
travel to catch jank (the shipped build holds a steady frame time with zero spikes).

```bash
npm i playwright   # once
node verify.mjs    # server on :8231 required
```

## Files

| file | what it is |
|---|---|
| `index.html` | the whole site — scene, travel, fox logic, QA hooks |
| `assets/*.png` | the painted world, baked to RGBA |
| `bake_alpha.py` | white-background → transparent-watercolor recipe |
| `verify.mjs` | headless QA harness |

---

*Made with care (and a fox) by Danney Trieu, with Claude riding shotgun.*
