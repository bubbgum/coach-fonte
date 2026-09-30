// Coach Fonte : cache hors ligne
const VERSION = 'coach-fonte-5372330864';
const CORE = ["./", "index.html", "manifest.webmanifest", "fonts/archivo.woff2", "fonts/manrope.woff2", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "img/ab_roller.webp", "img/arnold_dumbbell_press.webp", "img/barbell_bench_press_medium_grip.webp", "img/barbell_curl.webp", "img/barbell_deadlift.webp", "img/barbell_glute_bridge.webp", "img/barbell_hip_thrust.webp", "img/barbell_incline_bench_press_medium_grip.webp", "img/barbell_squat.webp", "img/bench_dips.webp", "img/bent_over_barbell_row.webp", "img/butterfly.webp", "img/cable_crossover.webp", "img/cable_crunch.webp", "img/cable_rope_overhead_triceps_extension.webp", "img/cable_seated_lateral_raise.webp", "img/calf_press_on_the_leg_press_machine.webp", "img/chin-up.webp", "img/close-grip_barbell_bench_press.webp", "img/close-grip_front_lat_pulldown.webp", "img/crunches.webp", "img/dead_bug.webp", "img/dips_chest_version.webp", "img/dips_triceps_version.webp", "img/dumbbell_alternate_bicep_curl.webp", "img/dumbbell_bench_press.webp", "img/dumbbell_flyes.webp", "img/dumbbell_lunges.webp", "img/ez-bar_skullcrusher.webp", "img/face_pull.webp", "img/glute_kickback.webp", "img/goblet_squat.webp", "img/good_morning.webp", "img/hack_squat.webp", "img/hammer_curls.webp", "img/hanging_leg_raise.webp", "img/hyperextensions_back_extensions.webp", "img/incline_dumbbell_curl.webp", "img/incline_dumbbell_press.webp", "img/inverted_row.webp", "img/leg_extensions.webp", "img/leg_press.webp", "img/leverage_chest_press.webp", "img/leverage_high_row.webp", "img/leverage_incline_chest_press.webp", "img/lying_leg_curls.webp", "img/machine_shoulder_military_press.webp", "img/one-arm_dumbbell_row.webp", "img/plank.webp", "img/preacher_curl.webp", "img/pullups.webp", "img/pushups.webp", "img/reverse_flyes.webp", "img/reverse_machine_flyes.webp", "img/romanian_deadlift.webp", "img/russian_twist.webp", "img/seated_bent-over_rear_delt_raise.webp", "img/seated_cable_rows.webp", "img/seated_calf_raise.webp", "img/seated_dumbbell_press.webp", "img/seated_leg_curl.webp", "img/side_lateral_raise.webp", "img/smith_machine_squat.webp", "img/split_squat_with_dumbbells.webp", "img/standing_biceps_cable_curl.webp", "img/standing_calf_raises.webp", "img/standing_dumbbell_triceps_extension.webp", "img/standing_military_press.webp", "img/stiff-legged_dumbbell_deadlift.webp", "img/straight-arm_pulldown.webp", "img/t-bar_row_with_handle.webp", "img/triceps_pushdown.webp", "img/triceps_pushdown_rope_attachment.webp", "img/v-bar_pulldown.webp", "img/wide-grip_lat_pulldown.webp"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.url.endsWith('/index.html');
  if (isPage) {
    // Réseau d'abord pour recevoir les mises à jour, cache si pas de connexion
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res; })
      .catch(() => caches.match('index.html').then(r => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});
