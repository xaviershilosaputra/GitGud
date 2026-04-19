const SFX = {
  enabled: true,
  ctx: null,

  init() {
    try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch(e) { this.enabled = false; }
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  tone(freq, type, vol, startAt, dur) {
    if (!this.enabled || !this.ctx) return;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.connect(g); g.connect(this.ctx.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, startAt);
    g.gain.setValueAtTime(0, startAt);
    g.gain.linearRampToValueAtTime(vol, startAt + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, startAt + dur);
    o.start(startAt); o.stop(startAt + dur + 0.01);
  },

  play(name) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const s = {
      click:    () => this.tone(800,'square',0.04,t,0.04),
      success:  () => [440,554,659,880].forEach((f,i) => this.tone(f,'sine',0.12,t+i*0.07,0.12)),
      error:    () => [220,180].forEach((f,i) => this.tone(f,'sawtooth',0.06,t+i*0.1,0.15)),
      coin:     () => [880,1100,1320].forEach((f,i) => this.tone(f,'sine',0.1,t+i*0.05,0.1)),
      hint:     () => [660,550,440].forEach((f,i) => this.tone(f,'triangle',0.08,t+i*0.09,0.12)),
      streak:   () => [440,554,659,880,1100,880].forEach((f,i) => this.tone(f,'sine',0.13,t+i*0.06,0.1)),
      win:      () => [261,329,392,523,659,784,1047].forEach((f,i) => this.tone(f,'sine',0.14,t+i*0.09,0.15)),
      pageFlip: () => { this.tone(440,'triangle',0.06,t,0.06); this.tone(880,'triangle',0.04,t+0.04,0.05); },
      eraShift: () => [200,400,600,800,400].forEach((f,i) => this.tone(f,'sine',0.08,t+i*0.12,0.18)),
    };
    if (s[name]) s[name]();
  }
};

const DEFAULT_STATE = {
  shards: 0, currentStep: 0, streak: 0, maxStreak: 0,
  soundOn: true, prologueDone: false, tourDone: false,
  completed: [], fieldNotes: []
};

let STATE = { ...DEFAULT_STATE };

/* ----------------------------------------------------------------
   ERA SYSTEM — driven by GAME_CONFIG.eras
---------------------------------------------------------------- */
function applyEra(eraKey) {
  const cfg = GAME_CONFIG.eras;
  Object.keys(cfg).forEach(k => {
    if (cfg[k].cssClass) document.body.classList.remove(cfg[k].cssClass);
  });

  const era = cfg[eraKey];
  if (!era) return;
  if (era.cssClass) document.body.classList.add(era.cssClass);

  const root = document.documentElement;
  Object.entries(era.vars).forEach(([k, v]) => root.style.setProperty(k, v));

  const eraEl  = document.getElementById('logo-era');
  const arcInd = document.getElementById('arc-indicator');
  if (eraEl) eraEl.textContent = era.label;

  const ch = GAME_CONFIG.chapters[STATE.currentStep];
  if (ch) {
    const arc = GAME_CONFIG.arcs[ch.arc];
    if (arcInd && arc) arcInd.textContent = arc.name;
  }
}

/* ----------------------------------------------------------------
   PROLOGUE
---------------------------------------------------------------- */
const PROLOGUE = {
  index: 0,

  init() {
    this.el     = document.getElementById('prologue-text');
    this.pageEl = document.getElementById('prologue-page');
    this.btn    = document.getElementById('prologue-next-btn');
    this.btn.onclick = () => this.next();
    this.render();
  },

  render() {
    const slides = GAME_CONFIG.prologueSlides;
    this.el.style.opacity = '0';
    setTimeout(() => {
      this.el.textContent      = slides[this.index];
      this.el.style.transition = 'opacity 0.6s ease';
      this.el.style.opacity    = '1';
    }, 100);
    this.pageEl.textContent = `${this.index + 1} / ${slides.length}`;
    this.btn.textContent    = this.index < slides.length - 1 ? 'CONTINUE' : 'BEGIN EXPEDITION';
  },

  next() {
    SFX.play('pageFlip');
    if (this.index < GAME_CONFIG.prologueSlides.length - 1) {
      this.index++;
      this.render();
    } else {
      this.finish();
    }
  },

  finish() {
    STATE.prologueDone = true;
    STATE.tourDone     = false;
    GAME.saveState();
    const prologue = document.getElementById('prologue-screen');
    const game     = document.getElementById('game-screen');
    prologue.style.transition = 'opacity 0.8s ease';
    prologue.style.opacity    = '0';
    setTimeout(() => {
      prologue.classList.remove('active');
      game.classList.add('active');
      GAME.renderChapter();
      GAME.rebuildGraph();
      GAME.updateHeader();
      setTimeout(() => TOUR.start(), 600);
    }, 800);
  }
};

