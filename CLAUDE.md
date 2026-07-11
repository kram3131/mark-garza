# The Cartographer's Desk — for the Claude reading this repo

This repo is a **scrollable, hand-painted field-map of one person's life/career**. A
fox mascot travels a paper map east through six waypoints; it loops forever. It was
built as a gift and is meant to be **cloned and made your own**.

## The one thing to know

**`index.html` is the engine — don't edit it to change content.** It draws the paper
wall, the travelling mascot, the smooth loop, the QA hooks. All the *content* — the
person's name, their chapters, the note cards, the aphorisms, which artwork sits where
— lives in **`map.config.js`**. That's the file you edit.

```
index.html        the engine (Three.js scene, scroll, loop) — leave it alone
map.config.js     ← EDIT THIS. the whole map as plain data. schema is at the top.
assets/*.png      the painted world, baked to transparent watercolor
prompts/          the exact art recipe (style block + per-plate subject lines)
bake_alpha.py     white background → transparent watercolor
rematte.py        repair a plate whose interior whites went see-through
verify.mjs        headless QA (asserts assets load, mascot grounds, no scroll jank)
```

## If the user wants to make this map their own

Use the **`make-your-map`** skill (in `.claude/skills/make-your-map/`) — or the plain
`/make-your-map` command. It interviews them in a few questions, rewrites
`map.config.js`, optionally swaps the artwork via `prompts/` + `bake_alpha.py`, previews
locally, and deploys to their own GitHub Pages. A human-readable version of the same
steps is in `MAKE-YOUR-OWN.md`.

The golden rule the skill follows: **give them a working map early.** The map runs on
the shipped placeholder art, so their own words land on the real map before any image
is generated. Art is the last, optional (paid) step — never block the map on it.

## Running it

```bash
python3 -m http.server 8231   # → http://localhost:8231
```

No build step. `map.config.js` is loaded as an ES module by `index.html`, so it must
be served over http (not opened as a `file://`).
