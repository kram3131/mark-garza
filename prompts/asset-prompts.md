# The prompts — one per shipped asset

Every prompt below is **the style block (see `style-block.txt`) + the subject core shown here**, generated on **nano-banana-pro** with **`fox.png` attached as the style reference** (except the fox itself), on a **white background**, then baked transparent with `bake_alpha.py`.

**Provenance tags:**
- `[verbatim]` — the exact prompt core from the build shot list (`plans/2026-07-09-jake-map-painted-world-shotlist.html`).
- `[reconstructed]` — rebuilt faithfully from the documented recipe (the style block that was on every gen + the subject description in the build plans). Use these as clean, swap-ready templates; they match how the asset was actually made, but aren't a byte-copy of the original call.

---

## The mascot (make this FIRST — it's the style anchor)

**`fox.png`** — the traveler. `[reconstructed]`
> A single satchel-wearing explorer fox, sitting upright in a friendly three-quarter view, a small worn leather cartographer's satchel slung across one shoulder. Sepia watercolor wash, brown ink linework, centered on plain white paper.

> ⭐ Generate this one on its own (no style ref). Everything else attaches THIS image as its style reference — that's the whole consistency trick.

**`fox-walk-a.png` / `fox-walk-b.png`** — the 2-frame trot cycle. `[reconstructed]`
> The same satchel fox from fox.png, now trotting in side profile — a two-frame walk cycle (frame A legs gathered under the body, frame B legs extended), satchel bouncing. Match fox.png exactly for colour and line weight.

> Note: color-match the two frames tightly or the trot strobes. Anatomy must match the sitting fox (same body size in-frame) or you get "two different foxes."

**`fox-hero.png`** — the "fig. 0 — the cartographer" portrait plate. `[reconstructed]`
> The same satchel fox posed with a rolled map tucked under one arm, presented as a framed field-journal portrait plate with a hand-inked border around it.

---

## The rides (one per era — sized so the fox perches on top)

**`tank.png`** `[reconstructed]`
> A plain, completely unmarked tank in side profile — no insignia or markings of any kind. Sized with a flat turret the fox can perch on.

**`plane.png`** `[reconstructed]`
> A plain, completely unmarked small aircraft in side profile — no insignia or markings. An open cockpit the fox can ride in.

**`moto.png`** `[reconstructed]`
> A plain vintage motorcycle in side profile, no markings, a seat the fox can sit on.

---

## The map surface

**`terrain-t1.png`** — the painted map the fox travels across (generated 21:9). `[verbatim]`
> Ultra-wide rolling countryside panorama, west to east: dawn-sepia open fields with a faint dotted route, hardening into olive-drab drilled earth and berms, rising at the far right into cool heather-grey crags. Horizon steady at one-third from the top, open paper sky above.

**`concept-a-chart.png`** — the antique chart, used as a second map/desk surface. `[reconstructed]`
> An antique expedition chart on an aged sheet — faint graticule lines, a compass rose, dotted survey routes and inked contour marks, worn edges; reads as a physical chart sheet lying on a desk.

---

## The desk props

These five were generated as ONE sheet, then cropped apart — keep clear white space around each object so they separate cleanly. `[reconstructed]`
> A tidy sheet of separate explorer's-desk objects, each isolated with clear white space around it so they can be cropped apart: a brass compass, a glass ink pot with a dip pen, a magnifying glass, a cup of tea on a saucer, a coil of twine.

Cropped into: **`prop-compass.png`**, **`prop-inkpot.png`**, **`prop-magnifier.png`**, **`prop-tea.png`**, **`prop-twine.png`**.

## The chapter vignettes

**`prop-edinburgh-skyline.png`** `[verbatim]`
> Edinburgh old-town skyline study: crowded rooftops, chimneys and spires on a crag, heather blue-grey wash. No crest, no flags.

**`prop-folder-mountains.png`** `[verbatim]`
> A mountain range made of manila folders and stacked documents, contour lines inked across their slopes, a tiny survey flag on the summit, gold wash.

**`prop-lighthouse-village.png`** `[verbatim]`
> A small headland village at evening with a lit lighthouse, lamplit windows, moored boats, fox-orange dusk wash.

---

## Extended shot list (not shipped in v1 — here if you want a fuller world)

From the same build shot list, all `[verbatim]`, all use the style block + fox.png ref:

- **Terrain T2** (Edinburgh → Institute → Practice): *Continues the same panorama: heather-blue highland ridge descending into aubergine-washed old stone country — walls, a cloistered quad — then drying into rust-terracotta scrubland with a two-lane road running east. Same steady horizon.* (attach T1 as a 2nd ref so the left edge matches its crags)
- **Terrain T3** (ICM → Clief Notes → FIN): *Panorama finale: gold-washed surveyed hills carrying inked contour lines and survey stakes, easing into a warm fox-orange coastal shelf — a small village and headland at the far east — then the paint thins and the paper runs blank. Same steady horizon.* (attach T2 as a 2nd ref)
- **V1 — flight line:** *A quiet flight line at dawn: two plain unmarked aircraft parked in silhouette, wheel chocks, fuel drums, a windsock — olive wash. Strictly no insignia.*
- **V3 — institute hall:** *A tall stone institute hall interior: arched windows, long reading tables, stacked books and hanging charts, aubergine dusk wash.*
- **V4 — workshop:** *A working bench in a small workshop: tools on a pegboard, coiled cables, a half-assembled machine, coffee mug, rust-terracotta wash.*
