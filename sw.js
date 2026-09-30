// Coach Fonte : cache hors ligne + rappels de séance
const VERSION = 'coach-fonte-5372335494';
const CORE = ["./", "index.html", "manifest.webmanifest", "fonts/archivo.woff2", "fonts/manrope.woff2", "icons/apple-touch-icon.png", "icons/icon-192.png", "icons/icon-512.png", "img/ab_roller.webp", "img/arnold_dumbbell_press.webp", "img/barbell_bench_press_medium_grip.webp", "img/barbell_curl.webp", "img/barbell_deadlift.webp", "img/barbell_glute_bridge.webp", "img/barbell_hip_thrust.webp", "img/barbell_incline_bench_press_medium_grip.webp", "img/barbell_squat.webp", "img/bench_dips.webp", "img/bent_over_barbell_row.webp", "img/butterfly.webp", "img/cable_crossover.webp", "img/cable_crunch.webp", "img/cable_rope_overhead_triceps_extension.webp", "img/cable_seated_lateral_raise.webp", "img/calf_press_on_the_leg_press_machine.webp", "img/chin-up.webp", "img/close-grip_barbell_bench_press.webp", "img/close-grip_front_lat_pulldown.webp", "img/crunches.webp", "img/dead_bug.webp", "img/dips_chest_version.webp", "img/dips_triceps_version.webp", "img/dumbbell_alternate_bicep_curl.webp", "img/dumbbell_bench_press.webp", "img/dumbbell_flyes.webp", "img/dumbbell_lunges.webp", "img/ez-bar_skullcrusher.webp", "img/face_pull.webp", "img/glute_kickback.webp", "img/goblet_squat.webp", "img/good_morning.webp", "img/hack_squat.webp", "img/hammer_curls.webp", "img/hanging_leg_raise.webp", "img/hyperextensions_back_extensions.webp", "img/incline_dumbbell_curl.webp", "img/incline_dumbbell_press.webp", "img/inverted_row.webp", "img/leg_extensions.webp", "img/leg_press.webp", "img/leverage_chest_press.webp", "img/leverage_high_row.webp", "img/leverage_incline_chest_press.webp", "img/lying_leg_curls.webp", "img/machine_shoulder_military_press.webp", "img/one-arm_dumbbell_row.webp", "img/plank.webp", "img/preacher_curl.webp", "img/pullups.webp", "img/pushups.webp", "img/reverse_flyes.webp", "img/reverse_machine_flyes.webp", "img/romanian_deadlift.webp", "img/russian_twist.webp", "img/seated_bent-over_rear_delt_raise.webp", "img/seated_cable_rows.webp", "img/seated_calf_raise.webp", "img/seated_dumbbell_press.webp", "img/seated_leg_curl.webp", "img/side_lateral_raise.webp", "img/smith_machine_squat.webp", "img/split_squat_with_dumbbells.webp", "img/standing_biceps_cable_curl.webp", "img/standing_calf_raises.webp", "img/standing_dumbbell_triceps_extension.webp", "img/standing_military_press.webp", "img/stiff-legged_dumbbell_deadlift.webp", "img/straight-arm_pulldown.webp", "img/t-bar_row_with_handle.webp", "img/triceps_pushdown.webp", "img/triceps_pushdown_rope_attachment.webp", "img/v-bar_pulldown.webp", "img/wide-grip_lat_pulldown.webp"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('coach-fonte-') && k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  const isPage = req.mode === 'navigate' || req.url.endsWith('/index.html');
  if (isPage) {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res; })
      .catch(() => caches.match('index.html').then(r => r || caches.match('./'))));
    return;
  }
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(res => {
    if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
    return res;
  })));
});

