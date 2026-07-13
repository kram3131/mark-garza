/* ══════════════════════════════════════════════════════════════════════════
   map.config.js — THIS is the file you edit to make the map your own.
   ══════════════════════════════════════════════════════════════════════════

   index.html is the ENGINE (the paper wall, the travelling fox, the smooth
   scroll, the seamless loop). It never needs editing. Everything that makes
   this map *Mark's* — his name, his eras, his notes, his aphorisms, which
   artwork sits where — lives here as plain data.

   To make it yours: change the words below, drop your own painted PNGs into
   assets/ (see prompts/), point the `file:` fields at them, and reload.

   ── the two coordinate rules you need ──
     • x runs WEST→EAST along the route. Bigger x = further into the journey.
       Chapters sit ~20 apart here. The opening is around x=5; chapter 0 near x=15.
     • y is HEIGHT on the paper wall. y≈2–3 sits low near the route; y≈6–7 is
       up near the top of the wall. Notes usually live around y=6.
     Every placement field is OPTIONAL — leave x/y/h/tilt off and the engine
     lays the piece out on sensible defaults.
   ══════════════════════════════════════════════════════════════════════════ */

export const MAP = {
  /* ── who this map is for ── */
  title: 'The Field Map of Mark Garza',   // browser tab
  badge: 'M. Garza',                       // the little corner stamp (top-left HUD)
  odometerKm: 8000,                        // the "km charted" reading at the far end of the route

  /* ── the opening panel (the title card you land on) ── */
  opening: {
    headline: ['The Field Map of', 'Mark Garza'],  // 1–2 lines, big handwriting
    tagline: 'a career, charted',                  // small line under the name
    arc: 'Storyteller → nonprofit founder → AI growth architect',
    hero: { image: 'fox-hero.png', caption: 'fig. 0 — the cartographer' },
    place: {
      headline: { x: 5.2, y: 5.0, h: 2.6, tilt: -.02, font: '700 96px "Caveat"', ink: '#3b2f21' },
      tagline:  { x: 5.2, y: 6.6, h: .8,  z: .06, font: '500 58px "Caveat"', ink: '#8a765a' },
      arc:      { x: 5.4, y: 3.4, h: .72, z: .06, tilt: .015, w: 1500, font: '500 52px "Caveat"', ink: '#6d5c43' },
      hero:     { x: 11.3, y: 4.7, h: 3.1, sway: .008 },
      caption:  { x: 11.3, y: 2.85, h: .5, z: .05, font: '500 44px "Caveat"', ink: '#8a765a' },
    },
    props: [
      { file: 'prop-compass.png', x: 3.4,  h: 1.2, zBack: 1.6, sway: .01 },
      { file: 'prop-twine.png',   x: 13.6, h: .85, zBack: 1.2, sway: .012 },
    ],
  },

  /* ── the mascot: the traveller who carries you east (the fox — kept) ── */
  mascot: {
    scale: 1.15,
    sit:   { file: 'fox.png',        h: 1.3,  yOff: 0, perch: [-.19, 0] },
    walkA: { file: 'fox-walk-a.png', h: 0.72 },
    walkB: { file: 'fox-walk-b.png', h: 0.72 },
  },

  /* ── the vehicles: each era can hand the mascot a ride ── */
  vehicles: {
    plane: { file: 'plane.png', h: 2.35, yOff: .1,  perch: [1.12, .08], flies: true },
    moto:  { file: 'moto.png',  h: 1.65, yOff: -.52, perch: [.22, -.04] },
  },

  /* ── THE CHAPTERS — Mark's waypoints, west (oldest) to east (now) ──
     Order = travel order. The last one is finale:true so it doubles across
     the loop seam and the wrap back to the title is invisible. */
  chapters: [
    {
      id: 'brown',
      wp: 'WP·00', wpX: 15.2,
      // no ride → on foot, a student walking
      note: {
        title: '00 · brown university',
        lines: ['Business & Modern American History.', 'Providence, Rhode Island.',
                'Learned to read a story', 'before scaling one.'],
        x: 17.5, y: 5.9, h: 2.35, tilt: -.03,
      },
      aphorism: { lines: ['“Know the history', ' you build on.”'], ink: '#66713f',
                  x: 26.5, y: 6.9, h: 1.15, tilt: .025, font: '600 60px "Caveat"' },
      art: [ { file: 'brown-campus.png', x: 22.4, y: 2.9, h: 5.2, wallPin: true, sway: 0 } ],
    },

    {
      id: 'agencies',
      wp: 'WP·01', wpX: 35.0,
      ride: 'plane',   // bicoastal — flying between New York and San Francisco
      note: {
        title: '01 · the agency years',
        lines: ['Big ad agencies in New York', 'and San Francisco — learning how',
                'brands earn attention, and how', 'large organizations really run.'],
        x: 36.4, y: 6.7, h: 2.15, tilt: .03,
      },
      aphorism: { lines: ['“Attention is earned,', ' not bought.”'], ink: '#4c6378',
                  x: 45.6, y: 6.7, h: 1.3, tilt: -.02, font: '600 56px "Caveat"' },
      art: [ { file: 'nyc-skyline.png', x: 42, y: 2.6, h: 5.2, wallPin: true, sway: 0 } ],
    },

    {
      id: 'flatwater',
      wp: 'WP·02', wpX: 55.0,
      ride: 'moto',
      note: {
        title: '02 · flatwater foundation',
        lines: ["Founded in 2010, after his father's", 'terminal cancer diagnosis. A paddleboard',
                'ride grew into a nonprofit erasing the', 'cost of mental-health care for cancer families.'],
        x: 57.3, y: 5.9, h: 2.35, tilt: -.025,
      },
      aphorism: { lines: ['“Grief, put to work,', ' becomes grace.”'], ink: '#4c6378',
                  x: 65.2, y: 6.8, h: 1.35, tilt: .02, font: '600 58px "Caveat"' },
      art: [ { file: 'paddleboard.png', x: 62, y: 2.6, h: 5.0, wallPin: true, sway: 0 } ],
      // an extra pinned card beside the main note
      extraNotes: [
        { lines: ['13 years · thousands served', 'HIPAA-compliant software to', 'automate access to care'],
          pin: '#8a765a', font: '500 40px "Caveat"', x: 51.4, y: 3.15, h: 1.3, tilt: .04 },
      ],
    },

    {
      id: 'inspirus',
      wp: 'WP·03', wpX: 75.0,
      // no ride → on foot, finding a new craft
      note: {
        title: '03 · inspirus',
        lines: ['His first formal sales role — and', 'where he mastered LLMs and',
                'automation, applying AI in creative', 'new ways beyond the nonprofit world.'],
        x: 77.4, y: 5.9, h: 2.35, tilt: .03,
      },
      aphorism: { lines: ['“Sell the outcome,', ' automate the rest.”'], ink: '#96543f',
                  x: 85.6, y: 6.8, h: 1.35, tilt: -.025, font: '600 58px "Caveat"' },
      art: [ { file: 'prop-folder-mountains.png', x: 80, y: 2.6, h: 4.2, zBack: 1.5, sway: .006 } ],
      props: [
        { file: 'prop-inkpot.png',    x: 73.4, h: 1.2, zBack: 1.3, sway: .01 },
        { file: 'prop-magnifier.png', x: 86.6, h: 1.1, zBack: 1.2, sway: .012 },
      ],
    },

    {
      id: 'laimen',
      wp: 'WP·04', wpX: 95.0,
      finale: true,   // doubles across the loop seam so the wrap is invisible
      ride: 'moto',
      note: {
        title: '04 · laimen ai',
        lines: ['Founder & Principal Consultant, 2025 →.', 'An AI Growth Architect helping Austin',
                'businesses put Gen AI to work', 'across discovery and sales.'],
        x: 97.3, y: 5.9, h: 2.35, tilt: -.03,
      },
      aphorism: { lines: ['“Map your work —', ' don’t just store it.”'], ink: '#cf7a35',
                  x: 106.5, y: 6.6, h: 1.45, tilt: .02, font: '600 62px "Caveat"' },
      art: [
        { file: 'concept-a-chart.png', x: 99, y: 4.6, h: 3.4, wallPin: true, framed: true, sway: .006 },
        { file: 'prop-compass.png',    x: 92, h: 1.2, zBack: 1.4, sway: .01 },
      ],
      // free handwriting straight on the map (no card) — the closing line
      extraWriting: [
        { lines: ['the map is never finished —', 'and neither is the work. keep scrolling →'],
          ink: '#8a765a', font: '500 52px "Caveat"', x: 107, y: 2.6, h: 1.15, tilt: -.015 },
      ],
    },
  ],
};
