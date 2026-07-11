/* ══════════════════════════════════════════════════════════════════════════
   map.config.js — THIS is the file you edit to make the map your own.
   ══════════════════════════════════════════════════════════════════════════

   index.html is the ENGINE (the paper wall, the travelling fox, the smooth
   scroll, the seamless loop). It never needs editing. Everything that makes
   this map *Jake's* — his name, his eras, his notes, his aphorisms, which
   artwork sits where — lives here as plain data.

   To make it yours: change the words below, drop your own painted PNGs into
   assets/ (see prompts/), point the `file:` fields at them, and reload.
   Prefer to be walked through it? Hand your Claude the `/make-your-map`
   skill in .claude/skills/ and just answer its questions — it rewrites this
   file for you.

   ── the two coordinate rules you need ──
   • x runs WEST→EAST along the route. Bigger x = further into the journey.
     Chapters sit ~16 apart. The opening is around x=5; chapter 0 near x=15.
   • y is HEIGHT on the paper wall. y≈2–3 sits low near the route; y≈6–7 is
     up near the top of the wall. Notes usually live around y=6.
   Every placement field is OPTIONAL — leave x/y/h/tilt off and the engine
   lays the piece out on sensible defaults. The numbers below are Jake's
   hand-tuned originals; keep them, tweak them, or delete them.
   ══════════════════════════════════════════════════════════════════════════ */

