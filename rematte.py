#!/usr/bin/env python3
"""Re-matte traveler sprites: only BORDER-CONNECTED white is background.

The original bake (alpha = 255 - min(r,g,b)) hollows out interior whites — the
fox's white chest/cheeks went transparent, so dark props behind him bled through
and read as "the fox is behind everything" (Danney round-3). This rebuilds the
matte from the reconstructed original-on-white image:
  bg     = flood fill from the canvas border over near-white pixels -> alpha 0
  paint  = everything else -> opaque, original color
  rim    = paint within FEATHER px of bg keeps the old soft color-to-alpha edge
Run: python3 rematte.py fox.png fox-walk-a.png ...   (in assets/)
"""
import sys
import numpy as np
from PIL import Image
from collections import deque

WHITE_MIN = 246     # min(r,g,b) >= this ...
SAT_MAX = 10        # ... and max-min <= this  -> "near-white"
FEATHER = 2         # px of old soft edge kept at the silhouette

def rematte(path):
    im = Image.open(path).convert('RGBA')
    px = np.array(im).astype(np.float64)
    c, a = px[:, :, :3], px[:, :, 3:4] / 255.0
    # reconstruct the original white-background render (undo unmultiply-from-white)
    orig = c * a + 255.0 * (1.0 - a)
    H, W = orig.shape[:2]
    mn, mx = orig.min(axis=2), orig.max(axis=2)
    nearwhite = (mn >= WHITE_MIN) & ((mx - mn) <= SAT_MAX)
    # flood fill from every border pixel across near-white -> background mask
    bg = np.zeros((H, W), bool)
    q = deque()
    for x in range(W):
        for y in (0, H - 1):
            if nearwhite[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    for y in range(H):
        for x in (0, W - 1):
            if nearwhite[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        if y > 0     and nearwhite[y-1, x] and not bg[y-1, x]: bg[y-1, x] = True; q.append((y-1, x))
        if y < H - 1 and nearwhite[y+1, x] and not bg[y+1, x]: bg[y+1, x] = True; q.append((y+1, x))
        if x > 0     and nearwhite[y, x-1] and not bg[y, x-1]: bg[y, x-1] = True; q.append((y, x-1))
        if x < W - 1 and nearwhite[y, x+1] and not bg[y, x+1]: bg[y, x+1] = True; q.append((y, x+1))
    # rim = paint pixels within FEATHER px of background (keep old soft alpha there)
    near_bg = bg.copy()
    for _ in range(FEATHER):
        d = near_bg.copy()
        d[1:, :] |= near_bg[:-1, :]; d[:-1, :] |= near_bg[1:, :]
        d[:, 1:] |= near_bg[:, :-1]; d[:, :-1] |= near_bg[:, 1:]
        near_bg = d
    rim = near_bg & ~bg
    out = px.copy()
    interior = ~bg & ~rim
    out[interior, :3] = orig[interior]          # solid paint, original color
    out[interior, 3] = 255
    out[bg, 3] = 0                              # true background
    # rim keeps the existing color-to-alpha soft edge (color + alpha untouched)
    Image.fromarray(out.astype(np.uint8)).save(path)
    print(f'{path}: bg {bg.mean()*100:.1f}%  solid {interior.mean()*100:.1f}%  rim {rim.mean()*100:.1f}%')

for f in sys.argv[1:]:
    rematte(f)
