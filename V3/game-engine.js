// ================================================================
// MISSION MARS V3 — GAME ENGINE
// Controls flow, rendering, interactions, animations, scoring
// ================================================================

// ===== STATE =====
const G = {
  name: '', avatar: '👩‍🚀', water: 10, score: 0,
  phase: 0, screenIdx: 0,
  answers: {}, quizDone: {}, badgesEarned: [],
  audioOn: false, challengeSubmitted: false,
  quizStartTime: 0,
};

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initStarfield();
  renderLanding();
});

// ===== STARFIELD =====
function initStarfield() {
  const c = document.getElementById('starfield');
  const ctx = c.getContext('2d');
  let stars = [];
  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    stars = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * c.width,
        y: Math.random() * c.height,
        r: Math.random() * 1.8 + 0.3,
        a: Math.random(),
        da: (Math.random() - 0.5) * 0.02,
      });
    }
  }
  resize();
  window.addEventListener('resize', resize);
  (function draw() {
    ctx.clearRect(0, 0, c.width, c.height);
    stars.forEach(s => {
      s.a += s.da;
      if (s.a > 1 || s.a < 0.1) s.da *= -1;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,220,255,${s.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
}

// ===== AUDIO =====
let audioCtx, oscillator;
function toggleAudio() {
  G.audioOn = !G.audioOn;
  document.getElementById('audioIcon').textContent = G.audioOn ? '🔊' : '🔇';
  if (G.audioOn) playAmbient();
  else stopAmbient();
}
function playAmbient() {
  try {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(80, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.03, audioCtx.currentTime);
    oscillator.connect(gain).connect(audioCtx.destination);
    oscillator.start();
  } catch(e) {}
}
function stopAmbient() {
  try { oscillator?.stop(); audioCtx?.close(); } catch(e) {}
}
function playSfx(type) {
  if (!G.audioOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.connect(g).connect(ctx.destination);
    if (type === 'correct') { o.frequency.setValueAtTime(523, ctx.currentTime); o.frequency.setValueAtTime(659, ctx.currentTime + 0.1); g.gain.setValueAtTime(0.1, ctx.currentTime); }
    else if (type === 'wrong') { o.frequency.setValueAtTime(200, ctx.currentTime); g.gain.setValueAtTime(0.08, ctx.currentTime); }
    else if (type === 'click') { o.frequency.setValueAtTime(800, ctx.currentTime); g.gain.setValueAtTime(0.05, ctx.currentTime); }
    else if (type === 'points') { o.frequency.setValueAtTime(440, ctx.currentTime); o.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.2); g.gain.setValueAtTime(0.08, ctx.currentTime); }
    else if (type === 'badge') { o.frequency.setValueAtTime(523, ctx.currentTime); o.frequency.setValueAtTime(659, ctx.currentTime + 0.1); o.frequency.setValueAtTime(784, ctx.currentTime + 0.2); g.gain.setValueAtTime(0.1, ctx.currentTime); }
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.4);
    o.start(); o.stop(ctx.currentTime + 0.4);
  } catch(e) {}
}

// ===== TOAST =====
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== SCORE POPUP =====
function showScorePopup(pts) {
  playSfx('points');
  const el = document.createElement('div');
  el.className = 'score-popup';
  el.textContent = `+${pts} pts`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ===== BADGE SYSTEM =====
function earnBadge(badgeId) {
  if (G.badgesEarned.includes(badgeId)) return;
  const badge = BADGES.find(b => b.id === badgeId);
  if (!badge) return;
  G.badgesEarned.push(badgeId);
  playSfx('badge');
  showToast(`🏅 Badge Unlocked: ${badge.name}!`);
}

function checkAutoBadges() {
  // First step
  if (Object.keys(G.answers).filter(k => !k.startsWith('_')).length >= 1) earnBadge('first-step');
  // Quiz ace: 5+ quizzes correct
  const quizCorrect = Object.keys(G.quizDone).filter(k => G.quizDone[k] === 'correct').length;
  if (quizCorrect >= 5) earnBadge('quiz-ace');
  // Perfect quiz
  if (quizCorrect >= 8) earnBadge('perfect-quiz');
  // Mission complete
  if (Object.keys(G.answers).filter(k => !k.startsWith('_')).length >= 8) earnBadge('mission-complete');
}

function renderBadgeGrid() {
  let html = '<div class="badge-grid">';
  BADGES.forEach(b => {
    const unlocked = G.badgesEarned.includes(b.id);
    html += `<div class="badge-item ${unlocked ? 'unlocked' : 'locked'}" title="${b.desc}">
      <div class="badge-icon">${b.icon}</div>
      <div class="badge-name">${b.name}</div>
    </div>`;
  });
  html += '</div>';
  return html;
}

// ===== HUD =====
function updateHud() {
  document.getElementById('hudName').textContent = G.name;
  document.getElementById('hudAvatar').textContent = G.avatar;
  document.getElementById('hudWaterNum').textContent = G.water;
  document.getElementById('hudWaterFill').style.width = (G.water / 10 * 100) + '%';
  document.getElementById('hudScore').textContent = G.score;
  const phase = PHASES[G.phase];
  if (phase?.day) document.getElementById('hudDay').textContent = 'Day ' + phase.day;
}

function showHud(show) {
  document.getElementById('hud').classList.toggle('active', show);
}

// ===== PROGRESS =====
function updateProgress() {
  const rail = document.getElementById('progressRail');
  rail.classList.add('active');
  const total = GAME_CONFIG.totalChallenges;
  let completed = 0;
  PHASES.forEach(p => { if (p.type === 'challenge' && G.answers[p.id]) completed++; });
  document.getElementById('progressFill').style.width = (completed / total * 100) + '%';
  let stepsHtml = '';
  let chNum = 0;
  PHASES.forEach(p => {
    if (p.type !== 'challenge') return;
    chNum++;
    const done = !!G.answers[p.id];
    const current = PHASES[G.phase]?.id === p.id;
    stepsHtml += `<div class="progress-step ${done ? 'done' : ''} ${current ? 'current' : ''}">${chNum}</div>`;
  });
  document.getElementById('progressSteps').innerHTML = stepsHtml;
}

// ===== BOTTOM NAV =====
function showNav(show) {
  document.getElementById('bottomNav').classList.toggle('active', show);
}
function setNavState({ prev = false, next = true, nextLabel = 'Continue →', nextAction = null, prevAction = null } = {}) {
  const nb = document.getElementById('navNext');
  const pb = document.getElementById('navPrev');
  pb.disabled = !prev;
  nb.disabled = !next;
  nb.textContent = nextLabel;
  nb.onclick = nextAction || (() => advancePhase());
  pb.onclick = prevAction || (() => goBack());
}

// ===== RENDERING CORE =====
function renderScreen(html) {
  const container = document.getElementById('screenContainer');
  container.innerHTML = html;
  container.scrollTop = 0;
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function appendToScreen(html) {
  const container = document.getElementById('screenContainer');
  const div = document.createElement('div');
  div.innerHTML = html;
  div.classList.add('anim-slide');
  container.appendChild(div);
  setTimeout(() => div.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

// ===== BLOCK RENDERER =====
function renderBlocks(blocks) {
  return blocks.map((b, i) => {
    const delay = `anim-slide-delay-${Math.min(i, 4)}`;
    switch (b.type) {
      case 'narrative':
        return `<div class="narrative ${delay}"><span class="speaker ${b.speakerClass}">${b.speaker}</span><p>${replaceName(b.text)}</p></div>`;
      case 'card':
        return `<div class="card ${delay}"><div class="card-icon">${b.icon}</div><div class="card-title">${b.title}</div><div class="card-text">${replaceName(b.text)}</div></div>`;
      case 'dialogue':
        return `<div class="dialogue ${delay}">${b.bubbles.map(bb => `<div class="bubble bubble-${bb.side}"><span class="bubble-label ${bb.labelClass}">${bb.label}</span>${replaceName(bb.text)}</div>`).join('')}</div>`;
      case 'stat-grid':
        return `<div class="stat-grid ${delay}">${b.stats.map(s => `<div class="stat-box"><div class="stat-value">${s.value}</div><div class="stat-label">${s.label}</div></div>`).join('')}</div>`;
      case 'bottle-viz':
        return renderBottleViz(b.config, delay);
      case 'day-timeline':
        return renderDayTimeline(b.days, b.supplyDays, delay);
      default:
        return '';
    }
  }).join('');
}

function replaceName(text) {
  return text.replace(/\{name\}/g, G.name || 'Commander');
}

function renderBottleViz(cfg, cls = '') {
  let html = `<div class="bottle-row ${cls}">`;
  for (let i = 0; i < cfg.total; i++) {
    const state = i < cfg.filled ? 'full' : 'lost';
    html += `<div class="bottle ${state}"></div>`;
  }
  html += `</div>`;
  if (cfg.label) html += `<p style="text-align:center;font-size:12px;color:rgba(255,255,255,.45)">${cfg.label}</p>`;
  return html;
}

function renderDayTimeline(days, supplyDays, cls = '') {
  let html = `<div class="day-timeline ${cls}">`;
  for (let d = 1; d <= days; d++) {
    const state = d <= supplyDays ? 'complete' : 'danger';
    html += `<div class="day-pip ${state}">${d}</div>`;
  }
  html += `</div>`;
  html += `<p style="text-align:center;font-size:11px;color:rgba(255,255,255,.35);margin-top:4px">Green = water supplied | Red = no water</p>`;
  return html;
}

// ===== NEEDS VS WANTS MINI-GAME =====
let _nwIndex = 0, _nwScore = 0, _nwItems = [];

function renderNeedsVsWants(callback) {
  _nwIndex = 0;
  _nwScore = 0;
  // Shuffle and pick 6 items
  _nwItems = [...NEEDS_VS_WANTS].sort(() => Math.random() - 0.5).slice(0, 6);

  let html = `<div class="card card-highlight anim-slide" style="text-align:center;margin-bottom:12px">
    <div class="card-icon">🎮</div>
    <div class="card-title">Quick Game: Needs vs Wants</div>
    <div class="card-text">For each item, tap whether it's a <strong style="color:#66bb6a">NEED</strong> or a <strong style="color:#ffa726">WANT</strong>.</div>
  </div>`;
  html += `<div class="nw-score" id="nwScoreDisplay">0 / 6 correct</div>`;
  html += `<div id="nwContainer"></div>`;
  html += `<div id="nwResult" style="display:none;text-align:center;margin-top:14px">
    <button class="btn btn-primary" id="nwContinueBtn">Continue to Challenge →</button>
  </div>`;

  appendToScreen(html);

  document.getElementById('nwContinueBtn').onclick = callback;
  showNextNwItem();
}

function showNextNwItem() {
  if (_nwIndex >= _nwItems.length) {
    // Done
    document.getElementById('nwResult').style.display = 'block';
    const pct = Math.round((_nwScore / _nwItems.length) * 100);
    if (pct >= 80) {
      G.score += 20;
      showScorePopup(20);
      updateHud();
      showToast('Great job on Needs vs Wants! +20 pts');
    }
    return;
  }

  const item = _nwItems[_nwIndex];
  const container = document.getElementById('nwContainer');
  container.innerHTML = `<div class="nw-item" style="animation-delay:${_nwIndex * 0.05}s">
    <div class="nw-label"><span>${item.icon}</span> ${item.item}</div>
    <div class="nw-btns">
      <button class="nw-btn nw-btn-need" onclick="answerNw('need')">Need</button>
      <button class="nw-btn nw-btn-want" onclick="answerNw('want')">Want</button>
    </div>
  </div>`;
}

function answerNw(answer) {
  const item = _nwItems[_nwIndex];
  const container = document.getElementById('nwContainer');
  const nwItem = container.querySelector('.nw-item');

  if (answer === item.answer) {
    _nwScore++;
    nwItem.classList.add('correct');
    playSfx('correct');
  } else {
    nwItem.classList.add('wrong');
    playSfx('wrong');
  }

  document.getElementById('nwScoreDisplay').textContent = `${_nwScore} / ${_nwItems.length} correct`;

  _nwIndex++;
  setTimeout(showNextNwItem, 500);
}

// ===== INFLATION TABLE =====
function renderInflationTable() {
  let html = `<div class="card anim-slide" style="margin:14px 0">
    <div class="card-icon">📈</div>
    <div class="card-title">How Inflation Eats Your Money</div>
    <table class="inflation-table">
      <tr><th>Item</th><th>1990</th><th>2024</th></tr>`;
  INFLATION_EXAMPLES.forEach(ex => {
    html += `<tr><td>${ex.icon} ${ex.item}</td><td class="price-old">${ex.year1990}</td><td class="price-new">${ex.year2024}</td></tr>`;
  });
  html += `</table>
    <p style="font-size:11px;color:rgba(255,255,255,.4);margin-top:8px;text-align:center">This is why your investments must beat inflation (5-6%/year)!</p>
  </div>`;
  return html;
}

// ===== SIP CHART =====
function renderSipChart() {
  const s = SIP_SCENARIOS;
  const milestones = s.milestones;
  let html = `<div class="card anim-slide" style="margin:14px 0">
    <div class="card-icon">📊</div>
    <div class="card-title">₹${s.monthly}/month SIP at ${s.rate}% Returns</div>
    <div class="sip-chart" id="sipChart">`;
  milestones.forEach((m, i) => {
    html += `<div class="sip-col">
      <div class="sip-val" id="sipVal${i}">₹0</div>
      <div style="display:flex;flex-direction:column;width:100%">
        <div class="sip-bar-returns" id="sipBarR${i}" style="height:0px;border-radius:4px 4px 0 0"></div>
        <div class="sip-bar-invested" id="sipBarI${i}" style="height:0px"></div>
      </div>
      <div class="sip-label">${m.years}Y</div>
    </div>`;
  });
  html += `</div>
    <div style="display:flex;justify-content:center;gap:16px;font-size:10px;margin-top:6px">
      <span style="color:rgba(79,195,247,.6)">■ Invested</span>
      <span style="color:#66bb6a">■ Returns</span>
    </div>
  </div>`;
  return html;
}

function animateSipChart() {
  const milestones = SIP_SCENARIOS.milestones;
  const maxVal = Math.max(...milestones.map(m => m.value));
  const maxH = 150;
  milestones.forEach((m, i) => {
    setTimeout(() => {
      const investedH = Math.max(4, (m.invested / maxVal) * maxH);
      const returnsH = Math.max(4, ((m.value - m.invested) / maxVal) * maxH);
      const barI = document.getElementById('sipBarI' + i);
      const barR = document.getElementById('sipBarR' + i);
      const valEl = document.getElementById('sipVal' + i);
      if (barI) barI.style.height = investedH + 'px';
      if (barR) barR.style.height = returnsH + 'px';
      if (valEl) {
        const lakhs = (m.value / 100000).toFixed(1);
        valEl.textContent = lakhs >= 100 ? `₹${(m.value/10000000).toFixed(1)}Cr` : `₹${lakhs}L`;
      }
    }, 200 + i * 250);
  });
}

// ===== EARLY VS LATE COMPARISON =====
function renderEarlyVsLate() {
  const e = SIP_SCENARIOS.earlyVsLate;
  return `<div class="card anim-slide" style="margin:14px 0">
    <div class="card-icon">⏰</div>
    <div class="card-title">Start Early vs Start Late</div>
    <div class="comparison-card">
      <div class="compare-col compare-early">
        <h4>Start at ${e.early.startAge}</h4>
        <div class="compare-stat">Invests age ${e.early.startAge}-${e.early.stopAge} only<br><strong>₹${(e.early.totalInvested/100000).toFixed(0)}L invested</strong></div>
        <div class="compare-stat" style="margin-top:8px">Value at 60:<br><strong style="color:#66bb6a">${e.early.valueAt60}</strong></div>
      </div>
      <div class="compare-col compare-late">
        <h4>Start at ${e.late.startAge}</h4>
        <div class="compare-stat">Invests age ${e.late.startAge}-60<br><strong>₹${(e.late.totalInvested/100000).toFixed(0)}L invested</strong></div>
        <div class="compare-stat" style="margin-top:8px">Value at 60:<br><strong style="color:#ffa726">${e.late.valueAt60}</strong></div>
      </div>
    </div>
    <p style="font-size:11px;color:rgba(255,255,255,.5);text-align:center;margin-top:8px">Starting 10 years earlier with LESS money = MORE wealth! That's compounding.</p>
  </div>`;
}

// ===== MARKET SCENARIOS =====
function renderMarketScenarios() {
  let html = `<div class="card anim-slide" style="margin:14px 0">
    <div class="card-icon">📉</div>
    <div class="card-title">Market Crashes: Don't Panic!</div>
    <div style="font-size:12px;color:rgba(255,255,255,.6);line-height:1.6">
      The stock market ALWAYS recovers from crashes. SIP investors who stayed invested through crashes earned the best returns!
    </div>`;
  MARKET_SCENARIOS.forEach(m => {
    html += `<div class="emotion-scenario" style="margin-top:10px;padding:12px">
      <div class="scenario-year">${m.year}</div>
      <div class="scenario-event" style="font-size:13px">${m.event}</div>
      <div class="scenario-drop">${m.drop}</div>
      <div style="font-size:11px;color:#66bb6a;margin-top:4px">${m.recovery}</div>
    </div>`;
  });
  html += `</div>`;
  return html;
}

// ===== PHASE RENDERER =====
function renderPhase() {
  const phase = PHASES[G.phase];
  if (!phase) return;

  G.challengeSubmitted = false;
  G.screenIdx = 0;

  switch (phase.type) {
    case 'story': renderStoryPhase(phase); break;
    case 'challenge': renderChallengeIntro(phase); break;
    case 'recap': renderRecap(phase); break;
    case 'final': renderFinal(phase); break;
  }
}

// ===== STORY PHASES =====
function renderStoryPhase(phase) {
  const screen = phase.screens[G.screenIdx];
  if (!screen) { advancePhase(); return; }

  showHud(false); showNav(true);
  updateProgress();

  let html = `<div class="section-header anim-slide">
    <div style="font-size:48px;margin-bottom:8px">${screen.icon}</div>
    <div class="section-title">${screen.title}</div>
  </div>`;
  html += renderBlocks(screen.blocks);

  renderScreen(html);

  const isLast = G.screenIdx >= phase.screens.length - 1;
  setNavState({
    prev: G.screenIdx > 0 || G.phase > 0,
    next: true,
    nextLabel: isLast ? 'Start Challenges →' : 'Continue →',
    nextAction: () => {
      if (isLast) advancePhase();
      else { G.screenIdx++; renderStoryPhase(phase); }
    },
    prevAction: () => {
      if (G.screenIdx > 0) { G.screenIdx--; renderStoryPhase(phase); }
      else goBack();
    }
  });
}

// ===== CHALLENGE: INTRO =====
function renderChallengeIntro(phase) {
  showHud(true); showNav(true);
  updateHud(); updateProgress();

  let html = `<div class="section-header anim-slide">
    <div class="section-badge">${phase.badge}</div>
    <div class="section-title">${phase.title}</div>
  </div>`;
  html += renderBlocks(phase.intro.blocks);

  // V3: Show inflation table for ch5
  if (phase.showInflationTable) {
    html += renderInflationTable();
  }

  renderScreen(html);

  setNavState({
    prev: true,
    next: true,
    nextLabel: 'Face the Challenge →',
    nextAction: () => {
      // V3: Show mini-game before interaction if applicable
      if (phase.miniGame === 'needsVsWants' && !G.answers['_nw_done']) {
        renderChallengeInteraction(phase, true);
      } else {
        renderChallengeInteraction(phase, false);
      }
    },
  });
}

// ===== CHALLENGE: INTERACTION =====
function renderChallengeInteraction(phase, showMiniGame) {
  const inter = phase.interaction;
  if (!inter) return;

  let html = `<button class="btn btn-ghost anim-fade" onclick="goBackFromInteraction('${phase.id}')" style="margin-bottom:8px">← Back to briefing</button>`;
  html += `<div class="section-header anim-slide">
    <div class="section-badge">${phase.badge}</div>
    <div class="section-title">${phase.title}</div>
  </div>`;

  renderScreen(html);
  showNav(false);

  if (showMiniGame) {
    renderNeedsVsWants(() => {
      G.answers['_nw_done'] = true;
      renderInteractionControls(phase);
    });
  } else {
    renderInteractionControls(phase);
  }
}

function renderInteractionControls(phase) {
  const inter = phase.interaction;
  let html = '';

  html += `<div class="card card-highlight anim-slide" style="text-align:center">
    <div style="font-size:17px;font-weight:800;color:#ff9a56;line-height:1.5">${inter.question}</div>
  </div>`;

  if (inter.type === 'slider') {
    html += `<div class="slider-group anim-slide-delay-1">
      <div class="slider-display" id="sliderVal">${inter.default}</div>
      <div class="slider-unit">${inter.unit}</div>
      <input type="range" min="${inter.min}" max="${inter.max}" step="${inter.step}" value="${inter.default}" id="sliderInput">
    </div>`;
    if (inter.showBottleViz) {
      html += `<div id="dynamicBottleViz"></div>`;
    }
    html += `<div style="text-align:center;margin-top:12px"><button class="btn btn-primary btn-lg" id="submitBtn" onclick="submitSlider('${phase.id}')">Lock In My Choice</button></div>`;
  }
  else if (inter.type === 'choice') {
    html += `<div class="choices-list anim-slide-delay-1" id="choicesList">`;
    const letters = 'ABCD';
    inter.choices.forEach((c, i) => {
      html += `<button class="choice-card" data-id="${c.id}" onclick="selectChoice(this, '${c.id}', '${phase.id}')">
        <span class="choice-marker">${letters[i]}</span>
        <span class="choice-emoji">${c.emoji}</span>
        <span class="choice-content">
          <span class="choice-title">${c.title}</span>
          ${c.desc ? `<span class="choice-desc">${c.desc}</span>` : ''}
        </span>
      </button>`;
    });
    html += `</div>`;
  }
  else if (inter.type === 'invest-grid') {
    html += `<div class="invest-grid anim-slide-delay-1" id="investGrid">`;
    inter.industries.forEach(ind => {
      html += `<div class="invest-tile" data-id="${ind.id}" onclick="toggleInvestTile(this,'${ind.id}')">
        <div class="tile-icon">${ind.icon}</div>
        <div class="tile-name">${ind.name}</div>
      </div>`;
    });
    html += `</div>`;
    if (inter.hint) html += `<p style="text-align:center;font-size:12px;color:rgba(255,255,255,.4);margin-top:8px">${inter.hint}</p>`;
    html += `<div style="text-align:center;margin-top:14px"><button class="btn btn-primary" id="submitInvestBtn" onclick="submitInvestment('${phase.id}')">Invest Now</button></div>`;
  }

  html += `<div id="feedbackArea"></div>`;

  appendToScreen(html);

  // Slider live update
  if (inter.type === 'slider') {
    const slider = document.getElementById('sliderInput');
    const display = document.getElementById('sliderVal');
    function updateViz() {
      const val = parseFloat(slider.value);
      display.textContent = val;
      if (inter.showBottleViz) {
        const daysLast = Math.min(10, Math.floor(10 / val));
        let vizHtml = '<div class="bottle-row">';
        for (let i = 0; i < 10; i++) {
          vizHtml += `<div class="bottle ${i < daysLast ? 'full' : 'lost'}"></div>`;
        }
        vizHtml += '</div>';
        vizHtml += `<p style="text-align:center;font-size:12px;color:${daysLast >= 10 ? '#66bb6a' : daysLast >= 7 ? '#ffa726' : '#ef5350'};margin-top:6px;font-weight:700">Lasts ${daysLast} of 10 days</p>`;
        document.getElementById('dynamicBottleViz').innerHTML = vizHtml;
      }
    }
    slider.addEventListener('input', updateViz);
    updateViz();
  }
}

// ===== INTERACTION HANDLERS =====
let _selectedChoice = null;
let _investPicks = [];

function selectChoice(btn, id, phaseId) {
  if (G.challengeSubmitted) return;
  playSfx('click');
  document.querySelectorAll('.choice-card').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  _selectedChoice = id;
  setTimeout(() => {
    if (!G.challengeSubmitted) submitChoice(phaseId);
  }, 400);
}

function submitChoice(phaseId) {
  if (G.challengeSubmitted || !_selectedChoice) return;
  G.challengeSubmitted = true;
  document.querySelectorAll('.choice-card').forEach(b => b.classList.add('locked'));
  const phase = PHASES.find(p => p.id === phaseId);
  const result = phase.evaluate(_selectedChoice);
  G.answers[phaseId] = _selectedChoice;
  G.score += result.score;
  _selectedChoice = null;
  // V3: Badge earning
  if (result.badgeEarned && phase.badgeId) earnBadge(phase.badgeId);
  showFeedback(result, phase);
}

function submitSlider(phaseId) {
  if (G.challengeSubmitted) return;
  G.challengeSubmitted = true;
  const val = parseFloat(document.getElementById('sliderInput').value);
  document.getElementById('sliderInput').disabled = true;
  document.getElementById('submitBtn').disabled = true;
  const phase = PHASES.find(p => p.id === phaseId);
  const result = phase.evaluate(val);
  G.answers[phaseId] = val;
  G.score += result.score;
  if (result.badgeEarned && phase.badgeId) earnBadge(phase.badgeId);
  showFeedback(result, phase);
}

function toggleInvestTile(el, id) {
  if (G.challengeSubmitted) return;
  playSfx('click');
  if (_investPicks.includes(id)) {
    _investPicks = _investPicks.filter(x => x !== id);
    el.classList.remove('picked');
  } else {
    _investPicks.push(id);
    el.classList.add('picked');
  }
}

function submitInvestment(phaseId) {
  if (G.challengeSubmitted) return;
  G.challengeSubmitted = true;
  document.querySelectorAll('.invest-tile').forEach(t => { t.style.pointerEvents = 'none'; });
  document.getElementById('submitInvestBtn').disabled = true;

  const phase = PHASES.find(p => p.id === phaseId);
  const result = phase.evaluate(_investPicks);
  G.answers[phaseId] = [..._investPicks];

  // Reveal winners/losers
  phase.interaction.industries.forEach(ind => {
    const tile = document.querySelector(`.invest-tile[data-id="${ind.id}"]`);
    if (tile) {
      setTimeout(() => {
        tile.classList.add(ind.wins ? 'winner' : 'loser');
      }, 300 + Math.random() * 500);
    }
  });

  G.score += result.score;
  if (result.badgeEarned && phase.badgeId) earnBadge(phase.badgeId);
  _investPicks = [];
  setTimeout(() => showFeedback(result, phase), 1200);
}

// ===== FEEDBACK + LESSON + QUIZ =====
function showFeedback(result, phase) {
  showScorePopup(result.score);
  updateHud();
  updateProgress();
  checkAutoBadges();

  let html = `<div class="feedback-card feedback-${result.grade}">
    <div class="feedback-icon">${result.icon}</div>
    <div class="feedback-title">${result.title}</div>
    <div class="feedback-text">${result.text}</div>
  </div>`;

  // Compounding chart
  if (result.showCompound && result.days) {
    html += `<div class="compound-chart" id="compoundChart"></div>`;
  }

  // Lesson
  html += `<div class="lesson-box">
    <div class="lesson-label">💡 ${result.lessonTitle}</div>
    <div class="lesson-text">${result.lesson}</div>
  </div>`;

  // Real world
  if (result.realworld) {
    html += `<div class="realworld-box">
      <div class="realworld-label">🌍 Real-World Connection</div>
      <div class="realworld-text">${result.realworld}</div>
    </div>`;
  }

  // V3: Show SIP chart after ch8
  if (phase.showSipChart) {
    html += renderSipChart();
  }

  // V3: Show market crash scenarios after ch8
  if (phase.showMarketScenarios) {
    html += renderMarketScenarios();
  }

  // V3: Show early vs late after ch7
  if (phase.showEarlyVsLate) {
    html += renderEarlyVsLate();
  }

  // Bonus fact
  const fact = BONUS_FACTS[Math.floor(Math.random() * BONUS_FACTS.length)];
  html += `<div class="card" style="margin-top:14px;border-color:rgba(255,215,0,.15)">
    <div style="font-size:12px;font-weight:800;color:#ffd54f;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px">💎 Did You Know?</div>
    <div style="font-size:13px;color:rgba(255,255,255,.7);line-height:1.6">${fact.fact}</div>
    <div style="font-size:10px;color:rgba(255,255,255,.3);margin-top:4px">— ${fact.source}</div>
  </div>`;

  // Quiz button
  if (phase.quiz && !G.quizDone[phase.id]) {
    html += `<div style="text-align:center;margin-top:16px">
      <button class="btn btn-warning btn-lg" onclick="showQuiz('${phase.id}')">🧠 Take the Quiz — Earn Bonus Points!</button>
    </div>`;
  }

  // Continue button
  html += `<div style="text-align:center;margin-top:14px">
    <button class="btn btn-primary btn-lg" onclick="advancePhase()">Continue Mission →</button>
  </div>`;

  appendToScreen(html);

  // Animate compound chart
  if (result.showCompound && result.days) {
    setTimeout(() => animateCompoundChart(result.days), 400);
  }

  // Animate SIP chart
  if (phase.showSipChart) {
    setTimeout(animateSipChart, 600);
  }
}

function animateCompoundChart(days) {
  const chart = document.getElementById('compoundChart');
  if (!chart) return;
  const max = Math.max(...days);
  chart.innerHTML = days.map((val, i) => {
    return `<div class="compound-col">
      <div class="compound-val">${val}ft</div>
      <div class="compound-bar" id="cbar${i}" style="height:0px"></div>
      <div class="compound-label">D${i+1}</div>
    </div>`;
  }).join('');
  days.forEach((val, i) => {
    setTimeout(() => {
      const bar = document.getElementById('cbar' + i);
      if (bar) bar.style.height = Math.max(4, (val / max) * 150) + 'px';
    }, 200 + i * 180);
  });
}

// ===== QUIZ =====
let _quizTimerInterval = null;

function showQuiz(phaseId) {
  const phase = PHASES.find(p => p.id === phaseId);
  if (!phase?.quiz) return;
  const quiz = phase.quiz;

  const modal = document.getElementById('modal');
  const overlay = document.getElementById('overlay');

  G.quizStartTime = Date.now();

  let html = `<div style="text-align:center;margin-bottom:16px">
    <div style="font-size:36px;margin-bottom:8px">🧠</div>
    <div style="font-size:18px;font-weight:800;color:#ff9a56">Quick Quiz — Bonus Points!</div>
  </div>`;

  // Timer bar
  html += `<div class="quiz-timer-bar"><div class="quiz-timer-fill timer-green" id="quizTimerFill" style="width:100%"></div></div>`;

  html += `<div class="quiz-question">${quiz.question}</div>`;
  html += `<div class="choices-list" id="quizChoices">`;
  quiz.choices.forEach(c => {
    html += `<button class="choice-card" data-id="${c.id}" onclick="answerQuiz('${phaseId}','${c.id}',${c.correct},${c.bonus||false})">
      <span class="choice-marker">${c.id.toUpperCase()}</span>
      <span class="choice-content"><span class="choice-title">${c.text}</span></span>
    </button>`;
  });
  html += `</div><div id="quizResult"></div>`;

  modal.innerHTML = html;
  overlay.classList.add('active');

  // Start timer
  const timeLimit = GAME_CONFIG.quizTimeLimit * 1000;
  const startTime = Date.now();
  _quizTimerInterval = setInterval(() => {
    const elapsed = Date.now() - startTime;
    const pct = Math.max(0, 100 - (elapsed / timeLimit * 100));
    const fill = document.getElementById('quizTimerFill');
    if (fill) {
      fill.style.width = pct + '%';
      fill.className = 'quiz-timer-fill ' + (pct > 50 ? 'timer-green' : pct > 20 ? 'timer-yellow' : 'timer-red');
    }
    if (elapsed >= timeLimit) {
      clearInterval(_quizTimerInterval);
      // Time's up — auto-answer wrong
      if (!G.quizDone[phaseId]) {
        answerQuiz(phaseId, '', false, false);
      }
    }
  }, 100);
}

function answerQuiz(phaseId, choiceId, correct, bonus) {
  if (G.quizDone[phaseId]) return;
  G.quizDone[phaseId] = correct ? 'correct' : 'wrong';
  clearInterval(_quizTimerInterval);

  const elapsed = (Date.now() - G.quizStartTime) / 1000;

  document.querySelectorAll('#quizChoices .choice-card').forEach(b => {
    b.classList.add('locked');
    if (b.dataset.id === choiceId) {
      b.classList.add(correct ? 'correct' : 'wrong');
    }
  });

  const phase = PHASES.find(p => p.id === phaseId);
  let pts = correct ? (bonus ? 30 : 20) : 0;

  // V3: Speed bonus
  if (correct && elapsed < 5) {
    pts += 10;
    // Speed bonus earned
  }

  G.score += pts;
  updateHud();
  checkAutoBadges();

  let resultHtml = '';
  if (correct) {
    playSfx('correct');
    resultHtml = `<div class="quiz-result correct-result" style="margin-top:14px">
      <div style="font-size:32px">✅</div>
      <div style="font-weight:800;font-size:18px;margin:6px 0">Correct! +${pts} points${elapsed < 5 ? ' (Speed Bonus! ⚡)' : ''}</div>
    </div>`;
  } else {
    playSfx('wrong');
    resultHtml = `<div class="quiz-result wrong-result" style="margin-top:14px">
      <div style="font-size:32px">${choiceId ? '❌' : '⏰'}</div>
      <div style="font-weight:800;font-size:18px;margin:6px 0">${choiceId ? 'Not quite!' : 'Time\'s up!'}</div>
    </div>`;
  }
  resultHtml += `<div class="lesson-box" style="margin-top:12px">
    <div class="lesson-label">📖 Explanation</div>
    <div class="lesson-text">${phase.quiz.explanation}</div>
  </div>`;
  resultHtml += `<div style="text-align:center;margin-top:16px">
    <button class="btn btn-primary" onclick="closeModal()">Got It!</button>
  </div>`;

  document.getElementById('quizResult').innerHTML = resultHtml;
  if (correct) showToast(`+${pts} bonus points!`);
}

function closeModal() {
  document.getElementById('overlay').classList.remove('active');
}

// ===== RECAP =====
function renderRecap(phase) {
  showHud(true); showNav(false); updateHud(); updateProgress();
  document.getElementById('progressRail').classList.remove('active');

  let html = `<div class="section-header anim-slide" style="margin-bottom:24px">
    <div style="font-size:52px;margin-bottom:8px">🎓</div>
    <div class="section-title">Mission Debrief</div>
    <div class="section-subtitle">Here are the 8 financial concepts you mastered on Mars!</div>
  </div>`;

  phase.items.forEach((item, i) => {
    html += `<div class="recap-item" style="animation:slideUp .4s ease ${i * 0.1}s both">
      <div class="recap-num">${item.num}</div>
      <div class="recap-content">
        <div class="recap-concept">${item.icon} ${item.concept}</div>
        <div class="recap-lesson">${item.lesson}</div>
      </div>
    </div>`;
  });

  // V3: Badge collection
  html += `<div class="card anim-slide" style="margin-top:20px">
    <div class="card-icon">🏅</div>
    <div class="card-title">Your Badge Collection (${G.badgesEarned.length}/${BADGES.length})</div>
    ${renderBadgeGrid()}
  </div>`;

  html += `<div class="card card-highlight anim-slide" style="margin-top:20px;text-align:center">
    <div style="font-size:32px;margin-bottom:8px">🔑</div>
    <div class="card-title">The Secret Millionaire Formula</div>
    <div class="card-text" style="font-size:15px"><span class="hl">WORK</span> → <span class="hl">EARN</span> → <span class="hl">SAVE</span> → <span class="hl">INVEST (SIP)</span> → <span class="hl">COMPOUND</span> → <span class="hl-green">WEALTH!</span></div>
    <p style="font-size:13px;color:rgba(255,255,255,.5);margin-top:8px">It's not about how MUCH you earn — it's about how EARLY you start and how CONSISTENTLY you invest.</p>
  </div>`;

  html += `<div style="text-align:center;margin-top:20px;display:flex;flex-direction:column;align-items:center;gap:10px">
    <button class="btn btn-primary btn-lg anim-slide" onclick="advancePhase()">See My Results →</button>
    <button class="btn btn-ghost anim-slide" onclick="goBack()">← Back</button>
  </div>`;

  renderScreen(html);
}

// ===== FINAL =====
function renderFinal(phase) {
  showHud(false); showNav(false);
  document.getElementById('progressRail').classList.remove('active');
  checkAutoBadges();

  const rank = phase.ranks.find(r => G.score >= r.minScore) || phase.ranks[phase.ranks.length - 1];
  const today = new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' });

  let html = `<div style="text-align:center;padding-top:20px">
    <div style="font-size:72px" class="anim-float">${rank.emoji}</div>
    <h2 class="anim-slide" style="font-size:28px;font-weight:900;margin:16px 0 8px;background:linear-gradient(135deg,#ffd54f,#ff9a56);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text">Mission Complete!</h2>
  </div>`;

  html += `<div class="cert-frame anim-slide-delay-1">
    <div class="cert-label">Certificate of Achievement</div>
    <div class="cert-title">Mission Mars Financial Literacy Program</div>
    <div class="cert-name">${G.name}</div>
    <div class="cert-rank">${rank.title}</div>
    <div class="cert-score">${G.score}</div>
    <div class="cert-score-label">Total Mission Points</div>
    <div class="cert-date">${today}</div>
  </div>`;

  html += `<div class="stat-grid anim-slide-delay-2">
    <div class="stat-box"><div class="stat-value">${Object.keys(G.answers).filter(k => !k.startsWith('_')).length}</div><div class="stat-label">Challenges Completed</div></div>
    <div class="stat-box"><div class="stat-value">${Object.keys(G.quizDone).length}</div><div class="stat-label">Quizzes Taken</div></div>
    <div class="stat-box"><div class="stat-value">${G.badgesEarned.length}</div><div class="stat-label">Badges Earned</div></div>
    <div class="stat-box"><div class="stat-value">${G.score}</div><div class="stat-label">Points Earned</div></div>
  </div>`;

  // Badge collection
  html += `<div class="card anim-slide-delay-2" style="margin-top:14px">
    <div style="font-size:12px;font-weight:800;color:#ffd54f;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">🏅 Badges (${G.badgesEarned.length}/${BADGES.length})</div>
    ${renderBadgeGrid()}
  </div>`;

  html += `<div class="card anim-slide-delay-3" style="text-align:left;border-color:rgba(255,215,0,.2)">
    <div style="font-size:15px;font-weight:700;color:#ffd54f;margin-bottom:12px;text-align:center">🌟 Your Next Steps</div>
    <ol class="next-steps">
      <li><span class="step-num">1</span> Talk to your parents about opening a mutual fund SIP — even ₹500/month</li>
      <li><span class="step-num">2</span> Start budgeting your pocket money using the 50/30/20 rule</li>
      <li><span class="step-num">3</span> Get health insurance if your family doesn't have it</li>
      <li><span class="step-num">4</span> Never fall for "guaranteed high returns" — check SEBI registration</li>
      <li><span class="step-num">5</span> Remember: START EARLY, invest regularly, and let compounding do its magic!</li>
    </ol>
  </div>`;

  html += `<div style="text-align:center;margin-top:16px" class="anim-slide-delay-4">
    <button class="btn btn-primary btn-lg" onclick="restartGame()">🔄 Play Again</button>
  </div>`;

  html += `<p style="text-align:center;font-size:10px;color:rgba(255,255,255,.25);margin-top:20px;line-height:1.5;max-width:320px;margin-left:auto;margin-right:auto">Mutual Fund investments are subject to market risks, read all scheme related documents carefully. An Investor Education Initiative.</p>`;

  renderScreen(html);
  setTimeout(launchConfetti, 500);
}

// ===== CONFETTI =====
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#ff6b35','#4fc3f7','#ffd54f','#66bb6a','#ff4444','#9c27b0','#e91e63'];
  const pieces = [];
  for (let i = 0; i < 100; i++) {
    pieces.push({
      x: Math.random() * canvas.width,
      y: -20 - Math.random() * 200,
      w: Math.random() * 10 + 6,
      h: Math.random() * 6 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      vy: Math.random() * 3 + 2,
      vx: (Math.random() - 0.5) * 2,
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      p.y += p.vy;
      p.x += p.vx;
      p.rot += p.vr;
      if (frame > 60) p.opacity -= 0.008;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.globalAlpha = Math.max(0, p.opacity);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    frame++;
    if (frame < 200) requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  draw();
}

// ===== NAVIGATION =====
function advancePhase() {
  G.phase++;
  G.screenIdx = 0;
  if (G.phase < PHASES.length) renderPhase();
}

function goBack() {
  if (G.phase > 0) {
    G.phase--;
    G.screenIdx = 0;
    const phase = PHASES[G.phase];
    if (phase.type === 'story') G.screenIdx = phase.screens.length - 1;
    renderPhase();
  }
}

function goBackFromInteraction(phaseId) {
  const phase = PHASES.find(p => p.id === phaseId);
  if (phase) renderChallengeIntro(phase);
}

// ===== LANDING =====
function renderLanding() {
  showHud(false); showNav(false);
  document.getElementById('progressRail').classList.remove('active');

  const html = `<div class="landing-content">
    <div class="mars-hero anim-float">
      <div class="crater"></div><div class="crater"></div><div class="crater"></div>
    </div>
    <div class="landing-title anim-slide">
      <span class="pre">Welcome to</span>
      <span class="main">Mission Mars</span>
    </div>
    <p class="landing-desc anim-slide-delay-1">An epic space adventure that teaches you the secrets of money, saving, investing, and financial success!</p>
    <div class="landing-features anim-slide-delay-2">
      <div class="feature-chip"><span>🎮</span> 8 Challenges</div>
      <div class="feature-chip"><span>🧠</span> 8 Quizzes</div>
      <div class="feature-chip"><span>🏅</span> 12 Badges</div>
      <div class="feature-chip"><span>🏆</span> Certificate</div>
    </div>
    <button class="btn btn-primary btn-lg anim-slide-delay-3 anim-glow" onclick="showNameEntry()">Launch Mission 🚀</button>
    <p class="landing-disclaimer anim-slide-delay-4">An Investor Education & Awareness Initiative. Mutual fund investments are subject to market risks.</p>
  </div>`;

  renderScreen(html);
}

// ===== NAME ENTRY =====
function showNameEntry() {
  showHud(false); showNav(false);

  let avatarHtml = AVATARS.map((a, i) => `<button class="avatar-option ${i===0?'picked':''}" data-avatar="${a.emoji}" onclick="pickAvatar(this,'${a.emoji}')">${a.emoji}</button>`).join('');

  const html = `<div class="name-entry">
    <div style="font-size:11px;text-transform:uppercase;letter-spacing:3px;color:rgba(255,255,255,.4);font-weight:700" class="anim-slide">Choose Your Avatar</div>
    <div class="avatar-pick anim-slide-delay-1">${avatarHtml}</div>
    <h2 class="anim-slide-delay-1" style="font-size:22px;font-weight:800;color:#ff9a56;margin-top:12px">Enter Your Name, Commander</h2>
    <p class="anim-slide-delay-2" style="color:rgba(255,255,255,.5);font-size:13px;max-width:280px">This will appear on your certificate of completion.</p>
    <input class="name-input anim-slide-delay-2" type="text" id="nameInput" placeholder="Your name..." maxlength="24" autocomplete="off">
    <button class="btn btn-primary btn-lg anim-slide-delay-3" id="nameSubmitBtn" onclick="submitName()">Begin Mission →</button>
    <button class="btn btn-ghost anim-slide-delay-3" onclick="renderLanding()">← Back</button>
  </div>`;

  renderScreen(html);

  document.getElementById('nameInput').addEventListener('keydown', e => { if (e.key === 'Enter') submitName(); });
  setTimeout(() => document.getElementById('nameInput').focus(), 600);
}

function pickAvatar(el, avatar) {
  playSfx('click');
  G.avatar = avatar;
  document.querySelectorAll('.avatar-option').forEach(a => a.classList.remove('picked'));
  el.classList.add('picked');
}

function submitName() {
  const name = document.getElementById('nameInput').value.trim();
  if (!name) {
    document.getElementById('nameInput').focus();
    document.getElementById('nameInput').style.borderColor = '#ff4444';
    setTimeout(() => document.getElementById('nameInput').style.borderColor = '', 1000);
    return;
  }
  G.name = name;
  showToast(`Welcome aboard, ${name}! 🚀`);
  G.phase = 0;
  renderPhase();
}

// ===== RESTART =====
function restartGame() {
  Object.assign(G, {
    name:'', avatar:'👩‍🚀', water:10, score:0,
    phase:0, screenIdx:0,
    answers:{}, quizDone:{}, badgesEarned:[],
    challengeSubmitted:false, quizStartTime:0,
  });
  _selectedChoice = null;
  _investPicks = [];
  _nwIndex = 0;
  _nwScore = 0;
  renderLanding();
}

// ===== NAV HELPERS =====
function navNext() { document.getElementById('navNext').onclick(); }
function navPrev() { document.getElementById('navPrev').onclick(); }