/* ----------------------------------------------------------------
   TOUR — fixed highlight system using a positioned ring element
---------------------------------------------------------------- */
const TOUR = {
  step: 0,
  _ov:   null,
  _ring: null,
  _ro:   null, // ResizeObserver watching the current target
  steps: [
    { target: '#story-panel',   title: 'The Story',         body: 'Each chapter begins with a narrative that sets the scene. Read it to understand the context before attempting the task.',                                  position: 'bottom' },
    { target: '#task-box',      title: 'Your Mission',      body: 'The mission box tells you exactly what to do. Some chapters ask you to type a command, others ask you to choose, sort, or match.',                       position: 'bottom' },
    { target: '#question-zone', title: 'The Question Zone', body: 'This is where you answer. For terminal questions, type the command and press Enter. For others, click or drag your answer.',                             position: 'top'    },
    { target: '#hint-btn',      title: 'Oracle Hint',       body: 'Stuck? Spend 5 Shards to reveal a hint. Shards are earned by answering correctly, so use them sparingly.',                                              position: 'top'    },
    { target: '#shard-display', title: 'Shards',            body: 'Shards are your score. You earn them for every correct answer. Build a streak and the rewards feel even better.',                                       position: 'bottom' },
    { target: '#map-btn',       title: 'Expedition Map',    body: 'The map shows every chapter in the archive. Completed chapters are marked. Use it to track your progress at any time.',                                 position: 'bottom' },
    { target: '#settings-btn',  title: 'Settings',          body: 'Access settings to toggle sound, restart the expedition, replay the prologue, or view this guide again at any time.',                                   position: 'bottom' },
    { target: '#git-graph',     title: 'The Chronicle',     body: 'The left panel draws your commit graph as you progress. Each dot is a chapter you have completed. Branch and merge nodes appear in different colors.',  position: 'right'  },
    { target: '#right-panel',   title: 'Field Notes',       body: 'Every command you master gets logged here as a quick reference. By the end of the expedition you will have a complete Git cheat sheet.',                position: 'left'   },
  ],

  start() {
    this.step = 0;
    this._build();
    this._render();
  },

  _build() {
    if (document.getElementById('tour-overlay')) {
      document.getElementById('tour-overlay').style.display = 'block';
      return;
    }

    const ov = document.createElement('div');
    ov.id = 'tour-overlay';
    ov.setAttribute('role', 'dialog');
    ov.setAttribute('aria-modal', 'true');
    ov.setAttribute('aria-label', 'UI guide');
    ov.addEventListener('keydown', e => {
      if (e.key === 'Escape') this.finish();
      if (e.key === 'ArrowRight' || e.key === 'Enter') this.advance();
    });

    // Dimming backdrop — four rectangles leave a gap-free hole via clip-path on box
    const backdrop = document.createElement('div');
    backdrop.id = 'tour-backdrop';
    ov.appendChild(backdrop);

    // Crisp highlight ring that sits exactly on the target
    const ring = document.createElement('div');
    ring.id = 'tour-ring';
    ring.setAttribute('aria-hidden', 'true');
    this._ring = ring;
    ov.appendChild(ring);

    const box = document.createElement('div');
    box.id = 'tour-box';
    box.setAttribute('tabindex', '-1');
    box.innerHTML = `
      <div id="tour-step-label"></div>
      <div id="tour-title"></div>
      <div id="tour-body"></div>
      <div id="tour-actions">
        <button id="tour-skip" class="tour-btn-skip">SKIP GUIDE</button>
        <div id="tour-dots" aria-hidden="true"></div>
        <button id="tour-next" class="tour-btn-next">NEXT</button>
      </div>`;
    ov.appendChild(box);
    document.body.appendChild(ov);
    this._ov = ov;

    document.getElementById('tour-skip').addEventListener('click', () => this.finish());
    document.getElementById('tour-next').addEventListener('click', () => this.advance());
  },

  _render() {
    const ov = document.getElementById('tour-overlay');
    if (!ov) return;
    ov.style.display = 'block';

    const s = this.steps[this.step];
    document.getElementById('tour-step-label').textContent = `STEP ${this.step + 1} OF ${this.steps.length}`;
    document.getElementById('tour-title').textContent      = s.title;
    document.getElementById('tour-body').textContent       = s.body;
    document.getElementById('tour-next').textContent       = this.step < this.steps.length - 1 ? 'NEXT' : 'START EXPLORING';

    const dots = document.getElementById('tour-dots');
    dots.innerHTML = this.steps.map((_, i) =>
      `<span class="tour-dot${i === this.step ? ' active' : ''}" aria-hidden="true"></span>`
    ).join('');

    // Disconnect any previous observer
    if (this._ro) { this._ro.disconnect(); this._ro = null; }

    const target = document.querySelector(s.target);
    if (!target) return;

    const updateRing = () => {
      const pad  = 6;
      const rect = target.getBoundingClientRect();
      const cs   = getComputedStyle(target);
      const br   = parseFloat(cs.borderRadius) || 0;
      const ring = this._ring || document.getElementById('tour-ring');
      if (!ring) return;
      ring.style.top          = `${rect.top    - pad}px`;
      ring.style.left         = `${rect.left   - pad}px`;
      ring.style.width        = `${rect.width  + pad * 2}px`;
      ring.style.height       = `${rect.height + pad * 2}px`;
      ring.style.borderRadius = `${br + pad}px`;
      ring.style.boxShadow    = '0 0 0 9999px rgba(0,0,0,0.72)';
      this._positionBox(rect, s.position);
    };

    updateRing();

    // Watch target for size changes (typewriter growing the story panel, etc.)
    if (window.ResizeObserver) {
      this._ro = new ResizeObserver(updateRing);
      this._ro.observe(target);
    }

    const box = document.getElementById('tour-box');
    requestAnimationFrame(() => box?.focus());
  },

  _positionBox(targetRect, position) {
    const box = document.getElementById('tour-box');
    if (!box) return;
    const vw  = window.innerWidth;
    const vh  = window.innerHeight;
    const bw  = Math.min(340, vw - 32);
    const bh  = 230;
    const gap = 14;
    box.style.width = bw + 'px';
    let top, left;
    if      (position === 'bottom') { top = targetRect.bottom + gap; left = targetRect.left + targetRect.width / 2 - bw / 2; }
    else if (position === 'top')    { top = targetRect.top - bh - gap; left = targetRect.left + targetRect.width / 2 - bw / 2; }
    else if (position === 'right')  { top = targetRect.top + targetRect.height / 2 - bh / 2; left = targetRect.right + gap; }
    else                            { top = targetRect.top + targetRect.height / 2 - bh / 2; left = targetRect.left - bw - gap; }
    box.style.left = Math.max(12, Math.min(left, vw - bw - 12)) + 'px';
    box.style.top  = Math.max(12, Math.min(top,  vh - bh - 12)) + 'px';
  },

  advance() {
    SFX.play('click');
    this.step++;
    if (this.step >= this.steps.length) this.finish();
    else this._render();
  },

  finish() {
    SFX.play('click');
    const ov = document.getElementById('tour-overlay');
    if (ov) ov.style.display = 'none';
    if (this._ro) { this._ro.disconnect(); this._ro = null; }
    STATE.tourDone = true;
    GAME.saveState();
  }
};

let MATCH = { selected: null, col: null, matches: 0 };
let SORT  = { dragging: null, dragEl: null };

