#!/usr/bin/env python3
"""Bake white backgrounds out of TST plates → RGBA "inked onto the map" PNGs.

Recipe (proven on the fox/tank/plane/moto cutouts — see STATE.md):
  alpha = 255 - min(r,g,b)            # white → transparent, keeps watercolor soft edges
  c'    = (c - 255 + a) * 255 / a     # un-multiply from white so colors don't go pale

Optional --drop pass removes big-but-thin alpha components (>3000 px area,
<6 px inscribed radius) — the die-cut "sticker ring" artifact some gens add
around a subject. Leave it OFF for terrain tiles: connected cross-hatching can
be large-but-thin and would get eaten.

Usage: python3 bake_alpha.py in.png out.png [--drop]
"""
import sys
import numpy as np
from PIL import Image


def bake(src, dst, drop=False):
    im = np.asarray(Image.open(src).convert("RGB")).astype(np.int32)
    a = 255 - im.min(axis=2)
    rgb = np.zeros_like(im)
    nz = a > 0
    for c in range(3):
        ch = im[:, :, c]
        rgb[:, :, c][nz] = np.clip((ch[nz] - 255 + a[nz]) * 255 // np.maximum(a[nz], 1), 0, 255)

    if drop:
        from scipy import ndimage
        mask = a > 8
        lab, n = ndimage.label(mask)
        dist = ndimage.distance_transform_edt(mask)
        for i in range(1, n + 1):
            comp = lab == i
            if comp.sum() > 3000 and dist[comp].max() < 6:
                a[comp] = 0

    out = np.dstack([rgb, a[:, :, None]]).astype(np.uint8)
    Image.fromarray(out, "RGBA").save(dst)
    h, w = a.shape
    print(f"baked {dst}  {w}x{h}  opaque {(a > 8).mean():.0%}")


if __name__ == "__main__":
    args = [x for x in sys.argv[1:] if x != "--drop"]
    bake(args[0], args[1], drop="--drop" in sys.argv)