export const MAP = {
  /* ── who this map is for ── */
  title: 'The Field Map of Jake Van Clief',   // browser tab
  badge: 'J. Van Clief',                       // the little corner stamp (top-left HUD)
  odometerKm: 5600,                            // the "km charted" reading at the far end of the route

  /* ── the opening panel (the title card you land on) ── */
  opening: {
    headline: ['The Field Map of', 'Jake Van Clief'],  // 1–2 lines, big handwriting
    tagline:  'a life, charted',                        // small line under the name
    arc:      'Marine cryptographer  →  AI-governance researcher  →  solo operator',
    hero:     { image: 'fox-hero.png', caption: 'fig. 0 — the cartographer' },  // the framed portrait
    // placement (optional — these are Jake's originals; you rarely need to touch them)
    place: {
      headline: { x: 5.2, y: 5.0, h: 2.6, tilt: -.02, font: '700 96px "Caveat"', ink: '#3b2f21' },
      tagline:  { x: 5.2, y: 6.6, h: .8,  z: .06,     font: '500 58px "Caveat"', ink: '#8a765a' },
      arc:      { x: 5.4, y: 3.4, h: .72, z: .06, tilt: .015, w: 1400, font: '500 52px "Caveat"', ink: '#6d5c43' },
      hero:     { x: 11.3, y: 4.7, h: 3.1, sway: .008 },
      caption:  { x: 11.3, y: 2.85, h: .5, z: .05, font: '500 44px "Caveat"', ink: '#8a765a' },
    },
    // small props scattered near the opening (foreground doodles by the route)
    props: [
      { file: 'prop-compass.png', x: 3.4,  h: 1.2, zBack: 1.6, sway: .01 },
      { file: 'prop-twine.png',   x: 13.6, h: .85, zBack: 1.2, sway: .012 },
    ],
  },

  /* ── the mascot: the traveller who carries you east ──
     Generate YOUR mascot first (it's the style anchor for everything else —
     see prompts/). Keep the three sprites: a sitting/idle pose and two walk
     frames that flip to make a trot. `scale` sizes the whole ensemble.        */
  mascot: {
    scale: 1.15,
    sit:   { file: 'fox.png',        h: 1.3,  yOff: 0, perch: [-.19, 0] },  // idle + the "foot" perch (grounds him on the road)
    walkA: { file: 'fox-walk-a.png', h: 0.72 },
    walkB: { file: 'fox-walk-b.png', h: 0.72 },
  },

  /* ── the vehicles: each era can hand the mascot a ride ──
     A chapter with `ride: '<id>'` swaps the mascot onto that vehicle for the
     length of that chapter. `perch: [y, x]` seats the mascot on it; `yOff`
     drops the vehicle so its wheels/treads meet the road; `flies: true` lifts
     the whole group off the route (the plane). Omit a chapter's ride and the
     mascot simply travels on foot through it.                                 */
  vehicles: {
    tank:  { file: 'tank.png',  h: 2.0,  yOff: -.53, perch: [.68,  -.12] },
    plane: { file: 'plane.png', h: 2.35, yOff: .1,   perch: [1.12,  .08], flies: true },
    moto:  { file: 'moto.png',  h: 1.65, yOff: -.52, perch: [.22,  -.04] },
  },

  /* ── THE CHAPTERS — your waypoints, west to east ──
     Each is one stop on the map: a pinned note card, an inked aphorism, an
     optional painted backdrop (`art`) and foreground doodles (`props`), and
     optionally a `ride`. Order = travel order. Add or remove freely — the
     engine spaces them ~16 apart and loops back to the opening after the last.
     Mark the last one `finale: true` so it doubles across the loop seam.      */
  chapters: [
    {
      id: 'corps',
      wp: 'WP·00',  wpX: 15.2,
      ride: 'tank',
      note: {
        title: '00 · the corps — 8 years, USMC',
        lines: ['Cryptography and the avionics of', 'F-35 and F-18 flight lines.',
                'Signals before software — building', 'things that cannot afford to fail.'],
        x: 17.5, y: 5.9, h: 2.35, tilt: -.03,
      },
      aphorism: { lines: ['“Build at the layer that survives.”'], ink: '#66713f',
                  x: 27.5, y: 6.9, h: .8, tilt: .025, font: '600 62px "Caveat"' },
      art: [ { file: 'terrain-t1.png', x: 22.5, y: 2.7, h: 6.4, wallPin: true, sway: 0 } ],
    },

    {
      id: 'edinburgh',
      wp: 'WP·01',  wpX: 31.2,
      ride: 'plane',
      note: {
        title: '01 · edinburgh — M.Sc., AI & Governance',
        lines: ['He flies to the birthplace of AI.', 'The turn from running systems', 'to governing them.'],
        x: 32.6, y: 6.0, h: 2.2, tilt: .03,
      },
      aphorism: { lines: ['“In a world full of answers,', ' questions become valuable.”'], ink: '#4c6378',
                  x: 43.6, y: 6.7, h: 1.35, tilt: -.02, font: '600 56px "Caveat"' },
      art: [ { file: 'prop-edinburgh-skyline.png', x: 39, y: 2.5, h: 5.6, wallPin: true, sway: 0 } ],
    },

    {
      id: 'institute',
      wp: 'WP·02',  wpX: 47.2,
      // no ride → on foot
      note: {
        title: '02 · the institute — Edinburgh Futures',
        lines: ['Human psychometric tests, run on', 'the machines — personality and',
                'moral reasoning, measured across', 'seven model providers.'],
        x: 51, y: 5.9, h: 2.35, tilt: -.025,
      },
      aphorism: { lines: ['“You can’t write a reward function', ' for your opinion.”'], ink: '#694f66',
                  x: 57.5, y: 6.8, h: 1.35, tilt: .02, font: '600 56px "Caveat"' },
      props: [
        { file: 'prop-inkpot.png',   x: 49.5, h: 1.2, zBack: 1.3, sway: .01 },
        { file: 'prop-magnifier.png', x: 58.6, h: 1.1, zBack: 1.2, sway: .012 },
      ],
    },

    {
      id: 'practice',
      wp: 'WP·03',  wpX: 63.2,
      ride: 'moto',
      note: {
        title: '03 · the practice — going solo',
        lines: ['Three people producing at the', 'scale of fifty, advising at up to',
                '$2,000 an hour. The system', 'does the scaling.'],
        x: 66.5, y: 5.9, h: 2.35, tilt: .03,
      },
      aphorism: { lines: ['“Stop selling agents.', ' Sell a company.”'], ink: '#96543f',
                  x: 73.5, y: 6.8, h: 1.4, tilt: -.025, font: '600 60px "Caveat"' },
      props: [ { file: 'prop-tea.png', x: 70.8, h: .85, zBack: 1.3, sway: .01 } ],
    },

    {
      id: 'icm',
      wp: 'WP·04',  wpX: 79.2,
      // on foot
      note: {
        title: '04 · ICM — the method',
        lines: ['Folder structure as agent architecture.', 'Numbered folders are stages, markdown',
                'carries the context. Open-source, MIT,', 'published as research.'],
        x: 84.8, y: 6.3, h: 2.3, tilt: -.02,
      },
      aphorism: { lines: ['“The folder IS the agent.”'], ink: '#a9792f',
                  x: 80.5, y: 2.2, h: .8, tilt: .02, font: '600 64px "Caveat"' },
      art: [
        { file: 'prop-folder-mountains.png', x: 88.5, h: 4.2, zBack: 1.5, sway: .006 },
        { file: 'concept-a-chart.png', x: 81.6, y: 4.6, h: 3.4, wallPin: true, framed: true, sway: .006 },
      ],
      // extra pinned cards beyond the main note (e.g. a links card)
      extraNotes: [
        { lines: ['arxiv.org/abs/2603.16021', 'github.com/RinDig'], pin: '#8a765a', font: '500 42px "Caveat"',
          x: 91.3, y: 5.6, h: 1.15, tilt: .04 },
      ],
    },

    {
      id: 'notes',
      wp: 'WP·05',  wpX: 95.4,
      finale: true,   // doubles across the loop seam so the wrap is invisible
      note: {
        title: '05 · clief notes — the teaching layer',
        lines: ['A channel from ~200 to ~48,000 in four', 'months on zero ad spend. ~1,600 trained,',
                '~41,500 mapping their work', 'instead of storing it.'],
        x: 96.8, y: 5.9, h: 2.35, tilt: -.03,
      },
      aphorism: { lines: ['“Map your work,', ' don’t just store it.”'], ink: '#cf7a35',
                  x: 107.3, y: 6.6, h: 1.45, tilt: .02, font: '600 62px "Caveat"' },
      art: [ { file: 'prop-lighthouse-village.png', x: 102.5, y: 2.45, h: 5.4, wallPin: true, sway: 0 } ],
      // free handwriting straight on the map (no card) — the closing line
      extraWriting: [
        { lines: ['the map is never finished —', 'and neither is the work. keep scrolling →'], ink: '#8a765a',
          x: 108.6, y: 2.6, h: 1.15, tilt: -.015, font: '500 52px "Caveat"' },
      ],
    },
  ],
};
