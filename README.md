# GitGud

**GitGud** is an interactive and story-based Git learning platform. You play the role of a specialist exploring the ancient Kethara Repository, where you must restore a corrupted archive using real-world Git commands. The story is divided into five separate arcs that guide the user from basic file tracking to advanced professional workflows. All tasks require you to interact with a terminal or solve logic puzzles based on Git's working mechanism.

---

## Features

- **Narrative-driven learning** — Progress through a structured story across five atmospheric arcs.
- **Interactive terminal** — Practice real Git commands in a simulated terminal environment that provides instant feedback.
- **Visual history graph** — See your commits, branches, and merges visualized in real time as you execute commands.
- **Logic puzzles** — Solve challenges related to conflict resolution and workflow ordering to deepen your understanding.
- **Arc progression** — Move from "The Awakening" (basic tracking) to "The Restoration" (advanced professional workflows).
- **Field notes** — Access a persistent reference log of every command you have learned during your expedition.
- **XP and leveling** — Earn experience points for every successful task to track your mastery of version control.
- **Conflict simulation** — Learn to identify and resolve merge markers in a safe, guided environment.
- **Professional workflows** — Master the sequence of branching, rebasing, and pushing used by modern development teams.
- **Responsive design** — Learn on your desktop or continue your expedition on mobile devices.

---

## Tech stack

| Layer | Technology |
|---|---|
| UI framework | React 18 (via Vite) |
| State management | React Context API |
| Terminal simulation | Custom JavaScript logic |
| Styling | Plain CSS with CSS custom properties |
| State persistence | Browser `localStorage` |
| Deployment | GitHub Pages via GitHub Actions |

---

## Project structure

gitgud/
├── index.html                Entry point HTML
├── package.json
├── vite.config.js            Build config + GitHub Pages base path
├── .github/
│   └── workflows/
│       └── deploy.yml        Auto-deploy to GitHub Pages on push
└── src/
    ├── main.jsx              React root, mounts <App />
    ├── App.jsx               App shell and global provider setup
    │
    ├── constants/            Game data and static content
    │   ├── chapters.js       The full dataset for all 5 arcs
    │   ├── terminal.js       Command definitions and valid responses
    │   └── assets.js         Narrative text and UI strings
    │
    ├── hooks/                Reusable logic
    │   ├── useGameState.js   Handles progression, XP, and unlocked chapters
    │   └── useTerminal.js    Processes user input and command validation
    │
    ├── components/
    │   ├── Navigation.jsx    Arc and chapter selection map
    │   ├── Narrative.jsx     Story display and task descriptions
    │   ├── Terminal.jsx      Command line interface simulation
    │   ├── HistoryGraph.jsx  Visual representation of the Git tree
    │   ├── Feedback.jsx      Success and error overlays
    │   └── Sidebar/
    │       ├── FieldNotes.jsx  Unlocked command reference
    │       └── Stats.jsx       User XP and progress tracking
    │
    └── styles/
        ├── base.css          Reset and global variables
        ├── game.css          Layout for the main adventure screen
        ├── terminal.css      Terminal styling and animations
        └── navigation.css    Map and arc transition styles

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher
- npm (comes with Node)

### Running locally

```bash
# 1. Clone the repository
git clone [https://github.com/xaviershilosaputra/GitGud.git](https://github.com/xaviershilosaputra/GitGud.git)
cd GitGud

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```
### The Five Arcs

| Arc | Title | Focus |
|---|---|---|
| I | The Awakening | Init, Add, Commit, and Status |
| II | Parallel Paths | Branching and Checkout |
| III | The Convergence | Remotes, Fetch, Pull, and Push |
| IV | The Anomaly | Stashing, Reset, and Revert |
| V | The Restoration | Rebasing, Reflog, and Tags |

---

### LocalStorage usage

GitGud saves your progress locally so you can resume your expedition at any time.

| Key | Purpose |
|---|---|
| `gg_progress` | Current unlocked chapter and arc |
| `gg_stats` | Total XP earned and level |
| `gg_notes` | List of unlocked commands in Field Notes |
| `gg_history` | Current state of the simulated Git graph |

---

### Future updates

* **Multiplayer "Race" mode** — Compete with others to solve Git puzzles the fastest.
* **Custom scenario editor** — Allow educators to create their own narrative arcs and tasks.
* **Advanced visualization** — More detailed 3D representations of complex rebase operations.
* **IDE integration** — A plugin to bring the GitGud narrative experience directly into VS Code.

## License

MIT License — see LICENSE for the full text.

You are free to use, modify, and redistribute this project for any purpose, including commercially. Attribution to the original author must be maintained.
