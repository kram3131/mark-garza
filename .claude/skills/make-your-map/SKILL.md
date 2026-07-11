---
name: make-your-map
description: Turn this cloned "Cartographer's Desk" repo into the user's OWN scrollable field-map — interview them about their life/career in a few questions, rewrite map.config.js with their chapters, (optionally) swap the artwork for their own painted PNGs via prompts/ + bake_alpha.py, preview locally, and deploy to GitHub Pages. Use whenever someone who has cloned this repo says "make this mine", "make my own map", "put my life on it", "set it up for me", "help me customize this", or runs /make-your-map.
---

# Make Your Own Map

You are helping someone turn this cloned repo — **The Cartographer's Desk** — into
a scrollable, hand-painted field-map of **their own** life or work. The original is
Jake Van Clief's career map; your job is to make it theirs.

The whole trick of this project: **the engine never changes.** `index.html` draws a
paper wall, a travelling mascot, and a smooth looping scroll. Everything that makes
the map about a specific person lives in one data file — **`map.config.js`**. You
edit that, not the engine.

Work in this order. **Give them a working map as early as possible** — the map runs
on the shipped placeholder art from step 3, so they see their own words on the real
map *before* generating a single image. Art is the last, optional, upgrade.

---

## 0 · Orient (30 seconds, silent)

Read these so you write a valid config and use the real recipe:
- `map.config.js` — the file you will rewrite. It's currently Jake's map; use it as
  the worked example for the exact schema (every field, every shape).
- `prompts/README.md`, `prompts/style-block.txt`, `prompts/asset-prompts.md` — the
  art recipe, for step 3.
- `bake_alpha.py` / `rematte.py` — the white-background → transparent-watercolor step.

Then greet them and start the interview. Don't dump the schema on them — you hold it,
they just answer human questions.

---

## 1 · Interview (a few life questions, one at a time)

Ask conversationally, **one theme per turn**, and reflect their answers back. You need:

1. **Their name** — for the title card and the corner badge.
2. **Their arc in one line** — the 3-ish stage journey, e.g.
   *"Line cook → pastry chef → bakery owner"*. (You can also build this from the
   chapters once you have them.)
3. **The chapters** — the stops on their map, **3 to 6** of them, oldest → newest.
   For each, gently pull:
   - a **short title** (e.g. `"01 · the first kitchen"`),
   - **2–4 short lines** for the pinned note (what happened, what it meant),
   - one **aphorism / quote** — a line they'd write on the wall,
   - optionally, **a "ride"** — a vehicle that fits that era (a bike, a boat, a
     truck, a plane). Eras without a ride just travel on foot.
4. **Their mascot** — keep the fox, or pick their own traveller (any animal or little
   character). This is the through-line that walks the whole map.

Keep it light. If they stall on an aphorism, offer to draft one from their note and
let them approve it. If they only want 3 chapters, that's fine — the engine spaces
whatever they give you.

**Recommend, don't interrogate.** For each question you may suggest a good default
("most people keep the fox — want to?") so they can just say yes.

---

## 2 · Write `map.config.js` (their words on the real map)

Overwrite `map.config.js` **whole** from the interview. This is safe — you're
replacing one self-contained data file; you never touch the engine.

Rules:
- **Keep the art `file:` fields pointing at the shipped placeholders** (`fox.png`,
  `tank.png`, `terrain-t1.png`, etc.) for now. This is what lets the map *work
  immediately* with their text. You swap the images in step 3.
- **You don't need to place anything by hand.** Every `x` / `y` / `h` / `tilt` field
  is optional — omit them and the engine auto-lays-out the chapter. Only add a
  placement number if they ask to nudge something.
- **`wpX` is optional** — leave it off and chapters space themselves ~16 apart. Only
  set it to match an existing layout.
- The **last chapter** should get `finale: true` (it doubles across the loop seam so
  the wrap is invisible).
- A chapter with `ride: 'bike'` needs a matching entry under `vehicles: { bike: {...} }`.
  Reuse the shipped vehicle art (`tank.png` / `plane.png` / `moto.png`) as the
  placeholder until they paint their own.

**Minimal config shape** (content-only — the engine fills in placement):