/* ----------------------------------------------------------------
   GAME ENGINE
---------------------------------------------------------------- */
const GAME = {
  _twId: 0,

  init() {
    SFX.init();
    this.loadState();

    // Inject fonts
    if (GAME_CONFIG.fonts) {
      const link = document.createElement('link');
      link.rel  = 'stylesheet';
      link.href = GAME_CONFIG.fonts;
      document.head.appendChild(link);
    }

    // Inject branding from config
    document.title = GAME_CONFIG.name;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = GAME_CONFIG.description;
    const logoText = document.querySelector('.logo-text');
    if (logoText) logoText.textContent = GAME_CONFIG.name;

    if (!STATE.prologueDone) {
      document.getElementById('prologue-screen').classList.add('active');
      PROLOGUE.init();
    } else {
      document.getElementById('game-screen').classList.add('active');
      this.renderChapter();
      this.rebuildGraph();
      this.updateHeader();
      if (!STATE.tourDone) setTimeout(() => TOUR.start(), 400);
    }

    document.getElementById('win-title-text').textContent   = GAME_CONFIG.winTitle;
    document.getElementById('win-message-text').textContent = GAME_CONFIG.winMessage;

    const soundBtn = document.getElementById('sound-btn');
    soundBtn.textContent = STATE.soundOn ? 'SFX ON' : 'SFX OFF';

    document.getElementById('sound-btn').addEventListener('click',          () => this.toggleSound());
    document.getElementById('hint-btn').addEventListener('click',           () => this.showHint());
    document.getElementById('skip-btn').addEventListener('click',           () => this.skipChapter());
    document.getElementById('map-btn').addEventListener('click',            () => this.openMap());
    document.getElementById('map-close').addEventListener('click',          () => this.closeMap());
    document.getElementById('fb-continue').addEventListener('click',        () => this.closeFeedback());
    document.getElementById('settings-btn').addEventListener('click',       () => this.openSettings());
    document.getElementById('settings-close').addEventListener('click',     () => this.closeSettings());
    document.getElementById('settings-sound-toggle').addEventListener('click', () => { this.toggleSound(); this._updateSettingsSound(); });
    document.getElementById('settings-tour-btn').addEventListener('click',     () => { this.closeSettings(); setTimeout(() => TOUR.start(), 200); });
    document.getElementById('settings-prologue-btn').addEventListener('click', () => { this.closeSettings(); this._replayPrologue(); });
    document.getElementById('settings-reset-btn').addEventListener('click',    () => { document.getElementById('settings-reset-confirm').style.display = 'block'; });
    document.getElementById('settings-reset-cancel').addEventListener('click', () => { document.getElementById('settings-reset-confirm').style.display = 'none'; });
    document.getElementById('settings-reset-confirm-btn').addEventListener('click', () => {
      document.getElementById('settings-reset-confirm').style.display = 'none';
      this.closeSettings();
      this.reset();
    });

    document.getElementById('map-overlay').addEventListener('click',      e => { if (e.target === e.currentTarget) this.closeMap(); });
    document.getElementById('settings-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) this.closeSettings(); });
    document.getElementById('feedback-overlay').addEventListener('click', e => { if (e.target === e.currentTarget) this.closeFeedback(); });

    document.addEventListener('keydown', e => {
      if (e.key !== 'Escape') return;
      if      (document.getElementById('map-overlay').classList.contains('open'))      this.closeMap();
      else if (document.getElementById('settings-overlay').classList.contains('open')) this.closeSettings();
      else if (document.getElementById('feedback-overlay').classList.contains('open')) this.closeFeedback();
      else if (document.getElementById('tour-overlay')?.style.display === 'block')     TOUR.finish();
    });

    document.body.addEventListener('click', () => SFX.resume(), { once: true });
  },

  saveState() {
    try { localStorage.setItem('game_engine_v1', JSON.stringify(STATE)); } catch(e) {}
  },

  loadState() {
    try {
      const raw = localStorage.getItem('game_engine_v1');
      if (raw) {
        const saved = JSON.parse(raw);
        STATE = { ...DEFAULT_STATE, ...saved };
        const maxStep = GAME_CONFIG.chapters.length;
        if (typeof STATE.currentStep !== 'number' || STATE.currentStep < 0 || STATE.currentStep > maxStep) {
          STATE.currentStep = 0;
        }
        if (!Array.isArray(STATE.completed))  STATE.completed  = [];
        if (!Array.isArray(STATE.fieldNotes)) STATE.fieldNotes = [];
      }
    } catch(e) {
      STATE = { ...DEFAULT_STATE };
      try { localStorage.removeItem('game_engine_v1'); } catch(_) {}
    }
    SFX.enabled = STATE.soundOn;
  },

  reset() {
    const tourEl = document.getElementById('tour-overlay');
    if (tourEl) tourEl.remove();
    TOUR._box = null;
    STATE = { ...DEFAULT_STATE };
    this.saveState();
    const ws = document.getElementById('win-screen');
    ws.classList.remove('active');
    ws.style.display = '';
    PROLOGUE.index = 0;
    const prologue = document.getElementById('prologue-screen');
    prologue.style.opacity    = '1';
    prologue.style.transition = '';
    prologue.classList.add('active');
    document.getElementById('game-screen').classList.remove('active');
    PROLOGUE.init();
  },

  renderChapter() {
    const chapters = GAME_CONFIG.chapters;
    const ch = chapters[STATE.currentStep];
    if (!ch) { this.showWin(); return; }

    const prevArc = STATE.currentStep > 0 ? chapters[STATE.currentStep - 1].arc : null;
    if (prevArc !== null && prevArc !== ch.arc) SFX.play('eraShift');

    const arc = GAME_CONFIG.arcs[ch.arc];
    applyEra(arc ? arc.era : 'era-0');

    document.getElementById('chapter-badge').textContent = `Ch. ${String(ch.id + 1).padStart(2,'0')}`;
    document.getElementById('arc-badge').textContent     = arc ? arc.label : '';
    document.getElementById('chapter-title').textContent = ch.title;
    document.getElementById('story-icon').innerHTML      = arc ? arc.icon : '&#9670;';

    const storyEl = document.getElementById('story-narrative');
    storyEl.textContent = '';
    this.typeWriter(storyEl, ch.story.replace(/\s+/g,' ').trim(), 18);

    document.getElementById('task-text').textContent = ch.task;
    document.getElementById('xp-val').textContent    = ch.xp;

    const typeLabels = {
      terminal: 'TERMINAL', binary: 'BINARY GATE', choice: 'MULTI CHOICE',
      fill: 'FILL THE GAP', sort: 'DRAG & SORT', match: 'PAIR MATCH',
      conflict: 'CONFLICT HUNT', hotspot: 'HOTSPOT',
      'output-read': 'READ OUTPUT', 'truefalse-set': 'TRUE / FALSE', sequence: 'SEQUENCE',
    };
    const qBadge = document.getElementById('qtype-badge');
    qBadge.textContent = typeLabels[ch.qType] || ch.qType.toUpperCase();
    qBadge.className   = `qtype-badge qtype-${ch.qType.replace(/-/g,'')}`;

    const zone = document.getElementById('question-zone');
    zone.innerHTML = '';

    // If chapter has a lesson, show it first as a dismissible inscription panel
    if (ch.lesson) {
      this.renderLesson(ch, zone);
    } else {
      this._renderQuestion(ch, zone);
    }

    this.updateHeader();
    this.updateFieldNotes();
  },

  renderLesson(ch, zone) {
    const panel = document.createElement('div');
    panel.className = 'lesson-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-label', 'Lesson inscription');

    const header = document.createElement('div');
    header.className = 'lesson-header';
    header.innerHTML = `<span class="lesson-label">&#9670; INSCRIPTION RECOVERED</span><span class="lesson-title">${escapeHtml(ch.lesson.title || ch.title)}</span>`;
    panel.appendChild(header);

    const body = document.createElement('div');
    body.className = 'lesson-body';

    ch.lesson.sections.forEach(sec => {
      if (sec.type === 'text') {
        const p = document.createElement('p');
        p.className   = 'lesson-text';
        p.textContent = sec.content;
        body.appendChild(p);
      } else if (sec.type === 'code') {
        const pre = document.createElement('pre');
        pre.className   = 'lesson-code';
        pre.textContent = sec.content;
        body.appendChild(pre);
      } else if (sec.type === 'tip') {
        const tip = document.createElement('div');
        tip.className = 'lesson-tip';
        tip.innerHTML = `<span class="lesson-tip-label">TIP</span><span>${escapeHtml(sec.content)}</span>`;
        body.appendChild(tip);
      } else if (sec.type === 'warning') {
        const warn = document.createElement('div');
        warn.className = 'lesson-warning';
        warn.innerHTML = `<span class="lesson-tip-label">&#9888; CAUTION</span><span>${escapeHtml(sec.content)}</span>`;
        body.appendChild(warn);
      }
    });

    panel.appendChild(body);

    const footer = document.createElement('div');
    footer.className = 'lesson-footer';
    const readyBtn = document.createElement('button');
    readyBtn.className   = 'btn-ancient lesson-ready-btn';
    readyBtn.textContent = 'I UNDERSTAND — TEST ME';
    readyBtn.setAttribute('aria-label', 'Dismiss lesson and attempt the question');
    readyBtn.addEventListener('click', () => {
      SFX.play('pageFlip');
      panel.classList.add('lesson-dismissing');
      setTimeout(() => {
        zone.innerHTML = '';
        this._renderQuestion(ch, zone);
      }, 350);
    });
    footer.appendChild(readyBtn);
    panel.appendChild(footer);
    zone.appendChild(panel);

    // Auto-focus the button so keyboard users can proceed immediately
    requestAnimationFrame(() => readyBtn.focus());
  },

  _renderQuestion(ch, zone) {
    const renderers = {
      terminal:        () => this.renderTerminal(ch, zone),
      binary:          () => this.renderBinary(ch, zone),
      choice:          () => this.renderChoice(ch, zone),
      fill:            () => this.renderFill(ch, zone),
      sort:            () => this.renderSort(ch, zone),
      match:           () => this.renderMatch(ch, zone),
      conflict:        () => this.renderConflict(ch, zone),
      hotspot:         () => this.renderHotspot(ch, zone),
      'output-read':   () => this.renderOutputRead(ch, zone),
      'truefalse-set': () => this.renderTrueFalseSet(ch, zone),
      sequence:        () => this.renderSequence(ch, zone),
    };
    if (renderers[ch.qType]) renderers[ch.qType]();
  },

  typeWriter(el, text, speed = 18) {
    this._twId++;
    const myId = this._twId;
    let i = 0;
    el.textContent = '';
    const tick = () => {
      if (myId !== this._twId) return;
      if (i < text.length) { el.textContent += text[i++]; setTimeout(tick, speed); }
    };
    tick();
  },

  updateHeader() {
    const chapters = GAME_CONFIG.chapters;
    document.getElementById('shard-count').textContent  = STATE.shards;
    document.getElementById('streak-count').textContent = STATE.streak;
    document.getElementById('streak-pill').className    = 'streak-pill' + (STATE.streak >= 3 ? ' hot' : '');
    const total = chapters.length;
    document.getElementById('progress-fill').style.width  = Math.round((STATE.currentStep / total) * 100) + '%';
    document.getElementById('progress-label').textContent = STATE.currentStep + ' / ' + total;
  },

  rebuildGraph() {
    const graph = document.getElementById('git-graph');
    graph.innerHTML = '';
    for (let i = 0; i < STATE.currentStep; i++) {
      const ch = GAME_CONFIG.chapters[i];
      if (!ch) break;
      const row   = document.createElement('div');
      row.className = 'gn-row';
      row.setAttribute('role', 'listitem');
      row.setAttribute('aria-label', ch.title);
      const track = document.createElement('div');
      track.className = 'gn-track';
      const dot = document.createElement('div');
      dot.className = 'gn-dot' + (ch.nodeType === 'branch' ? ' branch' : ch.nodeType === 'merge' ? ' merge' : '');
      if (i === STATE.currentStep - 1) dot.classList.add('current');
      const label = document.createElement('span');
      label.className   = 'gn-label';
      label.textContent = ch.title;
      if (i > 0) { const line = document.createElement('div'); line.className = 'gn-line'; track.appendChild(line); }
      track.appendChild(dot);
      row.appendChild(track);
      row.appendChild(label);
      graph.appendChild(row);
    }
  },

  updateFieldNotes() {
    const el = document.getElementById('field-notes');
    if (!el) return;
    if (!STATE.fieldNotes.length) {
      el.innerHTML = '<div style="font-size:12px;font-style:italic;color:var(--text-faint);">Commands you master will appear here.</div>';
      return;
    }
    el.innerHTML = STATE.fieldNotes.map(n =>
      `<div class="note-entry"><div class="note-cmd">${escapeHtml(n.cmd)}</div><div class="note-desc">${escapeHtml(n.desc)}</div></div>`
    ).join('');
  },

  handleSuccess(ch) {
    STATE.shards   += ch.xp;
    STATE.streak++;
    STATE.maxStreak = Math.max(STATE.maxStreak, STATE.streak);
    if (!STATE.completed.includes(ch.id)) STATE.completed.push(ch.id);
    if (ch.fieldNote && !STATE.fieldNotes.some(n => n.cmd === ch.fieldNote.cmd)) STATE.fieldNotes.push(ch.fieldNote);
    if (STATE.streak >= 3) SFX.play('streak'); else SFX.play('success');
    const sd = document.getElementById('shard-display');
    sd.classList.add('gained');
    setTimeout(() => sd.classList.remove('gained'), 500);
    this.rebuildGraph();
    this.updateHeader();
    this.saveState();
    this.showFeedback(ch);
  },

  showFeedback(ch) {
    const ov = document.getElementById('feedback-overlay');
    document.getElementById('fb-status').textContent      = STATE.streak >= 3 ? `[STREAK x${STATE.streak}]` : '[SUCCESS]';
    document.getElementById('fb-status').className        = 'feedback-status ok';
    document.getElementById('fb-title').textContent       = STATE.streak >= 3 ? `HOT STREAK: ${STATE.streak} IN A ROW` : ch.title.toUpperCase() + ' — RECOVERED';
    document.getElementById('fb-explanation').textContent = ch.explanation;
    document.getElementById('fb-example').textContent     = ch.example || '';
    document.getElementById('fb-reward').textContent      = `+${ch.xp} SHARDS`;
    ov.classList.add('open');
    ov.setAttribute('aria-hidden', 'false');
  },

  closeFeedback() {
    SFX.play('click');
    const ov = document.getElementById('feedback-overlay');
    ov.classList.remove('open');
    ov.setAttribute('aria-hidden', 'true');
    STATE.currentStep++;
    this.saveState();
    if (STATE.currentStep >= GAME_CONFIG.chapters.length) this.showWin();
    else { this.renderChapter(); this.rebuildGraph(); }
  },

  showHint() {
    SFX.play('hint');
    const ch = GAME_CONFIG.chapters[STATE.currentStep];
    if (STATE.shards < 5) { this.toast('NOT ENOUGH SHARDS (need 5)', 'warn'); return; }
    STATE.shards -= 5;
    this.updateHeader();
    this.saveState();
    const zone = document.getElementById('question-zone');
    const ex   = zone.querySelector('.hint-inline');
    if (ex) ex.remove();
    const hint = document.createElement('div');
    hint.className = 'hint-inline';
    hint.setAttribute('role', 'note');
    hint.setAttribute('aria-live', 'polite');
    hint.textContent = '[ORACLE] ' + ch.hint;
    zone.appendChild(hint);
  },

  skipChapter() {
    if (!confirm('Skip this chapter? You will not earn Shards and the streak resets.')) return;
    SFX.play('click');
    STATE.streak = 0;
    STATE.currentStep++;
    this.saveState();
    this.rebuildGraph();
    this.updateHeader();
    if (STATE.currentStep >= GAME_CONFIG.chapters.length) this.showWin();
    else this.renderChapter();
  },

  openMap() {
    SFX.play('click');
    document.getElementById('map-chapters').innerHTML = GAME_CONFIG.chapters.map((ch, i) => {
      const done   = STATE.completed.includes(ch.id);
      const active = i === STATE.currentStep;
      const locked = i > STATE.currentStep;
      const cls    = 'map-item' + (done ? ' done' : active ? ' active' : locked ? ' locked' : '');
      return `<div class="${cls}"><div class="map-dot"></div><span>${String(i+1).padStart(2,'0')}. ${escapeHtml(ch.title)}</span></div>`;
    }).join('');
    document.getElementById('map-overlay').classList.add('open');
    document.getElementById('map-overlay').setAttribute('aria-hidden', 'false');
  },

  closeMap() {
    SFX.play('click');
    document.getElementById('map-overlay').classList.remove('open');
    document.getElementById('map-overlay').setAttribute('aria-hidden', 'true');
  },

  openSettings() {
    SFX.play('click');
    this._updateSettingsSound();
    document.getElementById('settings-reset-confirm').style.display = 'none';
    document.getElementById('settings-overlay').classList.add('open');
    document.getElementById('settings-overlay').setAttribute('aria-hidden', 'false');
  },

  closeSettings() {
    SFX.play('click');
    document.getElementById('settings-overlay').classList.remove('open');
    document.getElementById('settings-overlay').setAttribute('aria-hidden', 'true');
  },

  _updateSettingsSound() {
    const btn = document.getElementById('settings-sound-toggle');
    btn.textContent = STATE.soundOn ? 'SOUND: ON' : 'SOUND: OFF';
    btn.setAttribute('aria-pressed', STATE.soundOn ? 'true' : 'false');
  },

  _replayPrologue() {
    this._twId++;
    PROLOGUE.index = 0;
    const prologue = document.getElementById('prologue-screen');
    const game     = document.getElementById('game-screen');
    prologue.style.opacity    = '1';
    prologue.style.transition = '';
    prologue.classList.add('active');
    game.classList.remove('active');
    PROLOGUE.init();
    PROLOGUE.finish = function() {
      prologue.style.transition = 'opacity 0.8s ease';
      prologue.style.opacity    = '0';
      setTimeout(() => { prologue.classList.remove('active'); game.classList.add('active'); }, 800);
    };
  },

  toggleSound() {
    STATE.soundOn   = !STATE.soundOn;
    SFX.enabled     = STATE.soundOn;
    const btn       = document.getElementById('sound-btn');
    btn.textContent = STATE.soundOn ? 'SFX ON' : 'SFX OFF';
    btn.setAttribute('aria-pressed', String(STATE.soundOn));
    this.saveState();
    if (STATE.soundOn) SFX.play('click');
  },

  showWin() {
    SFX.play('win');
    document.getElementById('win-shards').textContent = STATE.shards;
    document.getElementById('win-streak').textContent = STATE.maxStreak;
    document.getElementById('win-total').textContent  = GAME_CONFIG.chapters.length;
    const ws = document.getElementById('win-screen');
    ws.style.display = 'flex';
    ws.setAttribute('aria-hidden', 'false');
  },

  toast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className   = 'toast';
    t.setAttribute('role', 'alert');
    t.setAttribute('aria-live', 'assertive');
    t.textContent = msg;
    if (type === 'warn') t.style.borderColor = 'var(--red)';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  },

  /* ---------- Question renderers ---------- */

  renderTerminal(ch, zone) {
    const prompt = GAME_CONFIG.terminalPrompt;
    zone.innerHTML = `
      <div class="terminal-wrap" role="region" aria-label="Terminal input">
        <div class="terminal-bar">
          <div class="tdot tdot-r" aria-hidden="true"></div>
          <div class="tdot tdot-y" aria-hidden="true"></div>
          <div class="tdot tdot-g" aria-hidden="true"></div>
          <span class="terminal-label">${escapeHtml(prompt)}</span>
        </div>
        <div id="terminal-output" aria-live="polite" aria-label="Terminal output">
          <p class="tl tl-dim">[SYSTEM] Terminal ready. Awaiting command...</p>
        </div>
        <div class="terminal-input-row">
          <span class="term-prompt" aria-hidden="true">$ </span>
          <input type="text" id="user-input" autocomplete="off" spellcheck="false"
            autocorrect="off" autocapitalize="none" placeholder="type command..."
            aria-label="Type command here">
        </div>
      </div>`;
    const inp = document.getElementById('user-input');
    inp.focus();

    // Command history — arrow up/down scrolls through previous attempts
    // No autocomplete: history only recalls what the user actually typed
    const history = [];
    let histIdx   = -1;
    let draft     = '';

    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (!history.length) return;
        if (histIdx === -1) draft = inp.value;
        histIdx = Math.min(histIdx + 1, history.length - 1);
        inp.value = history[histIdx];
        inp.selectionStart = inp.selectionEnd = inp.value.length;
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (histIdx === -1) return;
        histIdx--;
        inp.value = histIdx === -1 ? draft : history[histIdx];
        inp.selectionStart = inp.selectionEnd = inp.value.length;
      }
    });

    inp.addEventListener('keypress', e => {
      if (e.key !== 'Enter') return;
      SFX.play('click');
      const val = inp.value.trim();
      if (!val) return;
      history.unshift(val);
      if (history.length > 20) history.pop();
      histIdx = -1;
      draft   = '';
      this.appendTerminal(`$ ${val}`, 'tl-dim');
      inp.value = '';
      if (val.toLowerCase() === ch.command.toLowerCase()) {
        this.appendTerminal('[SUCCESS] Command accepted.', 'tl-success');
        inp.disabled = true;
        setTimeout(() => this.handleSuccess(ch), 700);
      } else {
        this.appendTerminal(`[ERROR] "${val}" not recognised. Check syntax and try again.`, 'tl-error');
        SFX.play('error');
      }
    });
  },

  appendTerminal(text, cls = 'tl-dim') {
    const out = document.getElementById('terminal-output');
    if (!out) return;
    const p = document.createElement('p');
    p.className   = 'tl ' + cls;
    p.textContent = text;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  },

  renderBinary(ch, zone) {
    const intro = document.createElement('p');
    intro.style.cssText = 'font-family:var(--font-mono);font-size:13px;color:var(--text-dim);margin-bottom:16px;';
    intro.textContent   = ch.question;
    zone.appendChild(intro);
    const gate = document.createElement('div');
    gate.className = 'binary-gate';
    ch.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'gate-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        SFX.play('click');
        if (opt === ch.answer) {
          btn.classList.add('correct');
          zone.querySelectorAll('.gate-btn').forEach(b => b.disabled = true);
          setTimeout(() => this.handleSuccess(ch), 600);
        } else {
          btn.classList.add('wrong');
          SFX.play('error');
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });
      gate.appendChild(btn);
    });
    zone.appendChild(gate);
  },

  renderChoice(ch, zone) {
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    ch.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'choice-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        SFX.play('click');
        if (opt === ch.answer) {
          btn.classList.add('correct');
          zone.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
          setTimeout(() => this.handleSuccess(ch), 600);
        } else {
          btn.classList.add('wrong');
          SFX.play('error');
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
  },

  renderFill(ch, zone) {
    const wrap = document.createElement('div');
    wrap.className = 'fill-wrap';
    let html = escapeHtml(ch.template);
    ch.blanks.forEach(() => {
      html = html.replace('___', `<input class="fill-blank" autocomplete="off" spellcheck="false" autocapitalize="none" aria-label="Fill in the blank">`);
    });
    wrap.innerHTML = html;
    zone.appendChild(wrap);
    const btn = document.createElement('button');
    btn.className   = 'fill-submit';
    btn.textContent = 'SUBMIT ANSWER';
    zone.appendChild(btn);
    const inputs = wrap.querySelectorAll('.fill-blank');
    inputs[0]?.focus();
    inputs.forEach((inp, i) => inp.setAttribute('size', Math.max((ch.blanks[i] || '').length + 4, 8)));
    const check = () => {
      SFX.play('click');
      let allCorrect = true;
      inputs.forEach((inp, i) => {
        inp.classList.remove('correct', 'wrong');
        if (inp.value.trim().toLowerCase() === ch.blanks[i].toLowerCase()) {
          inp.classList.add('correct');
        } else {
          inp.classList.add('wrong');
          allCorrect = false;
          SFX.play('error');
          setTimeout(() => inp.classList.remove('wrong'), 500);
        }
      });
      if (allCorrect) { btn.disabled = true; setTimeout(() => this.handleSuccess(ch), 600); }
    };
    btn.addEventListener('click', check);
    inputs.forEach(inp => inp.addEventListener('keypress', e => { if (e.key === 'Enter') check(); }));
  },

  renderSort(ch, zone) {
    SORT = { dragging: null, dragEl: null };
    const bankLabel = document.createElement('p');
    bankLabel.className   = 'sort-label';
    bankLabel.textContent = 'AVAILABLE COMMANDS — drag into the correct order below:';
    zone.appendChild(bankLabel);
    const bank = document.createElement('div');
    bank.className = 'sort-bank';
    bank.id        = 'sort-bank';
    bank.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    bank.addEventListener('drop',     e => { e.preventDefault(); if (SORT.dragEl && SORT.dragEl.parentElement !== bank) bank.appendChild(SORT.dragEl); });
    [...ch.items].sort(() => Math.random() - 0.5).forEach(item => bank.appendChild(this._makeSortChip(item)));
    zone.appendChild(bank);
    const targetLabel = document.createElement('p');
    targetLabel.className       = 'sort-label';
    targetLabel.style.marginTop = '12px';
    targetLabel.textContent     = 'DROP HERE — in the correct sequence:';
    zone.appendChild(targetLabel);
    const target = document.createElement('div');
    target.className = 'sort-target';
    target.id        = 'sort-target';
    target.setAttribute('aria-label', 'Drop zone for correct sequence');
    target.addEventListener('dragover',  e => { e.preventDefault(); target.classList.add('over'); e.dataTransfer.dropEffect = 'move'; });
    target.addEventListener('dragleave', () => target.classList.remove('over'));
    target.addEventListener('drop',      e => { e.preventDefault(); target.classList.remove('over'); if (SORT.dragEl) target.appendChild(SORT.dragEl); SFX.play('click'); });
    zone.appendChild(target);
    const verifyBtn = document.createElement('button');
    verifyBtn.className   = 'sort-verify';
    verifyBtn.textContent = 'VERIFY SEQUENCE';
    verifyBtn.addEventListener('click', () => this.checkSort(ch, target, bank, verifyBtn));
    zone.appendChild(verifyBtn);
  },

  _makeSortChip(item) {
    const chip = document.createElement('div');
    chip.className    = 'sort-chip';
    chip.textContent  = item;
    chip.draggable    = true;
    chip.dataset.item = item;
    chip.setAttribute('role', 'option');
    chip.setAttribute('aria-label', item);
    chip.addEventListener('dragstart', e => { SORT.dragEl = chip; chip.classList.add('drag'); e.dataTransfer.effectAllowed = 'move'; e.dataTransfer.setData('text/plain', item); });
    chip.addEventListener('dragend',   () => chip.classList.remove('drag'));
    return chip;
  },

  checkSort(ch, target, bank, btn) {
    SFX.play('click');
    const chips = Array.from(target.querySelectorAll('.sort-chip'));
    if (chips.length !== ch.answer.length) { this.toast('Place ALL commands in the sequence zone first.', 'warn'); return; }
    const correct = ch.answer.every((a, i) => chips[i].dataset.item === a);
    if (correct) {
      chips.forEach(c => c.classList.add('correct-chip'));
      SFX.play('success');
      btn.disabled = true;
      setTimeout(() => this.handleSuccess(ch), 700);
    } else {
      chips.forEach(c => c.classList.add('wrong-chip'));
      SFX.play('error');
      setTimeout(() => { chips.forEach(c => { c.classList.remove('wrong-chip'); bank.appendChild(c); }); }, 800);
    }
  },

  renderMatch(ch, zone) {
    MATCH = { selected: null, col: null, matches: 0 };
    const grid = document.createElement('div');
    grid.className = 'match-grid';
    const mkCol = lbl => {
      const col = document.createElement('div');
      const h   = document.createElement('div');
      h.className   = 'match-col-lbl';
      h.textContent = lbl;
      col.appendChild(h);
      return col;
    };
    const leftCol  = mkCol('COMMANDS');
    const rightCol = mkCol('DESCRIPTIONS');
    const mkChip = (text, col, idx) => {
      const chip = document.createElement('div');
      chip.className   = 'match-chip';
      chip.textContent = text;
      chip.dataset.col = col;
      chip.dataset.val = text;
      if (idx !== undefined) chip.dataset.idx = idx;
      chip.setAttribute('role', 'button');
      chip.setAttribute('tabindex', '0');
      chip.addEventListener('click',    () => this.handleMatch(chip, ch));
      chip.addEventListener('keypress', e => { if (e.key === 'Enter') this.handleMatch(chip, ch); });
      return chip;
    };
    ch.pairs.forEach((p, i) => leftCol.appendChild(mkChip(p.left, 'left', i)));
    [...ch.pairs.map(p => p.right)].sort(() => Math.random() - 0.5).forEach(r => rightCol.appendChild(mkChip(r, 'right')));
    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    zone.appendChild(grid);
  },

  handleMatch(el, ch) {
    if (el.classList.contains('matched')) return;
    SFX.play('click');
    if (!MATCH.selected) {
      MATCH.selected = el; MATCH.col = el.dataset.col; el.classList.add('sel');
    } else {
      if (MATCH.col === el.dataset.col) {
        MATCH.selected.classList.remove('sel');
        MATCH.selected = el; MATCH.col = el.dataset.col; el.classList.add('sel');
        return;
      }
      const leftEl  = MATCH.col === 'left'  ? MATCH.selected : el;
      const rightEl = MATCH.col === 'right' ? MATCH.selected : el;
      const ok      = ch.pairs.some(p => p.left === leftEl.dataset.val && p.right === rightEl.dataset.val);
      MATCH.selected.classList.remove('sel');
      if (ok) {
        leftEl.classList.add('matched'); rightEl.classList.add('matched');
        SFX.play('coin');
        MATCH.matches++;
        if (MATCH.matches === ch.pairs.length) setTimeout(() => this.handleSuccess(ch), 500);
      } else {
        leftEl.classList.add('wrong'); rightEl.classList.add('wrong');
        SFX.play('error');
        setTimeout(() => { leftEl.classList.remove('wrong'); rightEl.classList.remove('wrong'); }, 500);
      }
      MATCH.selected = null; MATCH.col = null;
    }
  },

  renderConflict(ch, zone) {
    const intro = document.createElement('p');
    intro.style.cssText = 'font-family:var(--font-mono);font-size:12px;color:var(--text-dim);margin-bottom:8px;';
    intro.textContent   = 'Click ALL lines that are Git conflict markers:';
    zone.appendChild(intro);
    const file = document.createElement('div');
    file.className = 'conflict-file';
    ch.lines.forEach((line, i) => {
      const row  = document.createElement('div');
      row.className          = 'cf-line';
      row.dataset.marker     = line.isMarker ? '1' : '0';
      row.setAttribute('role', 'checkbox');
      row.setAttribute('aria-checked', 'false');
      row.setAttribute('tabindex', '0');
      const num  = document.createElement('span');
      num.className = 'cf-num'; num.textContent = i + 1; num.setAttribute('aria-hidden', 'true');
      const code = document.createElement('span');
      code.textContent = line.text;
      row.appendChild(num); row.appendChild(code);
      row.addEventListener('click', () => { SFX.play('click'); const c = row.classList.toggle('sel'); row.setAttribute('aria-checked', c ? 'true' : 'false'); });
      row.addEventListener('keypress', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); row.click(); } });
      file.appendChild(row);
    });
    zone.appendChild(file);
    const checkBtn = document.createElement('button');
    checkBtn.className   = 'conflict-check';
    checkBtn.textContent = 'IDENTIFY MARKERS';
    checkBtn.addEventListener('click', () => this.checkConflict(ch, file, checkBtn));
    zone.appendChild(checkBtn);
  },

  checkConflict(ch, file, btn) {
    SFX.play('click');
    const rows = file.querySelectorAll('.cf-line');
    let allCorrect = true;
    rows.forEach((row, i) => {
      const isMarker = ch.lines[i].isMarker;
      const selected = row.classList.contains('sel');
      row.classList.remove('sel');
      if (isMarker && selected)        row.classList.add('hit-good');
      else if (!isMarker && selected) { row.classList.add('hit-bad'); allCorrect = false; }
      else if (isMarker && !selected)   allCorrect = false;
    });
    if (allCorrect) {
      SFX.play('success'); btn.disabled = true;
      setTimeout(() => this.handleSuccess(GAME_CONFIG.chapters[STATE.currentStep]), 700);
    } else {
      SFX.play('error');
      setTimeout(() => rows.forEach(r => r.classList.remove('hit-good', 'hit-bad')), 1000);
    }
  },

  renderHotspot(ch, zone) {
    const intro = document.createElement('p');
    intro.className   = 'hotspot-intro';
    intro.textContent = 'Tap the correct token in the command:';
    zone.appendChild(intro);
    const row = document.createElement('div');
    row.className = 'hotspot-row';
    ch.tokens.forEach(tok => {
      const btn = document.createElement('button');
      btn.className   = 'hotspot-token';
      btn.textContent = tok;
      btn.addEventListener('click', () => {
        SFX.play('click');
        row.querySelectorAll('.hotspot-token').forEach(b => b.classList.remove('sel'));
        if (tok === ch.answer) {
          btn.classList.add('correct');
          row.querySelectorAll('.hotspot-token').forEach(b => b.disabled = true);
          setTimeout(() => this.handleSuccess(ch), 700);
        } else {
          btn.classList.add('wrong');
          SFX.play('error');
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });
      row.appendChild(btn);
    });
    zone.appendChild(row);
  },

  renderOutputRead(ch, zone) {
    const pre = document.createElement('pre');
    pre.className   = 'output-read-pre';
    pre.textContent = ch.output;
    zone.appendChild(pre);
    const q = document.createElement('p');
    q.className   = 'output-read-question';
    q.textContent = ch.question;
    zone.appendChild(q);
    const grid = document.createElement('div');
    grid.className = 'choice-grid';
    ch.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className   = 'choice-btn';
      btn.textContent = opt;
      btn.addEventListener('click', () => {
        SFX.play('click');
        if (opt === ch.answer) {
          btn.classList.add('correct');
          grid.querySelectorAll('.choice-btn').forEach(b => b.disabled = true);
          setTimeout(() => this.handleSuccess(ch), 600);
        } else {
          btn.classList.add('wrong');
          SFX.play('error');
          setTimeout(() => btn.classList.remove('wrong'), 500);
        }
      });
      grid.appendChild(btn);
    });
    zone.appendChild(grid);
  },

  renderTrueFalseSet(ch, zone) {
    const intro = document.createElement('p');
    intro.className   = 'tf-intro';
    intro.textContent = 'Mark each statement as TRUE or FALSE:';
    zone.appendChild(intro);
    const answers = [];
    const rows    = [];
    ch.statements.forEach((stmt, i) => {
      answers.push(null);
      const row = document.createElement('div');
      row.className = 'tf-row';
      const text = document.createElement('div');
      text.className = 'tf-text'; text.textContent = stmt.text;
      row.appendChild(text);
      const btnGroup = document.createElement('div');
      btnGroup.className = 'tf-btns';
      ['TRUE','FALSE'].forEach(label => {
        const btn = document.createElement('button');
        btn.className   = 'tf-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          SFX.play('click');
          btnGroup.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          answers[i] = (label === 'TRUE');
        });
        btnGroup.appendChild(btn);
      });
      row.appendChild(btnGroup);
      zone.appendChild(row);
      rows.push(row);
    });
    const submitBtn = document.createElement('button');
    submitBtn.className   = 'sort-verify';
    submitBtn.textContent = 'SUBMIT ALL ANSWERS';
    submitBtn.addEventListener('click', () => {
      SFX.play('click');
      if (answers.some(a => a === null)) { this.toast('Answer all statements before submitting.', 'warn'); return; }
      let allCorrect = true;
      ch.statements.forEach((stmt, i) => {
        rows[i].querySelectorAll('.tf-btn').forEach(b => b.disabled = true);
        if (answers[i] === stmt.answer) rows[i].classList.add('tf-correct');
        else { rows[i].classList.add('tf-wrong'); allCorrect = false; }
      });
      if (allCorrect) {
        submitBtn.disabled = true;
        setTimeout(() => this.handleSuccess(ch), 800);
      } else {
        SFX.play('error');
        setTimeout(() => {
          rows.forEach(r => r.classList.remove('tf-correct', 'tf-wrong'));
          rows.forEach(r => r.querySelectorAll('.tf-btn').forEach(b => { b.disabled = false; b.classList.remove('selected'); }));
          answers.fill(null);
        }, 1000);
      }
    });
    zone.appendChild(submitBtn);
  },

  renderSequence(ch, zone) {
    let currentStep = 0;
    const buildStep = stepIndex => {
      zone.innerHTML = '';
      const stepObj  = ch.steps[stepIndex];
      const progress = document.createElement('div');
      progress.className = 'seq-progress';
      ch.steps.forEach((s, i) => {
        const dot = document.createElement('div');
        dot.className = 'seq-dot' + (i < stepIndex ? ' done' : i === stepIndex ? ' active' : '');
        dot.title = s.label;
        progress.appendChild(dot);
      });
      zone.appendChild(progress);
      const label = document.createElement('p');
      label.className   = 'seq-prompt';
      label.textContent = stepObj.prompt;
      zone.appendChild(label);
      zone.innerHTML += `
        <div class="terminal-wrap" role="region" aria-label="Sequence terminal">
          <div class="terminal-bar">
            <div class="tdot tdot-r" aria-hidden="true"></div>
            <div class="tdot tdot-y" aria-hidden="true"></div>
            <div class="tdot tdot-g" aria-hidden="true"></div>
            <span class="terminal-label">${escapeHtml(GAME_CONFIG.terminalPrompt)}</span>
          </div>
          <div id="terminal-output" aria-live="polite">
            <p class="tl tl-dim">[SYSTEM] Step ${stepIndex + 1} of ${ch.steps.length} ready.</p>
          </div>
          <div class="terminal-input-row">
            <span class="term-prompt" aria-hidden="true">$ </span>
            <input type="text" id="user-input" autocomplete="off" spellcheck="false"
              autocapitalize="none" placeholder="type command..." aria-label="Type command here">
          </div>
        </div>`;
      const inp = document.getElementById('user-input');
      inp.focus();

      const history = [];
      let histIdx   = -1;
      let draft     = '';

      inp.addEventListener('keydown', e => {
        if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (!history.length) return;
          if (histIdx === -1) draft = inp.value;
          histIdx = Math.min(histIdx + 1, history.length - 1);
          inp.value = history[histIdx];
          inp.selectionStart = inp.selectionEnd = inp.value.length;
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (histIdx === -1) return;
          histIdx--;
          inp.value = histIdx === -1 ? draft : history[histIdx];
          inp.selectionStart = inp.selectionEnd = inp.value.length;
        }
      });

      inp.addEventListener('keypress', e => {
        if (e.key !== 'Enter') return;
        SFX.play('click');
        const val = inp.value.trim();
        if (!val) return;
        history.unshift(val);
        if (history.length > 20) history.pop();
        histIdx = -1;
        draft   = '';
        this.appendTerminal(`$ ${val}`, 'tl-dim');
        inp.value = '';
        if (val.toLowerCase() === stepObj.command.toLowerCase()) {
          this.appendTerminal(`[OK] ${stepObj.label} complete.`, 'tl-success');
          inp.disabled = true;
          currentStep++;
          if (currentStep >= ch.steps.length) setTimeout(() => this.handleSuccess(ch), 800);
          else setTimeout(() => buildStep(currentStep), 900);
        } else {
          this.appendTerminal(`[ERROR] "${val}" not recognised. Try again.`, 'tl-error');
          SFX.play('error');
        }
      });
    };
    buildStep(0);
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

document.addEventListener('DOMContentLoaded', () => GAME.init());
