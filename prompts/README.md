# Prompts — how the art was made, and how to make it yours

Every image in `../assets/` is a watercolor field-journal plate generated the same way. This folder is the recipe, so you can re-render any piece in your own style — or rebuild the whole map around your own life.

## The pipeline

1. **Model:** nano-banana-pro (any strong image model works — the style block does the heavy lifting).
2. **Style block:** prepend `style-block.txt` to *every* prompt. That one paragraph is what makes 17 separate images read as one hand.
3. **Style anchor:** generate the **mascot first** (`fox.png`), then attach it as the **style reference** on every other gen. This is the consistency trick — it's why the tank, the terrain, and the ink pot all look like the same illustrator drew them.
4. **White background → transparent:** generate on plain white, then run `../bake_alpha.py` (color-to-alpha) so the plate sits inked onto the map. If a plate's interior whites go see-through (a hollow chest, a bled-through prop), re-matte it with `../rematte.py`.
5. **Drop into `../assets/`** and wire it into `../index.html`.

## Make it your own

- **Swap the subject, keep the style block.** Your eras become the vehicles/props; your chapters become the vignettes. The look stays consistent because the style block and the anchor don't change.
- **Pick your own mascot.** Don't want a fox? Generate whatever traveler you like as the anchor first, then reference it everywhere. Everything downstream inherits its look.
- **One prompt = style block + the subject core** in `asset-prompts.md`. Start from the asset closest to what you want, change the subject line, regenerate.

## Files

- **`style-block.txt`** — the universal style prefix. Copy-paste this onto everything.
- **`asset-prompts.md`** — the subject core for all 17 shipped plates (+ an extended shot list), each tagged `[verbatim]` or `[reconstructed]`.

## Provenance (honest note)

The **style block** and the terrain/skyline/folder-mountains/lighthouse prompts are **verbatim** from the original build shot list. The **fox, vehicles, chart, and desk-prop** prompts are **faithful reconstructions** from the documented recipe (the exact original API calls weren't logged) — they match how each asset was actually made and are written as clean, swap-ready templates. Both kinds are marked in `asset-prompts.md`.