/* ----- Rappels ----- */
const MSGS = [
  "La régularité bat la motivation. Tu y vas, même 45 minutes.",
  "Le plus dur, c'est de passer la porte de la salle. Après, c'est toi qui décides.",
  "Chaque série compte. Celle d'aujourd'hui aussi.",
  "Tu ne regretteras jamais une séance faite. Seulement celles que tu sautes.",
  "Ton futur toi te remercie déjà. Sac prêt ?",
  "Pas besoin d'être au top aujourd'hui. Il faut juste être là.",
  "Une rep de plus que la dernière fois. C'est tout ce que je te demande.",
  "Le muscle se construit une séance à la fois. On en ajoute une ?",
  "Les résultats arrivent à ceux qui reviennent. Reviens.",
  "Échauffement, technique, progression. Tu connais la recette.",
  "Personne ne va soulever ces charges à ta place.",
  "Fatigué ? Commence par l'échauffement. L'énergie vient en bougeant.",
  "Semaine {week} : c'est maintenant que ça se joue.",
  "Déjà {total} séances au compteur. On continue la série.",
  "Tu as dit que tu le ferais. Tiens parole.",
  "La discipline, c'est choisir entre ce que tu veux maintenant et ce que tu veux vraiment.",
  "Petit rappel : les courbatures passent, les progrès restent.",
  "Une séance moyenne vaut mieux qu'aucune séance.",
  "Ton corps s'adapte à ce que tu lui demandes. Demande-lui plus.",
  "Aujourd'hui, on bat au moins un chiffre de la semaine dernière.",
  "Mets ta musique, lace tes chaussures, c'est parti.",
  "Le plan est prêt, les charges sont calculées. Il ne manque que toi.",
  "Ceux qui progressent ne sont pas plus motivés. Ils sont plus réguliers.",
  "Pense à la sensation après la séance. Elle vaut le déplacement.",
  "Aucun raccourci, juste des séances. Voici celle du jour.",
  "Tu t'entraînes pour toi, pas pour les autres. Fais-toi plaisir.",
  "Ce soir, tu seras content de l'avoir fait.",
  "La barre ne va pas se lever toute seule.",
  "Chaque kilo ajouté sur la barre, tu l'as mérité. Va chercher le prochain.",
  "Ne compte pas les jours, fais que les jours comptent.",
  "Rappel du coach : pense à boire et à prendre tes protéines aujourd'hui.",
  "Tu es plus fort que la semaine dernière. Prouve-le.",
  "Un peu de sueur aujourd'hui, beaucoup de fierté demain.",
  "Si c'était facile, tout le monde le ferait. Toi, tu le fais.",
  "Objectif du jour : une technique propre sur chaque rep.",
  "Tu as déjà fait le plus dur : commencer. Maintenant, on continue.",
  "Ton programme t'attend. Ton canapé peut attendre.",
  "Les champions sont faits de séances banales répétées longtemps.",
  "Pas d'excuse aujourd'hui, juste une bonne séance.",
  "Respire, concentre-toi, pousse. Une série après l'autre.",
  "Chaque séance est un dépôt sur ton compte santé.",
  "Tu n'as pas besoin de motivation, tu as un plan. Suis-le.",
  "Vise la qualité : amplitude complète, descente contrôlée.",
  "Le progrès, c'est aussi garder le rythme les jours sans envie.",
  "Deux reps en réserve, pas plus. Le coach veille.",
  "Encore une séance vers la meilleure version de toi.",
  "Ta régularité fera la différence dans trois mois. Commence aujourd'hui.",
  "Le miroir ne change pas en un jour. Mais aujourd'hui compte.",
  "Échauffe-toi bien : on protège les articulations pour durer.",
  "Allez, on y va. Tu sais que tu vas être content après.",
];
const REST_TITLES = ["Aujourd'hui, c'est séance", "C'est l'heure de s'entraîner", "Ta séance t'attend", "Rendez-vous à la salle"];
async function readJSON(cacheName, key) { try { const c = await caches.open(cacheName); const r = await c.match(key); return r ? await r.json() : null; } catch (e) { return null; } }
async function writeJSON(cacheName, key, val) { try { const c = await caches.open(cacheName); await c.put(key, new Response(JSON.stringify(val), { headers: { 'content-type': 'application/json' } })); } catch (e) {} }
function sameDay(a, b) { const x = new Date(a), y = new Date(b); return x.getFullYear() === y.getFullYear() && x.getMonth() === y.getMonth() && x.getDate() === y.getDate(); }
async function pickMessage(st) {
  const recent = (await readJSON('cf-state', 'recent')) || [];
  const pool = MSGS.map((m, i) => i).filter(i => !recent.includes(i));
  const i = pool[Math.floor(Math.random() * pool.length)];
  await writeJSON('cf-state', 'recent', recent.concat(i).slice(-35));
  return MSGS[i].replace('{week}', st && st.week || 1).replace('{total}', st && st.total || 0);
}
self.addEventListener('push', e => {
  let data = {}; try { data = e.data ? e.data.json() : {}; } catch (err) {}
  e.waitUntil((async () => {
    const st = await readJSON('cf-state', 'state');
    let title, body;
    if (data.type === 'test') {
      title = 'Coach Fonte';
      body = 'Les rappels fonctionnent. Je te préviendrai les jours de séance.';
    } else if (st && st.last && sameDay(st.last, Date.now())) {
      title = 'Séance déjà faite';
      body = `Bien joué, c'est validé pour aujourd'hui. Pense à tes ${st.prot || ''} g de protéines et à bien dormir.`.replace('tes  g', 'tes');
    } else {
      const msg = await pickMessage(st);
      title = st && st.name ? `Aujourd'hui : ${st.name}` : REST_TITLES[Math.floor(Math.random() * REST_TITLES.length)];
      body = (st && st.muscles ? `${st.muscles}. ` : '') + msg;
    }
    await self.registration.showNotification(title, { body, icon: 'icons/icon-192.png', badge: 'icons/icon-192.png', tag: 'coach-fonte-rappel', data: { url: './' } });
  })());
});
self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(cs => {
    for (const c of cs) { if ('focus' in c) return c.focus(); }
    return self.clients.openWindow('./');
  }));
});
