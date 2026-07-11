# Make this map your own

This is a scrollable, hand-painted map of a life. Right now it's Jake's. Here's how to
make it **yours** — either by hand, or by letting Claude do it for you.

> **The easy way:** open this folder in [Claude Code](https://claude.com/claude-code)
> (or any Claude with the files) and say **"make this map mine."** It runs the
> `make-your-map` skill: it asks you a handful of questions about your life, rewrites
> the map, helps you swap the art, and puts it online. The steps below are what it does
> — do them by hand if you'd rather.

---

## The one file you edit

`index.html` is the **engine** — it draws the paper, the travelling fox, the smooth
scroll. You never touch it.

Everything that makes the map about a *person* lives in **`map.config.js`**: the name,
the chapters, the note cards, the quotes, which picture sits where. The top of that
file explains every field. Open it and you'll see it's just Jake's life written as
data — change the words to yours.

---

## 1. Put your words on it (free, 10 minutes)

Open `map.config.js` and edit:

- **`title`** and **`badge`** — your name.
- **`opening`** — your headline, a one-line arc (`stage → stage → stage`), and a
  caption.
- **`chapters`** — this is the heart of it. Each chapter is one stop on the map:
  a short **title**, a few **lines** for the pinned note, and an **aphorism** (a line
  you'd write on the wall). Keep 3–6 of them, oldest to newest. Mark the last one
  `finale: true`.

You don't need to understand the coordinates — leave the `x`/`y`/`h`/`tilt` numbers off
and the map lays each piece out for you. The numbers are only there if you want to nudge
something.

Then run it and look:

```bash
python3 -m http.server 8231
# open http://localhost:8231
```

Your words are now on the real map — riding Jake's fox and vehicles as stand-in art.
That's already a finished, shareable thing.

## 2. Make the art yours (optional — costs image credits)

The pictures are AI-painted watercolor. To swap them for your own subject, follow
`prompts/README.md`. The short version:

1. **Generate your mascot first** — it's the style anchor. Prepend
   `prompts/style-block.txt` to a one-line description of your traveller, on a plain
   white background.
2. **Generate the rest** — backdrops and props — with the same style block, attaching
   your mascot image as the style reference each time. `prompts/asset-prompts.md` has a
   starting prompt for every picture.
3. **Bake each one** so its white background turns transparent:
   ```bash
   python3 bake_alpha.py assets/your-picture-raw.png assets/your-picture.png
   ```
   If a picture's inside goes see-through, repair it with `python3 rematte.py assets/your-picture.png`.
4. **Point the map at it** — change that picture's `file:` in `map.config.js`.

Do one picture at a time and reload. Start with the mascot.

## 3. Put it online (free)

Push to your own GitHub repo and turn on Pages:

```bash
git remote set-url origin https://github.com/YOUR-USER/YOUR-REPO.git
git add -A && git commit -m "Make the map mine"
git push -u origin main
```

Then in your repo: **Settings → Pages → Branch: `main` / root**. Your map goes live at
`https://YOUR-USER.github.io/YOUR-REPO/` in a minute or two. Share that link.

---

*Map your work — don't just store it.*
