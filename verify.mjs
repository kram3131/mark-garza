// Headless verify for the notebook-world map — the engine's documented recipe:
// real Chromium via the npx playwright cache, __worldSeek + settle, screenshot per scene.
// Run: node verify.mjs   (server on :8231 required — python3 -m http.server 8231)
// PASSES=n (default 3) repeats the whole suite; exit 1 on any failure.
import { chromium } from 'playwright';

const OUT = process.env.OUT || '/tmp/jake-world';
const PASSES = +(process.env.PASSES || 3);
const SCENES = [
  ['welcome', 0.02], ['corps', 0.19], ['edinburgh', 0.34], ['institute', 0.46],
  ['practice', 0.60], ['icm', 0.76], ['notes', 0.90], ['seam', 0.999],
];
// vehicle windows (mirror of index.html) — mode from the fox's route x
const modeOf = px => (px > 14 && px < 30) ? 'tank' : (px > 30 && px < 46) ? 'plane'
                   : (px > 62 && px < 78) ? 'moto' : 'foot';

let failures = 0;
const fail = m => { failures++; console.log('  ✗ FAIL:', m); };
const ok = m => console.log('  ✓', m);

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--enable-unsafe-swiftshader', '--autoplay-policy=no-user-gesture-required'],
});

for (let pass = 1; pass <= PASSES; pass++) {
  console.log(`\n═══ pass ${pass}/${PASSES} ═══`);
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(String(e)));

  await page.goto('http://localhost:8231/index.html?qa', { waitUntil: 'networkidle' });
  await page.waitForFunction(() => window.__worldState && window.__worldState().loaded >= window.__worldState().pending);
  await page.waitForTimeout(800);

  // ── scene sweep ──
  for (const [name, p] of SCENES) {
    await page.evaluate(v => window.__worldSeek(v), p);
    await page.waitForTimeout(1800);   // let the damped progress settle
    if (pass === 1) await page.screenshot({ path: `${OUT}-${name}.png` });
    const st = await page.evaluate(() => window.__worldState());
    const px = st.cam[0] + 1.6, mode = modeOf(px);
    console.log(`  ${name} p=${st.p.toFixed(3)} px=${px.toFixed(1)} mode=${mode} assets ${st.loaded}/${st.pending}`);
    if (st.loaded < st.pending) fail(`${name}: assets ${st.loaded}/${st.pending}`);
    // settled → the sitting fox shows, never a frozen trot frame
    if (!st.fox) fail(`${name}: fox meshes missing`);
    else {
      if (!st.fox.sitVisible || st.fox.walkVisible) fail(`${name}: settled but sit=${st.fox.sitVisible} walk=${st.fox.walkVisible}`);
      if (Math.abs(st.fox.sitH - 1.3) > 1e-6 || Math.abs(st.fox.walkH - 0.72) > 1e-6)
        fail(`${name}: mesh heights sit=${st.fox.sitH} walk=${st.fox.walkH}`);
      if (st.fox.scale !== 1.15 || !st.fox.topLayer)
        fail(`${name}: traveler layer scale=${st.fox.scale} topLayer=${st.fox.topLayer}`);
      // grounded on foot (0.46 = 1.3/2 − .19 padding), perched when riding
      const wantY = mode === 'foot' ? 0.46 : { tank: 1.90, plane: 1.77, moto: 1.43 }[mode];
      if (Math.abs(st.fox.sitY - wantY) > 0.02) fail(`${name}: fox sitY=${st.fox.sitY} want≈${wantY} (${mode})`);
    }
  }
  ok('scene sweep done');

  // ── fox swap: walking vs idle at the SAME foot spot (institute stretch) ──
  await page.evaluate(v => window.__worldSeek(v), 0.44);
  await page.waitForTimeout(2000);
  await page.evaluate(v => window.__worldSeek(v), 0.50);   // long damp → sustained walking
  await page.waitForTimeout(300);
  let st = await page.evaluate(() => window.__worldState());
  if (!st.fox.walkVisible || st.fox.sitVisible) fail(`mid-scroll on foot: walk=${st.fox.walkVisible} sit=${st.fox.sitVisible}`);
  else ok('trot frames show while moving on foot');
  if (pass === 1) await page.screenshot({ path: `${OUT}-fox-walking.png`, clip: { x: 420, y: 300, width: 600, height: 480 } });
  await page.waitForTimeout(2200);
  st = await page.evaluate(() => window.__worldState());
  if (!st.fox.sitVisible || st.fox.walkVisible) fail(`settled on foot: sit=${st.fox.sitVisible} walk=${st.fox.walkVisible}`);
  else ok(`sitting fox returns at rest (sitY=${st.fox.sitY})`);
  if (pass === 1) await page.screenshot({ path: `${OUT}-fox-idle.png`, clip: { x: 420, y: 300, width: 600, height: 480 } });

  // ── scroll smoothness: rAF frame times across a full-route travel ──
  await page.evaluate(() => { window.__ft = []; window.__ftLast = undefined; });
  for (let i = 0; i <= 40; i++) {
    await page.evaluate(v => window.__worldSeek(v), 0.5 + i * 0.0125);  // 0.5 → 1.0, steady drip
    await page.waitForTimeout(110);
  }
  const ft = (await page.evaluate(() => window.__ft)).slice(2);
  await page.evaluate(() => { window.__ft = null; });
  const sorted = [...ft].sort((a, b) => a - b);
  const med = sorted[Math.floor(sorted.length / 2)], p95 = sorted[Math.floor(sorted.length * .95)], max = sorted.at(-1);
  const spikes = ft.filter(v => v > Math.max(2.5 * med, 50)).length;
  console.log(`  frames=${ft.length} median=${med.toFixed(1)}ms p95=${p95.toFixed(1)}ms max=${max.toFixed(1)}ms spikes=${spikes}`);
  if (spikes > 3) fail(`scroll jank: ${spikes} spike frames (>2.5× median)`);
  else ok('scroll frame times steady');

  console.log('  console errors:', errors.length ? errors : 'none');
  if (errors.length) fail(`${errors.length} console errors`);
  await page.close();
}

await browser.close();
console.log(failures ? `\n✗ ${failures} FAILURE(S)` : '\n✓ ALL PASSES CLEAN');
process.exit(failures ? 1 : 0);
