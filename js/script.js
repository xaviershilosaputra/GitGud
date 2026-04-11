const SFX = {
  enabled: true,
  ctx: null,

  init() {
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) { this.enabled = false; }
  },

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },

  tone(freq, type, vol, startAt, duration) {
    if (!this.enabled || !this.ctx) return;
    const ac = this.ctx;
    const o = ac.createOscillator();
    const g = ac.createGain();
    o.connect(g);
    g.connect(ac.destination);
    o.type = type;
    o.frequency.setValueAtTime(freq, startAt);
    g.gain.setValueAtTime(0, startAt);
    g.gain.linearRampToValueAtTime(vol, startAt + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, startAt + duration);
    o.start(startAt);
    o.stop(startAt + duration + 0.01);
  },

  play(name) {
    if (!this.enabled || !this.ctx) return;
    this.resume();
    const t = this.ctx.currentTime;
    const sequences = {
      click:   () => this.tone(800, 'square', 0.04, t, 0.04),
      success: () => {
        [440, 554, 659, 880].forEach((f, i) => this.tone(f, 'sine', 0.12, t + i * 0.07, 0.12));
      },
      error: () => {
        [220, 180].forEach((f, i) => this.tone(f, 'sawtooth', 0.06, t + i * 0.1, 0.15));
      },
      coin: () => {
        [880, 1100, 1320].forEach((f, i) => this.tone(f, 'sine', 0.1, t + i * 0.05, 0.1));
      },
      hint: () => {
        [660, 550, 440].forEach((f, i) => this.tone(f, 'triangle', 0.08, t + i * 0.09, 0.12));
      },
      streak: () => {
        [440, 554, 659, 880, 1100, 880].forEach((f, i) =>
          this.tone(f, 'sine', 0.13, t + i * 0.06, 0.1));
      },
      win: () => {
        [261, 329, 392, 523, 659, 784, 1047].forEach((f, i) =>
          this.tone(f, 'sine', 0.14, t + i * 0.09, 0.15));
      },
      pageFlip: () => {
        this.tone(440, 'triangle', 0.06, t, 0.06);
        this.tone(880, 'triangle', 0.04, t + 0.04, 0.05);
      },
      eraShift: () => {
        [200, 400, 600, 800, 400].forEach((f, i) =>
          this.tone(f, 'sine', 0.08, t + i * 0.12, 0.18));
      }
    };
    if (sequences[name]) sequences[name]();
  }
};

const DEFAULT_STATE = {
  shards: 0,
  currentStep: 0,
  streak: 0,
  maxStreak: 0,
  soundOn: true,
  prologueDone: false,
  completed: [],
  fieldNotes: []
};

let STATE = { ...DEFAULT_STATE };

const PROLOGUE = {
  index: 0,

  init() {
    this.el = document.getElementById('prologue-text');
    this.pageEl = document.getElementById('prologue-page');
    this.btn = document.getElementById('prologue-next-btn');
    this.btn.addEventListener('click', () => this.next());
    this.render();
  },

  render() {
    const slide = PROLOGUE_SLIDES[this.index];
    this.el.style.opacity = '0';
    setTimeout(() => {
      this.el.textContent = slide;
      this.el.style.transition = 'opacity 0.6s ease';
      this.el.style.opacity = '1';
    }, 100);
    this.pageEl.textContent = `${this.index + 1} / ${PROLOGUE_SLIDES.length}`;
    this.btn.textContent = this.index < PROLOGUE_SLIDES.length - 1 ? 'CONTINUE' : 'BEGIN EXPEDITION';
  },

  next() {
    SFX.play('pageFlip');
    if (this.index < PROLOGUE_SLIDES.length - 1) {
      this.index++;
      this.render();
    } else {
      this.finish();
    }
  },

  finish() {
    STATE.prologueDone = true;
    GAME.saveState();
    const prologue = document.getElementById('prologue-screen');
    const game = document.getElementById('game-screen');
    prologue.style.transition = 'opacity 0.8s ease';
    prologue.style.opacity = '0';
    setTimeout(() => {
      prologue.classList.remove('active');
      game.classList.add('active');
      GAME.renderChapter();
    }, 800);
  }
};

let MATCH = { selected: null, col: null, matches: 0 };

let SORT = { dragging: null };