```js
export const MAP = {
  title: 'The Field Map of <Name>',
  badge: '<Name or initials>',
  odometerKm: 5600,

  opening: {
    headline: ['The Field Map of', '<Name>'],
    tagline:  'a life, charted',
    arc:      '<stage>  →  <stage>  →  <stage>',
    hero:     { image: 'fox-hero.png', caption: 'fig. 0 — the traveller' },
    props:    [ { file: 'prop-compass.png', x: 3.4, h: 1.2, zBack: 1.6 } ],
  },

  mascot: {
    scale: 1.15,
    sit:   { file: 'fox.png',        h: 1.3,  yOff: 0, perch: [-.19, 0] },
    walkA: { file: 'fox-walk-a.png', h: 0.72 },
    walkB: { file: 'fox-walk-b.png', h: 0.72 },
  },

  vehicles: {
    tank:  { file: 'tank.png',  h: 2.0,  yOff: -.53, perch: [.68,  -.12] },
    plane: { file: 'plane.png', h: 2.35, yOff: .1,   perch: [1.12,  .08], flies: true },
    moto:  { file: 'moto.png',  h: 1.65, yOff: -.52, perch: [.22,  -.04] },
  },

  chapters: [
    {
      id: 'first-kitchen',
      note:     { title: '01 · the first kitchen', lines: ['line one', 'line two'] },
      aphorism: { lines: ['"their quote here."'], ink: '#66713f' },
      ride:     'tank',                         // optional
      art:      [ { file: 'terrain-t1.png', h: 6.4, y: 2.7, wallPin: true } ],  // optional backdrop
    },
    // ...more chapters...
    { id: 'now', finale: true,
      note: { title: '05 · now', lines: ['...'] }, aphorism: { lines: ['"..."'] } },
  ],
};
```

For anything richer (extra note cards, foreground props, exact placement), copy the
matching pattern straight from Jake's original `map.config.js` — it demonstrates every
field. The engine's optional fields are documented at the top of that file.

**After writing it, tell them to look:** run the server (step 4) and open the map.
Their words are now on it. This is the payoff moment — land it before any art talk.

---

## 3 · Swap the art (optional, and it costs image credits — always ask first)

The placeholder art is Jake's fox and vehicles. To make it truly theirs, regenerate
the plates in their own subject. **This spends money on an image model, so confirm
before generating anything**, and do it in this order (it's the consistency trick):

1. **The mascot first — it's the style anchor.** Generate their traveller (the fox
   replacement) on plain white, using `prompts/style-block.txt` prepended to a short
   subject line. Everything else references this image, so its look propagates.
2. **Then each backdrop / prop**, one per chapter, same style block, **attaching the
   mascot image as the style reference** on every gen. See `prompts/asset-prompts.md`
   for the subject line of every shipped plate — start from the closest one and swap
   the subject.
3. **Bake each PNG:** `python3 bake_alpha.py assets/<name>-raw.png assets/<name>.png`
   (white → transparent watercolor). If a plate's interior whites go see-through,
   repair it: `python3 rematte.py assets/<name>.png`.
4. **Point the config at it:** change that plate's `file:` in `map.config.js`.

If you have an image-generation tool available, offer to run the gens for them (after
the cost OK). If you don't, hand them the **exact prompts** to paste into their own
image model, then bake the results together. Either way, do it **one plate at a time**
and let them react — the mascot especially.

Never block the map on art. A fully-worded map with placeholder art is a finished,
shippable thing.

---

## 4 · Preview

```bash
python3 -m http.server 8231
# → open http://localhost:8231
```

Scroll / swipe / arrow-keys travel east. `?p=0.5` jumps halfway; `#0`–`#7` jump to
waypoints. If they have Node + Playwright, run the headless check:

```bash
npm i playwright   # once
node verify.mjs    # asserts assets load, the mascot grounds/perches, no jank
```

If `verify.mjs` fails on asset count, a `file:` in the config points at a PNG that
isn't in `assets/` — fix the name.

---

## 5 · Deploy to GitHub Pages (their own copy, their own link)

They should publish to **their** GitHub, not the original repo:

```bash
# from the repo folder, pointed at their new empty GitHub repo:
git remote set-url origin https://github.com/<their-user>/<their-repo>.git
git add -A && git commit -m "Make the map mine"
git push -u origin main
gh repo edit <their-user>/<their-repo> --visibility public --accept-visibility-change-consequences
gh api -X POST repos/<their-user>/<their-repo>/pages -f 'source[branch]=main' -f 'source[path]=/' 2>/dev/null || \
  echo "Enable Pages in the repo Settings → Pages → Branch: main / root."
```

Their live map lands at `https://<their-user>.github.io/<their-repo>/` within a minute
or two. Hand them that URL.

---

## Guardrails

- **Edit `map.config.js`, never `index.html`.** If something about the *content* looks
  wrong, it's in the config. The engine is done.
- **The map must work at every step.** Placeholder art first; their words next; their
  art last. Never leave them with a broken map between steps.
- **Money is theirs.** Never generate images without an explicit yes. Text-only
  customization is free and complete on its own.
- **One thing at a time.** Interview one theme per turn; swap one plate per turn.
  Reflect their answers back so they feel authored, not processed.
