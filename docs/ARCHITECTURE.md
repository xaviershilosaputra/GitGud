# ARCHITECTURE.md

GitGud Technical Reference. This document is intended for open source maintainers and future contributors. My aim is to give you full context without having to scan across every code or file manually.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [File Structure](#2-file-structure)
3. [How the Three Files Relate](#3-how-the-three-files-relate)
4. [State Management](#4-state-management)
5. [The Chapter Data Model](#5-the-chapter-data-model)
6. [Game Initialization and Screen Routing](#6-game-initialization-and-screen-routing)
7. [The Prologue System](#7-the-prologue-system)
8. [Rendering a Chapter](#8-rendering-a-chapter)
9. [The Lesson and Question Flow](#9-the-lesson-and-question-flow)
10. [Question Types](#10-question-types)
11. [Progress and Unlock Logic](#11-progress-and-unlock-logic)
12. [The Sidebar Graph (Chronicle)](#12-the-sidebar-graph-chronicle)
13. [The Map Overlay](#13-the-map-overlay)
14. [Header and Mobile Nav Sync](#14-header-and-mobile-nav-sync)
15. [Era and Theme System](#15-era-and-theme-system)
16. [Sound System](#16-sound-system)
17. [The Tour System](#17-the-tour-system)
18. [Settings and Persistence](#18-settings-and-persistence)
19. [Known Quirks and Non-Obvious Decisions](#19-known-quirks-and-non-obvious-decisions)
20. [Where to Add Things](#20-where-to-add-things)

---

## 1. Project Overview

GitGud teaches Git version control with an archaeological expedition story. Players are required to recover a corrupted ancient repository sector by sector, where each sector is a chapter that teaches one Git concept. The game has no backend (everything runs in the browser with `localStorage` for persistence). The visuals changes across three eras as the player progresses, progressing from an ancient-stone look to a cyberpunk terminal style.

The project has three source files:

- `js/config.js` -- all game content (chapters, arcs, eras, prologue text)
- `js/engine.js` -- all game logic, rendering, and state
- `css/styles.css` -- all styling including era-specific overrides via CSS variables
- `index.html` -- the static shell, no logic lives here

---

## 2. File Structure

```
/
├── index.html
├── css/
│   └── styles.css
├── js/
│   config.js
│   engine.js
├── docs/
│   ├── ARCHITECTURE.md   (this file)
│   └── CONTRIBUTING.md
└── README.md
```

---

## 3. How the Three Files Relate

`index.html` defines all the DOM elements the engine needs. It does not contain any logic and does not decide which screen is shown on load (that is entirely JS's job). The prologue screen in HTML has `class="screen"` with no `active` class. If you add `active` back to the HTML, the prologue will flash on every page reload for returning users, because the browser renders HTML before JS runs.

`config.js` must load before `engine.js`. It exposes a single global `GAME_CONFIG` object. The engine never mutates `GAME_CONFIG` -- it only reads from it.

`engine.js` exposes three globals: `SFX`, `PROLOGUE`, `TOUR`, and `GAME`. The `GAME` object is the main controller. Everything else either supports it or is a self-contained utility.

---

## 4. State Management

All mutable game state lives in a single object called `STATE`. It is defined at the top of `engine.js`.

```js
const DEFAULT_STATE = {
  shards: 0,
  currentStep: 0,       // index into GAME_CONFIG.chapters (the current chapter)
  streak: 0,
  maxStreak: 0,
  soundOn: true,
  prologueDone: false,  // whether the user has ever completed the prologue
  tourDone: false,      // whether the UI guide tour has been dismissed
  completed: [],        // array of chapter IDs (ch.id) that have been successfully answered
  fieldNotes: [],       // array of { cmd, desc } objects unlocked so far
  shardHistory: [],     // array of { action, amount, timestamp } for the ledger
  typewriterSpeed: 18,  // ms per character, lower = faster
  typewriterEnabled: true,
  animationsEnabled: true
};
```

`STATE` is loaded from `localStorage` on init via `GAME.loadState()`, merged with `DEFAULT_STATE` so new fields added to `DEFAULT_STATE` don't break old saves. It is saved to `localStorage` via `GAME.saveState()` after every meaningful action.

`currentStep` is an index, not a chapter ID. Chapter IDs (`ch.id`) and chapter indices are the same value in the current data (both go 0 to 50), but the code distinguishes them: `STATE.completed` stores `ch.id` values, while `STATE.currentStep` is an array index. Do not conflate them if you restructure the chapter list.

---

## 5. The Chapter Data Model

Each chapter in `GAME_CONFIG.chapters` is an object. The fields that always exist:

```js
{
  id: 0,              // unique ID, currently equals array index
  arc: 1,             // which arc this belongs to (key into GAME_CONFIG.arcs)
  nodeType: "normal", // "normal" | "branch" | "merge" -- affects sidebar dot color
  chapterType: "lesson" | "test" | "exam",
  title: "...",
  story: "...",       // narrative text shown in the story panel
  task: "...",        // short mission description shown in the task box
  xp: 10,             // shards awarded on success
  qType: "terminal",  // which renderer to use (see Question Types section)
  hint: "...",        // shown when the player spends 5 shards on Oracle Hint
  explanation: "...", // shown in the feedback overlay after success
  example: "...",     // shown as a code block in the feedback overlay
  fieldNote: { cmd: "...", desc: "..." } // added to Field Notes panel on success
}
```

The `lesson` field is optional and only present on chapters that show a lesson panel before the question:

```js
lesson: {
  title: "...",
  sections: [
    { type: "text",    content: "..." },
    { type: "code",    content: "..." },
    { type: "tip",     content: "..." },
    { type: "warning", content: "..." }
  ]
}
```

Each `qType` requires additional fields on the chapter object. These are documented in the Question Types section below.

---

## 6. Game Initialization and Screen Routing

`GAME.init()` is the entry point, called on `DOMContentLoaded`. It does the following in order:

1. Calls `SFX.init()` to set up the Web Audio context.
2. Calls `GAME.loadState()` to restore saved state from localStorage.
3. Injects Google Fonts via a `<link>` tag (defined in `GAME_CONFIG.fonts`).
4. Sets `document.title` and `.logo-text` from config.
5. Decides which screen to show based on `STATE.prologueDone`.
6. Attaches all event listeners to the static HTML elements.

Screen routing is the critical part. `index.html` starts with no screen active. JS adds `active` to either `#prologue-screen` or `#game-screen` based on `STATE.prologueDone`. This is the fix for the reload bug where returning users were getting the prologue stuck over the game screen. Never add `class="screen active"` to `#prologue-screen` in the HTML.

The event listeners are all attached once in `init()`. Nothing in the rendering pipeline re-attaches them to static elements. Dynamic elements (question buttons, lesson buttons) attach their own listeners when they are created.

---

## 7. The Prologue System

`PROLOGUE` is a standalone object that manages the intro slideshow. It has two states: the default first-time flow, and the replay flow triggered from Settings.

Key fields:

- `PROLOGUE.index` -- current slide (0-based)
- `PROLOGUE._onFinish` -- optional callback to override what happens when the prologue ends

`PROLOGUE.init(onFinishCallback)` takes an optional callback. If provided, that callback runs instead of the default behavior (which is to show the game screen and start the tour). This allows `GAME._replayPrologue()` to return the user to the game without resetting state or restarting the tour.

The `CONTINUE` / `BEGIN EXPEDITION` button's `onclick` is set directly on the element (not via `addEventListener`) so that calling `init()` multiple times on replay always replaces the old binding instead of stacking listeners.

`PROLOGUE.finish()` sets `STATE.prologueDone = true` and saves state before transitioning. This is what prevents the prologue from appearing again on the next page load.

---

## 8. Rendering a Chapter

`GAME.renderChapter(chapterIndex?)` is the main render function. If `chapterIndex` is provided, it updates `STATE.currentStep` before rendering. If omitted, it renders whatever `STATE.currentStep` currently is.

The function:

1. Cancels any in-progress typewriter animation by incrementing `_twId`.
2. Checks if the arc changed since the last chapter and plays the era-shift sound if so.
3. Applies the correct era theme via `applyEra()`.
4. Populates the story panel (badge, title, narrative, task).
5. Clears `#question-zone`.
6. If the chapter has a `lesson`, renders the lesson panel and hides the task box. Otherwise renders the question directly.
7. Calls `updateHeader()`, `updateFieldNotes()`, and `rebuildGraph()`.

When navigating to a previously completed chapter (via map or sidebar), the chapter renders normally and the player can re-attempt the question, but answering correctly again will re-add shards and re-add a shard history entry.

---

## 9. The Lesson and Question Flow

Chapters with a `lesson` field follow a two-step flow:

**Step 1 -- Lesson panel:** `GAME.renderLesson(ch, zone)` builds a styled panel with sections (text, code, tip, warning). At the bottom is an "I UNDERSTAND - TEST ME" button. The task box is hidden during this step. The hint button and XP preview are also hidden.

**Step 2 -- Question:** Clicking the button triggers a CSS dismiss animation (`lesson-dismissing` class) and then calls `_renderQuestion(ch, zone)`. The transition has a race condition guard: both `animationend` and a 400ms `setTimeout` can trigger the transition, and without the guard a `let transitioned = false` flag, the zone would get wiped and re-rendered twice. The flag ensures only the first event wins.

After transitioning to the question, a "REVIEW LESSON" button is prepended to `#question-zone`. Clicking it wipes the zone and re-renders the lesson panel, effectively going back. This button only appears on chapters that have a `lesson` property and are not of `chapterType: "exam"`.

---

## 10. Question Types

All question renderers receive `(ch, zone)` where `ch` is the chapter object and `zone` is `#question-zone`. On success, every renderer eventually calls `GAME.handleSuccess(ch)`.

| qType | Required chapter fields | How it works |
|---|---|---|
| `terminal` | `command` | Player types into a fake terminal. Case-insensitive match against `ch.command`. |
| `binary` | `question`, `options[2]`, `answer` | Two large buttons. One is correct. |
| `choice` | `options[]`, `answer` | 2-4 buttons in a grid. One is correct. |
| `fill` | `template`, `blanks[]` | Template string with `___` placeholders replaced by inputs. Case-insensitive match. |
| `sort` | `items[]`, `answer[]` | Drag-and-drop chips from a bank into an ordered drop zone. |
| `match` | `pairs[{ left, right }]` | Two columns, click one from each to pair them. All pairs must be matched. |
| `conflict` | `lines[{ text, isMarker }]` | Click to select lines in a fake file. Must select exactly the marker lines. |
| `hotspot` | `tokens[]`, `answer` | Tokenized command displayed as buttons, click the correct token. |
| `output-read` | `output`, `question`, `options[]`, `answer` | Shows a terminal output block, then a multiple choice question about it. |
| `truefalse-set` | `statements[{ text, answer }]` | Multiple true/false rows submitted all at once. |
| `sequence` | `steps[{ prompt, command, label }]` | Multi-step terminal sequence, each step has its own correct command. |

The `terminal` renderer uses a command history stack accessible with arrow keys, mimicking a real terminal.

The `sort` renderer uses the HTML Drag and Drop API. The `SORT` global (`let SORT = { dragging: null, dragEl: null }`) tracks the currently dragged element. It is reset at the start of every `renderSort` call.

The `match` renderer uses the `MATCH` global (`let MATCH = { selected: null, col: null, matches: 0 }`) similarly reset per render.

---

## 11. Progress and Unlock Logic

The unlock boundary is computed the same way in both the map overlay and the sidebar:

```js
const maxCompletedIdx = GAME_CONFIG.chapters.reduce((max, ch, i) => {
  return STATE.completed.includes(ch.id) ? i : max;
}, -1);
```

This finds the highest array index that has been completed. From there:

- In `rebuildGraph()` (sidebar): `limit = Math.max(maxCompletedIdx + 2, STATE.currentStep + 1)` -- the `+2` because the loop condition is `i < limit`, so to include index `maxCompletedIdx + 1` you need limit to be `maxCompletedIdx + 2`.
- In `openMap()` (map overlay): `playableLimit = Math.max(maxCompletedIdx + 1, STATE.currentStep)` -- chapters where `i > playableLimit` are locked.

Both result in the same accessible range: everything from 0 up to and including `highest completed + 1`. The `+1` chapter is the "next" chapter the player hasn't done yet. Chapters further ahead remain locked.

`STATE.completed` stores chapter IDs (not indices). A chapter's ID is added to `STATE.completed` in `handleSuccess()` only if it is not already present -- so replaying a completed chapter does not add a duplicate.

`STATE.currentStep` is updated in two places: `renderChapter(index)` when explicitly navigating, and `closeFeedback()` which increments it by 1 after a successful answer on the current frontier chapter.

---

## 12. The Sidebar Graph (Chronicle)

`GAME.rebuildGraph()` clears and rebuilds `#git-graph` from scratch on every call. It renders one row per accessible chapter (up to the unlock limit). Each row has:

- A connecting line above the dot (except the first chapter)
- A dot whose color depends on `ch.nodeType`: default = accent color, `branch` = teal, `merge` = green, current = gold with pulse animation
- A label with the chapter title, colored accent if it is the active chapter

Every row is clickable and calls `renderChapter(i)` on click, including the current active chapter (so you can re-read the lesson/question for the chapter you are on).

`rebuildGraph()` is called after every navigation, every successful answer, and every skip.

---

## 13. The Map Overlay

`GAME.openMap()` builds the map contents fresh each time it is opened (not cached). Each chapter renders as a `.map-item` div with one of four states: `done` (completed), `active` (current), `locked` (beyond unlock limit), or unstyled (accessible but not done or current).

Only non-locked items get a click listener. The click closes the map and calls `renderChapter(idx)`.

The map grid is two columns wide on desktop and one column on mobile (CSS media query).

---

## 14. Header and Mobile Nav Sync

`GAME.updateHeader()` updates all progress-related display elements in one call. There are two sets of elements that need to stay in sync:

- Desktop header: `#shard-count`, `#streak-count`, `#streak-pill`, `#progress-fill`, `#progress-label`
- Mobile nav drawer: `#mobile-shard-count`, `#mobile-streak-count`, `#mobile-progress-fill`, `#mobile-progress-label`

Both sets are updated in the same `updateHeader()` call. If you add new progress-related UI elements, add them here. Forgetting to update mobile elements was the original cause of the mobile stats always showing 0.

The mobile nav drawer (`#mobile-nav-drawer`) is shown/hidden by toggling the `open` class via `GAME.openMobileNav()` and `GAME.closeMobileNav()`. The backdrop (`#mobile-nav-backdrop`) also gets the `open` class toggled at the same time. The CSS shows/hides both based on this class. Do not rely on CSS sibling selectors (like `~`) to control the backdrop, I've tried that approach and it failed cross-browser (JS controls it explicitly).

---

## 15. Era and Theme System

The game has three visual eras defined in `GAME_CONFIG.eras`:

- `era-0`: Ancient parchment (warm beige, serif fonts, candlelight colors)
- `era-1`: Awakened Codex (dark teal terminal aesthetic)
- `era-2`: Nexus Terminal (deep space cyberpunk, cyan and purple accents)

Each era defines a set of CSS custom property values and an optional `cssClass` to add to `<body>`. When `applyEra(eraKey)` is called, it removes all era CSS classes from `<body>`, applies the new one, and sets all the CSS variables on `:root` via `element.style.setProperty()`. This means the variables are inline styles on the root element, which override the stylesheet defaults.

The era transition is triggered in `renderChapter()` whenever the arc changes between chapters. Arc-to-era mapping is defined in `GAME_CONFIG.arcs[arcNum].era`.

All UI elements should use CSS variables (e.g. `var(--bg)`, `var(--accent)`) and never hardcoded colors, so they inherit the correct era appearance automatically.

---

## 16. Sound System

`SFX` is a thin wrapper around the Web Audio API. It creates oscillators for every sound effect programmatically (no audio files). This keeps the project dependency-free.

Available sound names and when they play:

- `click` -- any button press
- `success` -- correct answer
- `error` -- wrong answer
- `coin` -- matching a pair in the match question type
- `hint` -- using the Oracle Hint
- `streak` -- correct answer when streak is 3 or more
- `win` -- finishing the game
- `pageFlip` -- prologue slide change, lesson transition
- `eraShift` -- moving into a new arc

`SFX.init()` sets up the AudioContext. `SFX.resume()` is called before every sound to un-suspend the context (browsers suspend AudioContext until user interaction). A one-time click listener on `document.body` in `GAME.init()` also calls `SFX.resume()` to handle the first interaction.

Sound is toggleable via `STATE.soundOn`. Setting `SFX.enabled = false` silences all playback without destroying the context.

---

## 17. The Tour System

`TOUR` is an overlay-based UI guide that highlights elements one at a time with a spotlight ring effect. It runs automatically after the prologue completes for the first time (`STATE.tourDone` is false).

It can be replayed from Settings without resetting game state.

The tour creates its own DOM elements (`#tour-overlay`, `#tour-ring`, `#tour-box`) on first run and reuses them on replay. `TOUR._ro` is a ResizeObserver that keeps the spotlight ring positioned correctly if the target element resizes.

`TOUR.steps` is an array of `{ target, title, body, position }` objects. `target` is a CSS selector. `position` is one of `bottom`, `top`, `left`, `right` and controls where the tooltip box appears relative to the highlighted element.

---

## 18. Settings and Persistence

Settings are stored in `STATE` and persisted to `localStorage` under the key `game_engine_v1`. The `v1` suffix exists so a schema-breaking change can use a new key without corrupting old saves.

`GAME.loadState()` merges saved state with `DEFAULT_STATE` using spread (`{ ...DEFAULT_STATE, ...saved }`). This means any new fields added to `DEFAULT_STATE` will automatically get their default values for users with old saves, without needing a migration step.

Settings that exist:

- Sound on/off (`STATE.soundOn`)
- Typewriter effect on/off (`STATE.typewriterEnabled`)
- Typewriter speed (`STATE.typewriterSpeed`): 8 = fast, 18 = normal, 28 = slow (ms per character)
- Animations on/off (`STATE.animationsEnabled`) -- adds `no-animations` class to body which overrides all transitions and animations to 0s

The reset flow wipes `STATE` back to `DEFAULT_STATE` entirely, saves it, and sends the user back to the prologue.

---

## 19. Known Quirks and Non-Obvious Decisions

**Why `doTransition` has a guard flag in the lesson ready button:** The lesson dismiss animation registers both an `animationend` listener and a 400ms `setTimeout`. Without a guard, if the CSS animation fires before 400ms elapses, both callbacks fire and `_renderQuestion` gets called twice. The second call wipes the freshly-rendered question. The `let transitioned = false` flag ensures only the first trigger wins.

**Why `SORT` and `MATCH` are module-level globals instead of local:** Both are reset at the start of their respective render functions. They are module-level so the drag event handlers (which are attached to DOM elements) can still reference them after the render function returns. Closures would work too, but module-level globals make the reset pattern explicit.

**Why the map and sidebar both recalculate `maxCompletedIdx` independently:** They are called at different times and operate on the current `STATE` at call time. A cached value would risk being stale if state changes between renders. The reduce is O(n) over the chapter list which is small (51 chapters), so there is no performance concern.

**Why `ch.id` and chapter array index are the same:** Right now `config.js` defines chapters in order with `id: 0, 1, 2...` matching their position in the array. The code does not guarantee this. `STATE.completed` stores `ch.id` values (for semantic correctness), while `STATE.currentStep` is an array index (for navigation). If you ever reorder chapters or add chapters in the middle, update the `id` values to stay sequential or audit every place that uses `ch.id` vs array index.

**Why `renderChapter` does not guard against re-rendering the same chapter:** Navigating to the already-active chapter via map or sidebar re-renders it from scratch. This is intentional because it lets players revisit the lesson and retry the question. It resets `_hintShown` to false. It does not subtract any shards for re-answering correctly.

**Why the typewriter animation uses a counter (`_twId`) instead of cancellation:** `setTimeout` calls cannot be cancelled easily once queued deeply. Incrementing `_twId` makes every pending tick check `if (myId !== this._twId) return` and self-terminate. Navigating to a new chapter increments `_twId`, which orphans all pending ticks from the old chapter.

---

## 20. Where to Add Things

**New question type:** Add a `renderXxx(ch, zone)` method on `GAME`, add `'xxx': () => this.renderXxx(ch, zone)` to the `renderers` map in `_renderQuestion`, and add a display label in the `typeLabels` map in `renderChapter`. The renderer must eventually call `this.handleSuccess(ch)` on a correct answer.

**New chapter:** Add an object to the `chapters` array in `config.js`. Make sure `id` equals the array index, `arc` points to an existing arc key, and all fields required by your chosen `qType` are present. If the chapter has a lesson, add a `lesson` object with `title` and `sections`.

**New arc:** Add to `GAME_CONFIG.arcs` with a `name`, `label`, `era` (must be a key in `GAME_CONFIG.eras`), and `icon`. Assign chapters to it via their `arc` field.

**New era:** Add to `GAME_CONFIG.eras` with all CSS variable values and an optional `cssClass`. The `cssClass` is added to `<body>` when the era is active, so you can use it for era-specific CSS that CSS variables cannot handle (like background patterns or pseudo-elements).

**New setting:** Add a default value to `DEFAULT_STATE`, add a toggle/setter method on `GAME`, add UI to the settings overlay in `index.html`, bind the listener in `GAME.init()`, and update `_updateXxxSettings()` or create a new update method following the same pattern as the existing ones.

**New overlay:** Follow the same pattern as the existing overlays: a `<div class="overlay">` in `index.html`, open/close methods that toggle the `open` class and `aria-hidden`, and an Escape key handler added to the central keydown listener in `GAME.init()`.