const GAME = {

  init() {
    SFX.init();
    this.loadState();

    if (!STATE.prologueDone) {
      document.getElementById('prologue-screen').classList.add('active');
      PROLOGUE.init();
    } else {
      document.getElementById('game-screen').classList.add('active');
      this.renderChapter();
      this.rebuildGraph();
      this.updateHeader();
    }

    document.getElementById('hint-btn').addEventListener('click', () => this.showHint());
    document.getElementById('skip-btn').addEventListener('click', () => this.skipChapter());
    document.getElementById('sound-btn').addEventListener('click', () => this.toggleSound());
    document.getElementById('map-btn').addEventListener('click', () => this.openMap());
    document.getElementById('map-close').addEventListener('click', () => this.closeMap());
    document.getElementById('fb-continue').addEventListener('click', () => this.closeFeedback());

    document.body.addEventListener('click', () => SFX.resume(), { once: true });
  },

  saveState() {
    localStorage.setItem('gitgud_v3', JSON.stringify(STATE));
  },

  loadState() {
    const raw = localStorage.getItem('gitgud_v3');
    if (raw) {
      try {
        const saved = JSON.parse(raw);
        STATE = { ...DEFAULT_STATE, ...saved };
      } catch (e) { /* use defaults */ }
    }
    SFX.enabled = STATE.soundOn;
  },

  reset() {
    STATE = { ...DEFAULT_STATE };
    this.saveState();
    document.getElementById('win-screen').classList.remove('active');
    document.getElementById('win-screen').style.display = '';
    document.getElementById('game-screen').classList.add('active');
    this.applyEra(1);
    this.rebuildGraph();
    this.updateHeader();
    this.renderChapter();
  },

  applyEra(arcNum) {
    const arc = ARCS[arcNum];
    if (!arc) return;
    const body = document.body;
    body.classList.remove('era-0', 'era-1', 'era-2');
    if (arc.era !== 'era-0') body.classList.add(arc.era);

    const eraEl = document.getElementById('logo-era');
    if (eraEl) eraEl.textContent = arc.eraName;

    const arcInd = document.getElementById('arc-indicator');
    if (arcInd) arcInd.textContent = arc.name;
  },

  renderChapter() {
    const ch = CHAPTERS[STATE.currentStep];
    if (!ch) { this.showWin(); return; }

    const prevArc = STATE.currentStep > 0 ? CHAPTERS[STATE.currentStep - 1].arc : null;
    if (prevArc !== ch.arc) {
      if (prevArc !== null) SFX.play('eraShift');
      this.applyEra(ch.arc);
    } else {
      this.applyEra(ch.arc);
    }

    document.getElementById('chapter-badge').textContent = `Ch. ${String(ch.id + 1).padStart(2, '0')}`;
    const arc = ARCS[ch.arc];
    document.getElementById('arc-badge').textContent = arc ? arc.label : '';
    document.getElementById('chapter-title').textContent = ch.title;
    document.getElementById('story-icon').innerHTML = arc ? arc.icon : '&#9670;';

    const storyEl = document.getElementById('story-narrative');
    storyEl.textContent = '';
    this.typeWriter(storyEl, ch.story.replace(/\s+/g, ' ').trim(), 18);

    document.getElementById('task-text').textContent = ch.task;
    document.getElementById('xp-val').textContent = ch.xp;

    const qBadge = document.getElementById('qtype-badge');
    const typeLabels = {
      terminal: 'TERMINAL',
      binary:   'BINARY GATE',
      choice:   'MULTI CHOICE',
      fill:     'FILL THE GAP',
      sort:     'DRAG & SORT',
      match:    'PAIR MATCH',
      conflict: 'CONFLICT HUNT'
    };
    qBadge.textContent = typeLabels[ch.qType] || ch.qType.toUpperCase();
    qBadge.className = `qtype-badge qtype-${ch.qType}`;

    const zone = document.getElementById('question-zone');
    zone.innerHTML = '';
    const renderers = {
      terminal: () => this.renderTerminal(ch, zone),
      binary:   () => this.renderBinary(ch, zone),
      choice:   () => this.renderChoice(ch, zone),
      fill:     () => this.renderFill(ch, zone),
      sort:     () => this.renderSort(ch, zone),
      match:    () => this.renderMatch(ch, zone),
      conflict: () => this.renderConflict(ch, zone)
    };
    if (renderers[ch.qType]) renderers[ch.qType]();

    this.updateHeader();
    this.buildChapterSidebar();
    this.updateFieldNotes();
  },

  typeWriter(el, text, speed = 20) {
    let i = 0;
    el.textContent = '';
    const tick = () => {
      if (i < text.length) {
        el.textContent += text[i++];
        setTimeout(tick, speed);
      }
    };
    tick();
  },

  updateHeader() {
    document.getElementById('shard-count').textContent = STATE.shards;
    document.getElementById('streak-count').textContent = STATE.streak;
    const sp = document.getElementById('streak-pill');
    sp.className = 'streak-pill' + (STATE.streak >= 3 ? ' hot' : '');

    const pct = Math.round((STATE.currentStep / CHAPTERS.length) * 100);
    document.getElementById('progress-fill').style.width = pct + '%';
    document.getElementById('progress-label').textContent =
      STATE.currentStep + ' / ' + CHAPTERS.length;
  },

  rebuildGraph() {
    const graph = document.getElementById('git-graph');
    graph.innerHTML = '';
    for (let i = 0; i < STATE.currentStep; i++) {
      const ch = CHAPTERS[i];
      if (!ch) break;

      const row = document.createElement('div');
      row.className = 'gn-row';
      row.setAttribute('role', 'listitem');
      row.setAttribute('aria-label', ch.title);

      const track = document.createElement('div');
      track.className = 'gn-track';

      const dot = document.createElement('div');
      dot.className = 'gn-dot' +
        (ch.nodeType === 'branch' ? ' branch' : ch.nodeType === 'merge' ? ' merge' : '');
      if (i === STATE.currentStep - 1) dot.classList.add('current');

      const label = document.createElement('span');
      label.className = 'gn-label';
      label.textContent = ch.title;

      if (i > 0) {
        const line = document.createElement('div');
        line.className = 'gn-line';
        track.appendChild(line);
      }
      track.appendChild(dot);
      row.appendChild(track);
      row.appendChild(label);
      graph.appendChild(row);
    }
  },

  buildChapterSidebar() {
    this.updateFieldNotes();
  },

  updateFieldNotes() {
    const el = document.getElementById('field-notes');
    if (!el) return;
    if (STATE.fieldNotes.length === 0) {
      el.innerHTML = '<div style="font-size:12px;font-style:italic;color:var(--text-faint);">Commands you master will appear here.</div>';
      return;
    }
    el.innerHTML = STATE.fieldNotes.map(n =>
      `<div class="note-entry">
        <div class="note-cmd">${escapeHtml(n.cmd)}</div>
        <div class="note-desc">${escapeHtml(n.desc)}</div>
      </div>`
    ).join('');
  },

  handleSuccess(ch) {
    STATE.shards += ch.xp;
    STATE.streak++;
    STATE.maxStreak = Math.max(STATE.maxStreak, STATE.streak);
    if (!STATE.completed.includes(ch.id)) STATE.completed.push(ch.id);

    if (ch.fieldNote && !STATE.fieldNotes.some(n => n.cmd === ch.fieldNote.cmd)) {
      STATE.fieldNotes.push(ch.fieldNote);
    }

    if (STATE.streak >= 3) SFX.play('streak');
    else SFX.play('success');

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
    document.getElementById('fb-status').textContent =
      STATE.streak >= 3 ? `[STREAK x${STATE.streak}]` : '[SUCCESS]';
    document.getElementById('fb-status').className =
      'feedback-status ok';
    document.getElementById('fb-title').textContent =
      STATE.streak >= 3 ? `HOT STREAK: ${STATE.streak} IN A ROW` : ch.title.toUpperCase() + ' — RECOVERED';
    document.getElementById('fb-explanation').textContent = ch.explanation;
    document.getElementById('fb-example').textContent = ch.example || '';
    document.getElementById('fb-reward').textContent = `+${ch.xp} SHARDS`;
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
    if (STATE.currentStep >= CHAPTERS.length) {
      this.showWin();
    } else {
      this.renderChapter();
      this.rebuildGraph();
    }
  },

  showHint() {
    SFX.play('hint');
    const ch = CHAPTERS[STATE.currentStep];
    if (STATE.shards < 5) {
      this.toast('NOT ENOUGH SHARDS (need 5)', 'warn');
      return;
    }
    STATE.shards -= 5;
    this.updateHeader();
    this.saveState();

    const zone = document.getElementById('question-zone');
    // Remove existing hint
    const existing = zone.querySelector('.hint-inline');
    if (existing) existing.remove();

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
    if (STATE.currentStep >= CHAPTERS.length) {
      this.showWin();
    } else {
      this.renderChapter();
    }
  },

  openMap() {
    SFX.play('click');
    const container = document.getElementById('map-chapters');
    container.innerHTML = CHAPTERS.map((ch, i) => {
      const done = STATE.completed.includes(ch.id);
      const active = i === STATE.currentStep;
      const locked = i > STATE.currentStep;
      let cls = 'map-item';
      if (done) cls += ' done';
      else if (active) cls += ' active';
      else if (locked) cls += ' locked';
      return `<div class="${cls}">
        <div class="map-dot"></div>
        <span>${String(i + 1).padStart(2, '0')}. ${escapeHtml(ch.title)}</span>
      </div>`;
    }).join('');
    document.getElementById('map-overlay').classList.add('open');
    document.getElementById('map-overlay').setAttribute('aria-hidden', 'false');
  },

  closeMap() {
    SFX.play('click');
    document.getElementById('map-overlay').classList.remove('open');
    document.getElementById('map-overlay').setAttribute('aria-hidden', 'true');
  },

  toggleSound() {
    STATE.soundOn = !STATE.soundOn;
    SFX.enabled = STATE.soundOn;
    document.getElementById('sound-btn').textContent = STATE.soundOn ? '&#9834;' : '&#9834;&#x0338;';
    this.saveState();
    if (STATE.soundOn) SFX.play('click');
  },

  showWin() {
    SFX.play('win');
    document.getElementById('win-shards').textContent = STATE.shards;
    document.getElementById('win-streak').textContent = STATE.maxStreak;
    const ws = document.getElementById('win-screen');
    ws.style.display = 'flex';
    ws.setAttribute('aria-hidden', 'false');
  },

  toast(msg, type = 'info') {
    const t = document.createElement('div');
    t.className = 'toast';
    t.setAttribute('role', 'alert');
    t.setAttribute('aria-live', 'assertive');
    t.textContent = msg;
    if (type === 'warn') t.style.borderColor = 'var(--red)';
    document.body.appendChild(t);
    setTimeout(() => t.remove(), 2400);
  },

  renderTerminal(ch, zone) {
    zone.innerHTML = `
      <div class="terminal-wrap" role="region" aria-label="Terminal input">
        <div class="terminal-bar">
          <div class="tdot tdot-r"></div>
          <div class="tdot tdot-y"></div>
          <div class="tdot tdot-g"></div>
          <span class="terminal-label">specialist@kethara-archive:~$</span>
        </div>
        <div id="terminal-output" aria-live="polite" aria-label="Terminal output">
          <p class="tl tl-dim">[SYSTEM] Sector unlocked. Terminal ready. Awaiting command...</p>
        </div>
        <div class="terminal-input-row">
          <span class="term-prompt">$ </span>
          <input
            type="text"
            id="user-input"
            autocomplete="off"
            spellcheck="false"
            autocorrect="off"
            autocapitalize="none"
            placeholder="type command..."
            aria-label="Type Git command here"
          >
        </div>
      </div>
    `;
    const inp = document.getElementById('user-input');
    inp.focus();
    inp.addEventListener('keypress', (e) => {
      if (e.key !== 'Enter') return;
      SFX.play('click');
      const val = inp.value.trim();
      if (!val) return;
      this.appendTerminal(`$ ${val}`, 'tl-dim');
      inp.value = '';

      if (val.toLowerCase() === ch.command.toLowerCase()) {
        this.appendTerminal('[SUCCESS] Command accepted. Data block crystallised.', 'tl-success');
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
    p.className = 'tl ' + cls;
    p.textContent = text;
    out.appendChild(p);
    out.scrollTop = out.scrollHeight;
  },

  renderBinary(ch, zone) {
    const intro = document.createElement('p');
    intro.style.cssText = 'font-family:var(--font-mono);font-size:13px;color:var(--text-dim);margin-bottom:16px;';
    intro.textContent = ch.question;
    zone.appendChild(intro);

    const gate = document.createElement('div');
    gate.className = 'binary-gate';
    ch.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'gate-btn';
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
      btn.className = 'choice-btn';
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
      html = html.replace('___',
        `<input class="fill-blank" autocomplete="off" spellcheck="false" autocapitalize="none" aria-label="Fill in the blank">`
      );
    });
    wrap.innerHTML = html;
    zone.appendChild(wrap);

    const btn = document.createElement('button');
    btn.className = 'fill-submit';
    btn.textContent = 'SUBMIT ANSWER';
    zone.appendChild(btn);

    const inputs = wrap.querySelectorAll('.fill-blank');
    inputs[0]?.focus();

    inputs.forEach((inp, i) => {
      const expected = ch.blanks[i] || '';
      inp.setAttribute('size', Math.max(expected.length + 4, 8));
    });

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
      if (allCorrect) {
        btn.disabled = true;
        setTimeout(() => this.handleSuccess(ch), 600);
      }
    };

    btn.addEventListener('click', check);
    inputs.forEach(inp => {
      inp.addEventListener('keypress', e => { if (e.key === 'Enter') check(); });
    });
  },

  renderSort(ch, zone) {
    SORT = { dragging: null, dragEl: null };

    const bankLabel = document.createElement('p');
    bankLabel.className = 'sort-label';
    bankLabel.textContent = 'AVAILABLE COMMANDS — drag into the correct order below:';
    zone.appendChild(bankLabel);

    const bank = document.createElement('div');
    bank.className = 'sort-bank';
    bank.id = 'sort-bank';
    bank.addEventListener('dragover', e => { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; });
    bank.addEventListener('drop', e => {
      e.preventDefault();
      if (SORT.dragEl && SORT.dragEl.parentElement !== bank) {
        bank.appendChild(SORT.dragEl);
      }
    });

    const shuffled = [...ch.items].sort(() => Math.random() - 0.5);
    shuffled.forEach(item => bank.appendChild(this._makeSortChip(item)));
    zone.appendChild(bank);

    const targetLabel = document.createElement('p');
    targetLabel.className = 'sort-label';
    targetLabel.style.marginTop = '12px';
    targetLabel.textContent = 'DROP HERE — in the correct sequence:';
    zone.appendChild(targetLabel);

    const target = document.createElement('div');
    target.className = 'sort-target';
    target.id = 'sort-target';
    target.setAttribute('aria-label', 'Drop zone for correct sequence');
    target.addEventListener('dragover', e => {
      e.preventDefault();
      target.classList.add('over');
      e.dataTransfer.dropEffect = 'move';
    });
    target.addEventListener('dragleave', () => target.classList.remove('over'));
    target.addEventListener('drop', e => {
      e.preventDefault();
      target.classList.remove('over');
      if (SORT.dragEl) target.appendChild(SORT.dragEl);
      SFX.play('click');
    });
    zone.appendChild(target);

    const verifyBtn = document.createElement('button');
    verifyBtn.className = 'sort-verify';
    verifyBtn.textContent = 'VERIFY SEQUENCE';
    verifyBtn.addEventListener('click', () => this.checkSort(ch, target, bank, verifyBtn));
    zone.appendChild(verifyBtn);
  },

  _makeSortChip(item) {
    const chip = document.createElement('div');
    chip.className = 'sort-chip';
    chip.textContent = item;
    chip.draggable = true;
    chip.dataset.item = item;
    chip.setAttribute('role', 'option');
    chip.setAttribute('aria-label', item);
    chip.addEventListener('dragstart', e => {
      SORT.dragEl = chip;
      SORT.dragging = item;
      chip.classList.add('drag');
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', item);
    });
    chip.addEventListener('dragend', () => chip.classList.remove('drag'));
    return chip;
  },

  checkSort(ch, target, bank, btn) {
    SFX.play('click');
    const chips = Array.from(target.querySelectorAll('.sort-chip'));
    if (chips.length !== ch.answer.length) {
      this.toast('Place ALL commands in the sequence zone first.', 'warn');
      return;
    }
    const userSeq = chips.map(c => c.dataset.item);
    const correct = ch.answer.every((a, i) => userSeq[i] === a);

    if (correct) {
      chips.forEach(c => c.classList.add('correct-chip'));
      SFX.play('success');
      btn.disabled = true;
      setTimeout(() => this.handleSuccess(ch), 700);
    } else {
      chips.forEach(c => c.classList.add('wrong-chip'));
      SFX.play('error');
      setTimeout(() => {
        chips.forEach(c => {
          c.classList.remove('wrong-chip');
          bank.appendChild(c);
        });
      }, 800);
    }
  },

  renderMatch(ch, zone) {
    MATCH = { selected: null, col: null, matches: 0 };

    const grid = document.createElement('div');
    grid.className = 'match-grid';

    const leftCol = document.createElement('div');
    const leftLbl = document.createElement('div');
    leftLbl.className = 'match-col-lbl';
    leftLbl.textContent = 'COMMANDS';
    leftCol.appendChild(leftLbl);
    ch.pairs.forEach((p, i) => {
      const chip = document.createElement('div');
      chip.className = 'match-chip';
      chip.textContent = p.left;
      chip.dataset.col = 'left';
      chip.dataset.idx = i;
      chip.dataset.val = p.left;
      chip.addEventListener('click', () => this.handleMatch(chip, ch));
      leftCol.appendChild(chip);
    });

    const rightCol = document.createElement('div');
    const rightLbl = document.createElement('div');
    rightLbl.className = 'match-col-lbl';
    rightLbl.textContent = 'DESCRIPTIONS';
    rightCol.appendChild(rightLbl);
    const shuffledRight = [...ch.pairs.map(p => p.right)].sort(() => Math.random() - 0.5);
    shuffledRight.forEach((r) => {
      const chip = document.createElement('div');
      chip.className = 'match-chip';
      chip.textContent = r;
      chip.dataset.col = 'right';
      chip.dataset.val = r;
      chip.addEventListener('click', () => this.handleMatch(chip, ch));
      rightCol.appendChild(chip);
    });

    grid.appendChild(leftCol);
    grid.appendChild(rightCol);
    zone.appendChild(grid);
  },

  handleMatch(el, ch) {
    if (el.classList.contains('matched')) return;
    SFX.play('click');

    if (!MATCH.selected) {
      MATCH.selected = el;
      MATCH.col = el.dataset.col;
      el.classList.add('sel');
    } else {
      if (MATCH.col === el.dataset.col) {
        MATCH.selected.classList.remove('sel');
        MATCH.selected = el;
        MATCH.col = el.dataset.col;
        el.classList.add('sel');
        return;
      }

      const leftEl  = MATCH.col === 'left'  ? MATCH.selected : el;
      const rightEl = MATCH.col === 'right' ? MATCH.selected : el;

      const isCorrect = ch.pairs.some(p =>
        p.left === leftEl.dataset.val && p.right === rightEl.dataset.val
      );

      MATCH.selected.classList.remove('sel');

      if (isCorrect) {
        leftEl.classList.add('matched');
        rightEl.classList.add('matched');
        SFX.play('coin');
        MATCH.matches++;
        if (MATCH.matches === ch.pairs.length) {
          setTimeout(() => this.handleSuccess(ch), 500);
        }
      } else {
        leftEl.classList.add('wrong');
        rightEl.classList.add('wrong');
        SFX.play('error');
        setTimeout(() => {
          leftEl.classList.remove('wrong');
          rightEl.classList.remove('wrong');
        }, 500);
      }

      MATCH.selected = null;
      MATCH.col = null;
    }
  },

  renderConflict(ch, zone) {
    const intro = document.createElement('p');
    intro.style.cssText = 'font-family:var(--font-mono);font-size:12px;color:var(--text-dim);margin-bottom:8px;';
    intro.textContent = 'Click ALL lines that are Git conflict markers:';
    zone.appendChild(intro);

    const file = document.createElement('div');
    file.className = 'conflict-file';

    ch.lines.forEach((line, i) => {
      const row = document.createElement('div');
      row.className = 'cf-line';
      row.dataset.idx = i;
      row.dataset.marker = line.isMarker ? '1' : '0';

      const num = document.createElement('span');
      num.className = 'cf-num';
      num.textContent = i + 1;
      num.setAttribute('aria-hidden', 'true');

      const code = document.createElement('span');
      code.textContent = line.text;

      row.appendChild(num);
      row.appendChild(code);
      row.addEventListener('click', () => {
        SFX.play('click');
        row.classList.toggle('sel');
      });
      file.appendChild(row);
    });

    zone.appendChild(file);

    const checkBtn = document.createElement('button');
    checkBtn.className = 'conflict-check';
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

      if (isMarker && selected) {
        row.classList.add('hit-good');
      } else if (!isMarker && selected) {
        row.classList.add('hit-bad');
        allCorrect = false;
      } else if (isMarker && !selected) {
        allCorrect = false;
      }
    });

    if (allCorrect) {
      SFX.play('success');
      btn.disabled = true;
      setTimeout(() => this.handleSuccess(CHAPTERS[STATE.currentStep]), 700);
    } else {
      SFX.play('error');
      setTimeout(() => {
        rows.forEach(r => r.classList.remove('hit-good', 'hit-bad'));
      }, 1000);
    }
  }

};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

document.addEventListener('DOMContentLoaded', () => GAME.init());
