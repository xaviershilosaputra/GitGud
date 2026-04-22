# GitGud

**GitGud** is an interactive and story-based Git learning platform. You play the role of an archeologist exploring the ancient Kethara Repository, where you must restore a corrupted archive using real-world Git commands. The story is divided into five separate arcs that guide the user from basic file tracking to advanced professional workflows. All tasks require you to interact with a terminal or solve logic puzzles based on Git's working mechanism.

## Features

- **Narrative-driven learning** — Progress through a structured story across five atmospheric arcs.
- **Interactive terminal** — Practice using real Git commands in a simulated terminal environment with instant feedback.
- **Visual history graph** — See your commits, branches, and merges visualized in real time as you execute commands.
- **Logic puzzles** — Solve challenges related to conflict resolution and workflow ordering to deepen your understanding.
- **Arc progression** — Move from "The Awakening" (basic tracking) to "The Restoration" (advanced professional workflows).
- **Field notes** — Access a persistent reference log of every command you have learned during your expedition.
- **XP and leveling** — Earn experience points for every successful task to track your mastery of version control.
- **Conflict simulation** — Learn to identify and resolve merge markers in a safe, guided environment.
- **Professional workflows** — Master the sequence of branching, rebasing, and pushing used by modern development teams.
- **Responsive design** — The website works well on many variations of screen sizes (desktop, mobile, etc)

## Tech stack

- HTML
- CSS
- JS

## Project structure

```text

/
├── index.html
├── css/
│   └── styles.css
├── js/
│   config.js
│   engine.js
├── docs/
│   ├── ARCHITECTURE.md
│   └── CONTRIBUTING.md
└── README.md

```

### The Five Arcs

| Arc | Title | Focus |
|---|---|---|
| I | The Awakening | Init, Add, Commit, and Status |
| II | Parallel Paths | Branching and Checkout |
| III | The Convergence | Remotes, Fetch, Pull, and Push |
| IV | The Anomaly | Stashing, Reset, and Revert |
| V | The Restoration | Rebasing, Reflog, and Tags |

### LocalStorage usage

GitGud saves your progress locally so you can resume your expedition at any time.

| Key | Purpose |
|---|---|
| `gg_progress` | Current unlocked chapter and arc |
| `gg_stats` | Total XP earned and level |
| `gg_notes` | List of unlocked commands in Field Notes |
| `gg_history` | Current state of the simulated Git graph |

### Future updates

* **Multiplayer "Race" mode** — Compete with others to solve Git puzzles the fastest.
* **Advanced visualization** — Addition of more detailed 3D representations of complex rebase operations.

## License

MIT License — see [LICENSE](https://github.com/xaviershilosaputra/GitGud/blob/main/LICENSE) for the full text.

You are free to use, modify, and redistribute this project for any purpose, including commercially. Attribution to the original author must be maintained.
