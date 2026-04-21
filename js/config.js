const GAME_CONFIG = {
  name:        "GitGud",
  tagline:     "An Archaeological Expedition",
  description: "Master Git version control through story-driven discovery.",
  terminalPrompt: "specialist@kethara-archive:~$",

  winTitle:   "REPOSITORY RESTORED",
  winMessage: "You have traversed time itself. From dust and stone to pure light, the Chronicle lives again.",

  eras: {
    "era-0": {
      label: "THE ANCIENT ARCHIVE",
      cssClass: "",
      vars: {
        "--bg":           "#f5edd6",
        "--bg2":          "#ede4c8",
        "--surface":      "#faf4e4",
        "--surface2":     "#f0e8ce",
        "--surface3":     "#e8debb",
        "--border":       "#c8a96e",
        "--border2":      "#b08848",
        "--text":         "#3a2810",
        "--text-dim":     "#7a5c32",
        "--text-bright":  "#1a1005",
        "--text-faint":   "#c0a070",
        "--accent":       "#b5722a",
        "--accent-dim":   "#f0e0c0",
        "--accent2":      "#8b5a14",
        "--gold":         "#c8960c",
        "--gold-dim":     "#f8ecc0",
        "--green":        "#4a7840",
        "--green-dim":    "#d8e8d0",
        "--red":          "#a03020",
        "--red-dim":      "#f0d0c8",
        "--teal":         "#3a7868",
        "--teal-dim":     "#cce8e0",
        "--font-display": "'Cinzel', serif",
        "--font-body":    "'Crimson Pro', Georgia, serif",
        "--font-mono":    "'Courier Prime', 'Courier New', monospace",
        "--font-ui":      "'Rajdhani', sans-serif",
      }
    },
    "era-1": {
      label: "THE AWAKENED CODEX",
      cssClass: "era-1",
      vars: {
        "--bg":           "#060d0e",
        "--bg2":          "#081212",
        "--surface":      "#0c1a1c",
        "--surface2":     "#102224",
        "--surface3":     "#142c2e",
        "--border":       "#1e4a4e",
        "--border2":      "#286468",
        "--text":         "#9ecfcc",
        "--text-dim":     "#4a8a86",
        "--text-bright":  "#d4f0ee",
        "--text-faint":   "#1e4a4e",
        "--accent":       "#3ab8b0",
        "--accent-dim":   "#082422",
        "--accent2":      "#c9a227",
        "--gold":         "#d4aa30",
        "--gold-dim":     "#2a2008",
        "--green":        "#5ab888",
        "--green-dim":    "#0a2018",
        "--red":          "#c84040",
        "--red-dim":      "#2a0808",
        "--teal":         "#3ab8b0",
        "--teal-dim":     "#082422",
        "--font-display": "'Rajdhani', 'Cinzel', sans-serif",
        "--font-body":    "'Rajdhani', sans-serif",
        "--font-mono":    "'Share Tech Mono', 'Courier Prime', monospace",
        "--font-ui":      "'Rajdhani', sans-serif",
      }
    },
    "era-2": {
      label: "THE NEXUS TERMINAL",
      cssClass: "era-2",
      vars: {
        "--bg":           "#050508",
        "--bg2":          "#08080e",
        "--surface":      "#0c0c16",
        "--surface2":     "#121220",
        "--surface3":     "#1a1a2e",
        "--border":       "#1e1e3a",
        "--border2":      "#2a2a4a",
        "--text":         "#c8c8e8",
        "--text-dim":     "#5a5a7a",
        "--text-bright":  "#e8e8ff",
        "--text-faint":   "#1e1e3a",
        "--accent":       "#00d4ff",
        "--accent-dim":   "#004455",
        "--accent2":      "#aa55ff",
        "--gold":         "#ffaa00",
        "--gold-dim":     "#332200",
        "--green":        "#00ff88",
        "--green-dim":    "#003322",
        "--red":          "#ff3355",
        "--red-dim":      "#330011",
        "--teal":         "#00d4ff",
        "--teal-dim":     "#004455",
        "--font-display": "'Orbitron', 'Share Tech Mono', monospace",
        "--font-body":    "'Rajdhani', sans-serif",
        "--font-mono":    "'Share Tech Mono', monospace",
        "--font-ui":      "'Rajdhani', sans-serif",
      }
    }
  },

  fonts: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&family=Courier+Prime:ital,wght@0,400;0,700;1,400&family=Rajdhani:wght@300;400;600;700&family=Orbitron:wght@400;700;900&family=Share+Tech+Mono&display=swap",

  prologueSlides: [
    `The year is unknown. The expedition team spent six months digging at the Kethara Plateau before they found it. It was buried under forty feet of stone and sand. This structure is different from anything on record. It is not a tomb. It is not a temple. It is a machine room.

The walls are covered in inscriptions. These are not symbols of gods or kings. They are something much stranger. You see sequences. You see patterns. You see commands.`,

    `The team linguist cracked the first glyph on day three. The inscription reads "git init". An hour later they found a second one: "git commit". By nightfall the walls were speaking a language you recognize.

It is version control. An ancient civilization built the entire science of version control. They did not use computers. They carved it into stone. Then they vanished and took their knowledge with them.`,

    `The machine room connects to a vast underground network called the Kethara Repository. There are thousands of data chambers here. Each one holds a fragment of their accumulated knowledge. But the Repository is corrupted. Sectors are dark. Branches are broken. The commit log ends in the middle of a sentence from 3,000 years ago.

Something interrupted the Archive before it could be sealed.`,

    `Your mission is clear. You must reactivate the Repository sector by sector. You need to recover the knowledge and rebuild the commit history. You have to find out what happened to the civilization that built this place.

You are not just learning their system. You are following their footsteps. You are a Ledger Specialist now. Every command you type brings a dead world back to life.`,

    `You power on your terminal and connect it to the ancient interface. The screen flickers once. Then a single line appears:

                    repository: KETHARA-ARCHIVE
                    status: CORRUPTED
                    chapters recovered: 0 / 56
                    
                    awaiting specialist input...

Take a breath. The expedition begins now.`
  ],

  arcs: {
    1: { name: "ARC I: THE AWAKENING",       label: "ARC I",   era: "era-0", icon: "&#9670;" },
    2: { name: "ARC II: PARALLEL HISTORIES", label: "ARC II",  era: "era-0", icon: "&#9670;" },
    3: { name: "ARC III: THE CONVERGENCE",   label: "ARC III", era: "era-1", icon: "&#9632;" },
    4: { name: "ARC IV: CRISIS PROTOCOL",    label: "ARC IV",  era: "era-1", icon: "&#9632;" },
    5: { name: "ARC V: THE DIGITAL ASCENT",  label: "ARC V",   era: "era-2", icon: "&#9670;" },
    6: { name: "ARC VI: DEEP PROTOCOLS",     label: "ARC VI",  era: "era-2", icon: "&#9670;" },
  },

  chapters: [

    {
      lesson: {
        title: "What is Git and why does it exist?",
        sections: [
          { type: "text", content: "Git is a version control system. A tool that records every change you make to your files over time. Think of it like unlimited undo, combined with a complete diary of your project history." },
          { type: "text", content: "Before you can track anything, Git needs a place to store that history. Running git init creates a hidden folder called .git inside your project. This folder is the brain. It stores every snapshot, every author, every timestamp." },
          { type: "code", content: "$ git init\nInitialized empty Git repository in /project/.git/" },
          { type: "tip",  content: "You only ever run git init once per project, in the root folder. After that, Git watches everything beneath it automatically." },
          { type: "warning", content: "Never manually edit or delete the .git folder. Doing so corrupts the entire project history." }
        ]
      },
      id: 0, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "The First Inscription",
      story: "The entrance to the chamber is silent and the air is heavy with dust. We set up our equipment on a stone slab while torchlight reflects off the walls. There are carvings everywhere, but the system is currently dormant. Our team's linguist identified two specific words near the entrance. She explained that before the archive can record any new data, we have to initialize the system to begin tracking.",
      task: "Initialize the repository to begin tracking.",
      xp: 10, qType: "terminal", command: "git init",
      hint: "Two words. 'git' followed by a word meaning 'to start' or 'initiate'.",
      explanation: "git init creates a hidden folder called .git inside your project directory. This folder is the brain of your version control system. It tracks every change, every commit, and every branch from this point forward. You only need to run it once per project. Without it, Git doesn't know your folder even exists.",
      example: "$ git init\nInitialized empty Git repository in /project/.git/",
      fieldNote: { cmd: "git init", desc: "Wake the repository. Run once per project." }
    },

    {
      lesson: {
        title: "Reading the repository's current state",
        sections: [
          { type: "text", content: "Before doing anything in Git, it is a good habit to ask: what is actually happening right now? The git status command gives you a live snapshot of your working directory." },
          { type: "text", content: "Git puts files into three buckets. Untracked means Git has never seen this file. Modified means the file exists in history but changed since the last commit. Staged means it is queued and ready to be permanently saved." },
          { type: "code", content: "$ git status\nOn branch main\n\nChanges to be committed:\n  modified:   archive.txt    <-- staged\n\nChanges not staged for commit:\n  modified:   notes.txt      <-- modified, not staged\n\nUntracked files:\n  new-file.txt               <-- brand new, not tracked" },
          { type: "tip",  content: "Professional developers run git status constantly. Before staging, before committing, before switching branches. It costs nothing and prevents many mistakes." }
        ]
      },
      id: 1, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "The Observer's Rite",
      story: "The system is active now, though the chamber remains dark. Files are scattered across the workspace, including new documents and others that were modified recently. We have to follow a strict rule inscribed above the entrance: always check the state of the archive before taking action. Acting without checking first could lead to overwriting important history.",
      task: "Check the current status of the repository.",
      xp: 10, qType: "terminal", command: "git status",
      hint: "Two words. 'git' followed by a word describing the current state.",
      explanation: "git status is the most frequently used command. It shows you which files are untracked, modified, or staged and ready for a commit. Checking your status regularly helps prevent mistakes.",
      example: "$ git status\nOn branch main\nUntracked files:\n  history.txt",
      fieldNote: { cmd: "git status", desc: "Check the current state of files." }
    },

    {
      lesson: {
        title: "The staging area (Git's preparation zone)",
        sections: [
          { type: "text", content: "Git does not save changes automatically. Instead it uses a two-step process. First you stage the files you want to include. Then you commit (permanently save) just those staged files. This separation is deliberate and powerful." },
          { type: "text", content: "Why stage at all? Imagine you fixed two unrelated bugs at the same time. Staging lets you commit them separately with distinct messages, keeping your history clean, even though you worked on them together." },
          { type: "code", content: "# Stage a specific file\n$ git add history.txt\n\n# Verify what is now staged\n$ git status" },
          { type: "tip",  content: "git add only selects files for the next commit. Nothing is permanent until you run git commit." }
        ]
      },
      id: 2, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "Staging the Fragment",
      story: "In the second room, we found a clay tablet labeled history.txt that is warm to the touch. It contains data that the system has not captured yet. The interface does not automatically save every change we make. Instead, we must manually select which fragments to preserve. This process allows us to be intentional about what enters the permanent record.",
      task: "Add the file 'history.txt' to the staging area.",
      xp: 10, qType: "fill",
      template: "git ___ history.txt", blanks: ["add"],
      hint: "The blank is a three-letter word meaning 'to include' or 'to place into'.",
      explanation: "git add moves a file into the staging area. Think of the staging area as a preparation zone where you decide exactly what goes into the next commit. This extra step gives you total control over your project's timeline.",
      example: "$ git add history.txt\n# No output means success.\n# Check with: git status",
      fieldNote: { cmd: "git add <file>", desc: "Stage a specific file for the next commit." }
    },

    {
      lesson: {
        title: "Committing (making your work permanent)",
        sections: [
          { type: "text", content: "A commit is a permanent, timestamped snapshot of everything you staged. Once committed, that state of your project exists forever in the history. You can always return to it." },
          { type: "text", content: "Every commit requires a message. The -m flag lets you provide it inline. The message should describe what changed and, more importantly, why." },
          { type: "code", content: "$ git commit -m \"Recovered fragment\"\n[main (root-commit) a4f3b2e] Recovered fragment\n 1 file changed, 12 insertions(+)" },
          { type: "tip",  content: "Use the imperative mood: 'Add login page', not 'Added login page'. This convention makes history read like a list of instructions." },
          { type: "warning", content: "Committing without staging does nothing. Run git status first to confirm you have staged changes." }
        ]
      },
      id: 3, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "The First Snapshot",
      story: "The tablet is staged and ready for the system. Our lead researcher explains that committing a change makes it a permanent part of the timeline. Every saved fragment receives a timestamp and a message explaining why it was preserved. The creators of this place were very clear that every entry must have a stated purpose.",
      task: "Commit the staged changes with the message 'Recovered fragment'.",
      xp: 10, qType: "terminal", command: `git commit -m "Recovered fragment"`,
      hint: "Use 'git commit' with the -m flag, then the message in quotes.",
      explanation: "git commit creates a permanent snapshot of your staged changes. The -m flag allows you to add a descriptive message. These commits are the building blocks that form the entire history of the repository.",
      example: "$ git commit -m \"Recovered fragment\"\n[main (root-commit) a4f3b2e] Recovered fragment\n 1 file changed, 12 insertions(+)",
      fieldNote: { cmd: `git commit -m "msg"`, desc: "Snapshot staged changes permanently." }
    },

    {
      id: 4, arc: 1, nodeType: "normal", chapterType: "test",
      title: "Test: Basic Workflow",
      story: "The first chamber seals behind us with a deep rumble. A holographic interface materializes in the center of the room. The system demands proof that we understand the fundamentals before allowing us to proceed deeper. This is not a lesson. This is verification.",
      task: "What is the correct sequence to save changes in Git?",
      xp: 25, qType: "sort",
      items: ["git push", "git status", "git add .", "git commit -m 'message'"],
      answer: ["git status", "git add .", "git commit -m 'message'", "git push"],
      hint: "Check what changed, stage it, save it permanently, then share it.",
      explanation: "The fundamental Git workflow: (1) git status to see what changed, (2) git add to stage the changes, (3) git commit to save them permanently with a message, (4) git push to send them to a remote server. This sequence is the foundation of all version control work.",
      example: "$ git status\n$ git add .\n$ git commit -m \"Complete work\"\n$ git push",
      fieldNote: { cmd: "Core workflow", desc: "status, add, commit, push. Always in this order." }
    },

    {
      lesson: {
        title: "Staging everything at once",
        sections: [
          { type: "text", content: "When you have many files to stage and want to include all of them, git add . stages everything in the current directory and all subdirectories at once." },
          { type: "code", content: "# Stage everything\n$ git add .\n\n# The dot means current directory and below\n# It respects your .gitignore automatically" },
          { type: "tip",  content: "git add . is the standard shorthand. Most real-world workflows use it for nearly every commit." },
          { type: "warning", content: "Staging everything blindly can accidentally include files you did not mean to commit, such as credentials or build artifacts. Always run git status after to review what you staged." }
        ]
      },
      id: 5, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "Stage Everything",
      story: "A new door opens to reveal twelve tablets glowing simultaneously. Manually processing each one would be inefficient. Fortunately, the system includes a shorthand command to stage every modified and new file in the directory at once. This allows us to move much deeper into the archive without wasting time.",
      task: "Stage ALL files in the current directory at once.",
      xp: 10, qType: "choice",
      options: ["git add --all", "git add .", "git add *", "git add -a"],
      answer: "git add .",
      hint: "A single dot represents the current directory in Unix systems.",
      explanation: "git add . is the standard way to stage all new and modified files in your current folder and its subfolders. It is the fastest way to prepare your work before a commit.",
      example: "$ git add .\n# Stages everything in current directory.\n# Then:\n$ git commit -m \"Stage all recovered tablets\"",
      fieldNote: { cmd: "git add .", desc: "Stage ALL changes in current directory." }
    },

    {
      lesson: {
        title: "Reading your project's full history",
        sections: [
          { type: "text", content: "Every commit you have ever made is stored permanently. git log shows them in reverse chronological order. The most recent change appears at the top." },
          { type: "code", content: "$ git log\ncommit a4f3b2e (HEAD -> main)\nAuthor: Lena <lena@dig.site>\nDate:   Mon Jan 1 09:00:00 2025\n\n    Recovered fragment\n\ncommit 3c9d1aa\nAuthor: Lena <lena@dig.site>\nDate:   Sun Dec 31 18:30:00 2024\n\n    Initialize repository" },
          { type: "text", content: "Each entry shows the full commit hash (a unique ID), the author, the date, and the message. In large projects this list can be very long, which is why a compact view exists." },
          { type: "tip",  content: "Press Q to exit the log when it is long enough to require scrolling in a real terminal." }
        ]
      },
      id: 6, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "Reading the Chronicle",
      story: "Deep in the archive room, we found a wall that functions as a complete history of the chamber. Every action taken here is recorded with a date, a name, and a specific reason. The ancient builders referred to this as the Chronicle. A prominent inscription at the top suggests that understanding the past is the only way to navigate the future effectively.",
      task: "View the complete commit history of this repository.",
      xp: 10, qType: "terminal", command: "git log",
      hint: "Think: a written record of events. A ship's ___.",
      explanation: "git log displays all commits in reverse chronological order. Each entry shows the unique commit hash, the author, the date, and the message. This command is essential for reviewing the timeline of your project.",
      example: "$ git log\ncommit a4f3b2e\nAuthor: You <you@dig.site>\nDate:   Mon Jan 1 09:00:00\n\n    Recovered fragment",
      fieldNote: { cmd: "git log", desc: "Read the Chronicle. All past commits." }
    },

    {
      lesson: {
        title: "Compact history and combined flags",
        sections: [
          { type: "text", content: "The full git log output is detailed but verbose. The --oneline flag strips each entry to just the short hash and message, one line per commit. This is what most developers use when scanning recent work." },
          { type: "code", content: "$ git log --oneline\na4f3b2e Recovered fragment\n3c9d1aa Initialize repository\n\n# With a visual branch graph:\n$ git log --oneline --graph --all\n* a4f3b2e (HEAD -> main) Recovered fragment\n* 3c9d1aa Initialize repository" },
          { type: "warning", content: "--short is not a real git log flag. It looks plausible but does not exist. Always verify unfamiliar flags before relying on them." }
        ]
      },
      id: 7, arc: 1, nodeType: "normal", chapterType: "lesson",
      title: "The Compact View",
      story: "The Chronicle wall is massive and contains thousands of entries. Reading every detail would take far too long, but Lena found a symbol in the corner that reveals a compact version of the record. It displays only one line per entry. The architects clearly designed the system for efficiency when scanning through long periods of history.",
      task: "Which flags produce a compact, one-line-per-commit log?",
      xp: 10, qType: "binary",
      question: "Which command shows the commit log in compact form?",
      options: ["git log --oneline", "git log --short"],
      answer: "git log --oneline",
      hint: "--oneline = one line per commit. Simple.",
      explanation: "git log --oneline shows each commit with just its short hash and message. This is the most useful way to get a quick overview of your project's progress without cluttering the screen.",
      example: "$ git log --oneline\na4f3b2e Recovered fragment\n3c9d1aa Initialize repository",
      fieldNote: { cmd: "git log --oneline", desc: "Compact history. One line per commit." }
    },

    {
      lesson: {
        title: "Branches (parallel timelines for safe experimentation)",
        sections: [
          { type: "text", content: "A branch is a separate, independent line of development. You make changes freely on a branch without ever touching the main version. If the experiment works, you merge it back. If it fails, you delete the branch." },
          { type: "text", content: "Think of the main branch as published work. Branches are your drafts. Professional teams run dozens of branches simultaneously, one per feature, one per bug fix." },
          { type: "code", content: "# Create a branch (does NOT switch to it)\n$ git branch excavation\n\n# Confirm it exists, asterisk shows current branch\n$ git branch\n* main\n  excavation" },
          { type: "warning", content: "git branch only creates the branch. You remain on main until you explicitly switch. Switching is covered in the very next chapter." }
        ]
      },
      id: 8, arc: 2, nodeType: "branch", chapterType: "lesson",
      title: "The Fork in the Stone",
      story: "The passage ahead splits into two tunnels. The eastern tunnel is the stable primary archive, while the western tunnel is marked as an experimental branch. Our team geologist noted that the builders did not work in a single linear sequence. Instead, they created parallel copies of the record to experiment without risking the main archive. We need to create a branch of our own to proceed.",
      task: "Create a new branch called 'excavation'.",
      xp: 15, qType: "terminal", command: "git branch excavation",
      hint: "Two words: 'git branch' followed by the name of the new branch.",
      explanation: "git branch <name> creates a new pointer at your current commit. It is important to remember that this command does not switch you to the new branch. It simply marks a new path in the timeline.",
      example: "$ git branch excavation\n# No output = success.\n\n# To see all branches:\n$ git branch\n* main\n  excavation",
      fieldNote: { cmd: "git branch <name>", desc: "Create a new branch. Doesn't switch." }
    },

    {
      lesson: {
        title: "Switching branches",
        sections: [
          { type: "text", content: "Creating a branch and switching to it are two separate actions. git checkout <branch> changes your working directory to match the state of the target branch." },
          { type: "code", content: "$ git checkout excavation\nSwitched to branch 'excavation'\n\n# Modern alternative:\n$ git switch excavation" },
          { type: "tip", content: "git switch is newer and clearer in intent. Both commands do the same thing for basic branch switching." }
        ]
      },
      id: 9, arc: 2, nodeType: "branch", chapterType: "lesson",
      title: "Stepping Through",
      story: "The western tunnel is now visible in the system map, but we are still standing in the main corridor. Creating a branch and entering it are distinct actions. An inscription above the doorway reminds us that to walk a parallel path, we must consciously step away from the main timeline.",
      task: "Switch to the 'excavation' branch.",
      xp: 10, qType: "binary",
      question: "Which command switches to the 'excavation' branch?",
      options: ["git checkout excavation", "git branch switch excavation"],
      answer: "git checkout excavation",
      hint: "The classic command for switching branches uses a word meaning 'to inspect' or 'to retrieve'.",
      explanation: "git checkout <branch> updates your working directory to match the state of the selected branch. You can think of it as physically moving your workspace from one timeline to another.",
      example: "$ git checkout excavation\nSwitched to branch 'excavation'\n\n# Modern equivalent:\n$ git switch excavation",
      fieldNote: { cmd: "git checkout <branch>", desc: "Switch to an existing branch." }
    },

    {
      lesson: {
        title: "Creating and switching in one command",
        sections: [
          { type: "text", content: "Creating a branch and then immediately switching to it is such a common pattern that Git provides a shortcut: git checkout -b <name>." },
          { type: "code", content: "# Long way:\n$ git branch deep-scan\n$ git checkout deep-scan\n\n# Short way:\n$ git checkout -b deep-scan\nSwitched to a new branch 'deep-scan'" },
          { type: "tip", content: "The -b flag stands for 'branch'. This is one of the most commonly used Git shortcuts in professional development." }
        ]
      },
      id: 10, arc: 2, nodeType: "branch", chapterType: "lesson",
      title: "One Motion",
      story: "We have been creating and switching branches frequently today. Lena noticed a shorthand command carved into the floor that allows us to perform both actions in a single move. The original specialists seem to have valued speed and reduced repetitive steps whenever possible.",
      task: "Create AND switch to a new branch called 'deep-scan' in one command.",
      xp: 10, qType: "fill",
      template: "git checkout ___ deep-scan", blanks: ["-b"],
      hint: "A single flag. The letter 'b' stands for 'branch'.",
      explanation: "git checkout -b <name> is a very common shortcut that creates a branch and switches to it immediately. This is much faster than running the 'branch' and 'checkout' commands separately.",
      example: "$ git checkout -b deep-scan\nSwitched to a new branch 'deep-scan'",
      fieldNote: { cmd: "git checkout -b <name>", desc: "Create + switch in one move." }
    },

    {
      id: 11, arc: 2, nodeType: "normal", chapterType: "test",
      title: "Test: Branching Fundamentals",
      story: "The tunnels converge in a circular chamber with four doors. Each door is marked with a Git command, but only the correct sequence will unlock the path forward. The system tests not just our memory, but our understanding of how branches actually work.",
      task: "What happens when you run 'git branch feature' while on the main branch?",
      xp: 30, qType: "choice",
      options: [
        "Creates 'feature' branch but stays on main",
        "Creates 'feature' branch and switches to it",
        "Switches to 'feature' branch if it exists",
        "Renames main to feature"
      ],
      answer: "Creates 'feature' branch but stays on main",
      hint: "Think carefully. Creating is not the same as switching.",
      explanation: "git branch <name> only creates a new branch pointer at your current commit. It does NOT switch you to that branch. You remain on whatever branch you were on before. To switch, you must use git checkout or git switch separately, or use git checkout -b to do both at once.",
      example: "$ git branch feature\n# Still on main!\n\n$ git branch\n* main\n  feature",
      fieldNote: { cmd: "git branch behavior", desc: "Creates but does not switch. Two separate actions." }
    },

    {
      lesson: {
        title: "Branch naming conventions",
        sections: [
          { type: "text", content: "The default branch name has changed over time. Older repositories use 'master' as the default, while modern Git uses 'main'. Both are just labels and work identically." },
          { type: "code", content: "# Rename master to main:\n$ git branch -m master main\n\n# The -m flag means 'move' (rename)" },
          { type: "tip", content: "GitHub, GitLab, and other platforms now create new repositories with 'main' as the default branch name." }
        ]
      },
      id: 12, arc: 2, nodeType: "normal", chapterType: "lesson",
      title: "The Name Convention",
      story: "Our team found a master index that lists every branch known to this sector. Interestingly, the primary branch has two different names carved from different time periods. An older inscription uses the term 'master' while a newer one uses 'main'. Our historian believes this represents a shift in standard conventions that occurred late in the civilization's history.",
      task: "What is the modern default branch name in Git?",
      xp: 10, qType: "binary",
      question: "Modern Git default branch name:",
      options: ["main", "master"],
      answer: "main",
      hint: "GitHub changed the default in October 2020.",
      explanation: "While older repositories still use 'master', 'main' is now the standard default for new projects on most platforms. Both are just labels, but 'main' is the convention used in modern development.",
      example: "# Rename master to main:\n$ git branch -m master main",
      fieldNote: { cmd: "main vs master", desc: "Modern default is 'main'. Older repos use 'master'." }
    },

    {
      lesson: {
        title: "Listing all branches",
        sections: [
          { type: "text", content: "As projects grow, you accumulate many branches. The git branch command without arguments lists all local branches. The -a flag shows both local and remote-tracking branches." },
          { type: "code", content: "# List local branches only:\n$ git branch\n* excavation\n  main\n  deep-scan\n\n# List all branches (local + remote):\n$ git branch -a\n* excavation\n  main\n  remotes/origin/main\n  remotes/origin/feature" },
          { type: "tip", content: "The asterisk marks your current branch. Remote branches are prefixed with 'remotes/origin/'." }
        ]
      },
      id: 13, arc: 2, nodeType: "normal", chapterType: "lesson",
      title: "Branch Inventory",
      story: "We are now deep within the branch network and it is easy to get lost in these parallel corridors. The Repository contains dozens of branches, including some that are active and others that date back centuries. To navigate successfully, we need a map of the entire system.",
      task: "List ALL branches, including remote-tracking ones.",
      xp: 10, qType: "choice",
      options: ["git branch -a", "git branch --list", "git log --branches", "git branch -all"],
      answer: "git branch -a",
      hint: "The flag -a stands for 'all'. Not '--all', just '-a'.",
      explanation: "The standard git branch command only shows local branches. By adding the -a flag, you can see every branch available, including remote-tracking branches like origin/main.",
      example: "$ git branch -a\n* excavation\n  main\n  remotes/origin/main",
      fieldNote: { cmd: "git branch -a", desc: "List ALL branches, local + remote." }
    },

    {
      lesson: {
        title: "Remote repositories and connections",
        sections: [
          { type: "text", content: "A remote is a version of your repository hosted elsewhere, typically on a server like GitHub or GitLab. git remote -v lists all configured remotes and their URLs." },
          { type: "code", content: "$ git remote -v\norigin  https://github.com/you/repo.git (fetch)\norigin  https://github.com/you/repo.git (push)" },
          { type: "text", content: "The name 'origin' is the conventional default for the primary remote repository. You can have multiple remotes with different names." },
          { type: "tip", content: "The -v flag means 'verbose' and shows the actual URLs. Without it, you only see the remote names." }
        ]
      },
      id: 14, arc: 3, nodeType: "normal", chapterType: "lesson",
      title: "The Central Nexus",
      story: "The tunnels eventually lead into a vast central chamber known as the Nexus. Here, the stone walls are embedded with pulsing circuits and teal light. This area serves as the ancient remote server for the civilization. To move forward, we must identify our connection to this machine.",
      task: "List all remote connections and their URLs.",
      xp: 10, qType: "fill",
      template: "git remote ___", blanks: ["-v"],
      hint: "The flag means 'verbose', show more detail.",
      explanation: "git remote -v lists all configured remote connections along with their specific URLs. This allows you to verify where your code is being sent when you push or where it is coming from when you fetch.",
      example: "$ git remote -v\norigin  https://github.com/you/repo.git (fetch)\norigin  https://github.com/you/repo.git (push)",
      fieldNote: { cmd: "git remote -v", desc: "See all remote connections + their URLs." }
    },

    {
      lesson: {
        title: "Fetching vs pulling",
        sections: [
          { type: "text", content: "git fetch downloads changes from the remote repository but does not merge them into your working directory. git pull does both: it fetches and then automatically merges." },
          { type: "code", content: "# Download without merging:\n$ git fetch origin\n\n# Download AND merge:\n$ git pull origin main" },
          { type: "warning", content: "git pull can cause merge conflicts if you have local changes. git fetch is safer because it lets you review changes before merging." }
        ]
      },
      id: 15, arc: 3, nodeType: "normal", chapterType: "lesson",
      title: "Downloading Without Merging",
      story: "The Nexus contains data from other teams who have been working on the Archive. Before we integrate their work into our own timeline, we need to download their progress and review it. Our lead researcher suggests a cautious approach: receive the data from the remote without immediately merging it.",
      task: "Download remote changes without merging them.",
      xp: 10, qType: "binary",
      question: "Which command downloads remote changes WITHOUT merging?",
      options: ["git fetch", "git pull"],
      answer: "git fetch",
      hint: "Fetch brings the data. Pull brings AND integrates.",
      explanation: "git fetch downloads the latest changes from the remote repository but does not change your local files. This allows you to inspect what others have done before you decide to merge their work into your own.",
      example: "$ git fetch origin\nFrom https://github.com/you/repo\n   a4f3b2e..c7d9f11  main -> origin/main",
      fieldNote: { cmd: "git fetch", desc: "Download remote changes. Don't merge yet." }
    },

    {
      lesson: {
        title: "Pulling changes from remote",
        sections: [
          { type: "text", content: "git pull combines fetch and merge in one command. It downloads the latest changes from the remote and immediately integrates them into your current branch." },
          { type: "code", content: "$ git pull origin main\nUpdating a4f3b2e..c7d9f11\nFast-forward\n recovery.txt | 12 ++++++++++++\n 1 file changed, 12 insertions(+)" },
          { type: "tip", content: "Always commit or stash your local changes before pulling to avoid conflicts." }
        ]
      },
      id: 16, arc: 3, nodeType: "normal", chapterType: "lesson",
      title: "Integrating the Data",
      story: "After reviewing the downloaded data, our team has decided it is safe to integrate. We are now ready to perform a full integration using a command that both fetches and merges the remote information in a single motion.",
      task: "Fetch AND merge the remote 'main' branch into your current branch.",
      xp: 10, qType: "terminal", command: "git pull origin main",
      hint: "Pull, then the remote name, then the branch name.",
      explanation: "git pull is a combination of fetch and merge. It brings down the remote data and immediately integrates it into your current branch. It is a good habit to pull frequently to stay in sync with your team.",
      example: "$ git pull origin main\nUpdating a4f3b2e..c7d9f11",
      fieldNote: { cmd: "git pull", desc: "Fetch + merge. Integrate remote changes." }
    },

    {
      lesson: {
        title: "Pushing your commits to remote",
        sections: [
          { type: "text", content: "git push sends your local commits to a remote repository. This is how you share your work with others or back it up to a server." },
          { type: "code", content: "$ git push origin main\nEnumerating objects: 5, done.\nCounting objects: 100% (5/5), done.\nWriting objects: 100% (3/3), 289 bytes | 289.00 KiB/s, done.\nTotal 3 (delta 0), reused 0 (delta 0)" },
          { type: "warning", content: "If someone else pushed changes before you, your push will be rejected. Pull their changes first, then push again." }
        ]
      },
      id: 17, arc: 3, nodeType: "normal", chapterType: "lesson",
      title: "Sending Your Work",
      story: "We have completed several important recoveries in our local timeline and it is now time to share that work with the rest of the expedition. By transmitting our local record to the remote Archive, we ensure that the entire team has access to the latest findings.",
      task: "Push your local commits to the 'origin' remote on the 'main' branch.",
      xp: 10, qType: "terminal", command: "git push origin main",
      hint: "Push, then remote name, then branch name.",
      explanation: "git push sends your local commit history to a remote server. This is how you share your progress with others.",
      example: "$ git push origin main",
      fieldNote: { cmd: "git push origin main", desc: "Send local commits to remote." }
    },

    {
      id: 18, arc: 3, nodeType: "normal", chapterType: "test",
      title: "Test: Remote Operations",
      story: "The Nexus core pulses with energy as it evaluates our understanding. A holographic projection shows four Git commands related to remote operations. We must correctly identify what each one does. This knowledge is critical for collaborative work in the Archive.",
      task: "Match each Git remote command to what it actually does.",
      xp: 35, qType: "match",
      pairs: [
        { left: "git fetch",  right: "Downloads remote changes, no merge" },
        { left: "git pull",   right: "Downloads AND merges into current branch" },
        { left: "git push",   right: "Uploads local commits to remote" },
        { left: "git clone",  right: "Copies an entire repository locally" }
      ],
      hint: "Think: fetch = download only. pull = download + integrate. push = upload. clone = full copy.",
      explanation: "These four commands are the foundation of working with remotes. Fetch allows for inspection, pull updates your work, push shares your work, and clone creates a starting point from an existing project.",
      example: "$ git clone https://url.com/repo.git",
      fieldNote: { cmd: "fetch / pull / push / clone", desc: "The four pillars of remote work." }
    },

    {
      lesson: {
        title: "Merging branches together",
        sections: [
          { type: "text", content: "When you are done working on a branch and want to integrate it back into main, you use git merge. This combines the history of two branches." },
          { type: "code", content: "# Switch to the branch you want to merge INTO:\n$ git checkout main\n\n# Then merge the feature branch:\n$ git merge excavation\nMerge made by the 'recursive' strategy." },
          { type: "tip", content: "Always merge FROM another branch INTO your current branch. Switch to the destination first." }
        ]
      },
      id: 19, arc: 3, nodeType: "merge", chapterType: "lesson",
      title: "Two Paths Become One",
      story: "The work on our excavation branch is finally complete and the data is clean. It is time for the Convergence, where we rejoin our parallel timeline with the primary archive. The chamber walls glow as we prepare to integrate the histories.",
      task: "Merge the 'excavation' branch into your current branch.",
      xp: 15, qType: "terminal", command: "git merge excavation",
      hint: "Two words: 'git merge' followed by the branch name.",
      explanation: "git merge integrates the changes from another branch into the one you are currently using. If the branches have diverged, the system will create a merge commit to tie the two histories together.",
      example: "$ git checkout main\n$ git merge excavation",
      fieldNote: { cmd: "git merge <branch>", desc: "Bring another branch's history into current." }
    },

    {
      lesson: {
        title: "Understanding merge conflicts",
        sections: [
          { type: "text", content: "A merge conflict happens when two branches modify the same part of a file differently. Git cannot automatically decide which version to keep, so it marks the conflict and asks you to resolve it manually." },
          { type: "code", content: "<<<<<<< HEAD\nreturn 'original data';\n=======\nreturn 'new data';\n>>>>>>> feature" },
          { type: "text", content: "The top section (HEAD) is your current branch. The bottom section is the branch you are merging in. Remove the markers, choose which code to keep, then add and commit the resolved file." },
          { type: "warning", content: "Never commit files with conflict markers still in them. Always resolve conflicts completely before committing." }
        ]
      },
      id: 20, arc: 3, nodeType: "merge", chapterType: "lesson",
      title: "The Glitch Markers",
      story: "A conflict has been detected because two specialists modified the same section of a file at the same time. The machine cannot determine which version is correct and has paused for our intervention. We must identify these markers before we can resolve the conflict manually.",
      task: "Click ALL lines that are Git conflict markers in this file.",
      xp: 20, qType: "conflict",
      lines: [
        { text: "function recoverSector() {",        isMarker: false },
        { text: "<<<<<<< HEAD",                       isMarker: true  },
        { text: "  return 'original archive data';", isMarker: false },
        { text: "=======",                            isMarker: true  },
        { text: "  return 'recovered nexus data';",  isMarker: false },
        { text: ">>>>>>> excavation",                 isMarker: true  },
        { text: "}",                                  isMarker: false },
      ],
      hint: "There are exactly 3 markers: the start (<<<<<<<), the divider (=======), and the end (>>>>>>>).",
      explanation: "Git uses three markers to show a conflict. The top section shows your current version, and the bottom section shows the version you are trying to merge. To fix it, remove these markers and edit the code, then add and commit the result.",
      example: "# After editing the file to resolve:\n$ git add recovery.txt\n$ git commit -m \"Resolve merge conflict\"\n\n# Or abort entirely:\n$ git merge --abort",
      fieldNote: { cmd: "<<<<<<< / ======= / >>>>>>>", desc: "Conflict markers. Edit file, then add + commit." }
    },

    {
      id: 21, arc: 3, nodeType: "normal", chapterType: "test",
      title: "Test: Merging and Conflicts",
      story: "The Convergence chamber tests our ability to handle the most common Git scenario: merging work from parallel timelines. The hologram shows various merge-related concepts. We must demonstrate true understanding, not just memorization.",
      task: "What should you do FIRST when you encounter a merge conflict?",
      xp: 30, qType: "choice",
      options: [
        "Run git merge --abort to cancel",
        "Edit the files to remove conflict markers and choose which code to keep",
        "Run git commit to save the conflict",
        "Delete the conflicting files"
      ],
      answer: "Edit the files to remove conflict markers and choose which code to keep",
      hint: "Think about the actual problem. Git cannot decide which code is correct. You must decide.",
      explanation: "When a merge conflict occurs, the first step is to manually edit the conflicting files. Remove the conflict markers (<<<<<<, =======, >>>>>>>) and decide which code to keep or how to combine both versions. Only after resolving all conflicts should you git add the files and commit. You can abort with git merge --abort if you want to start over.",
      example: "# Workflow:\n# 1. Edit files, resolve conflicts\n# 2. git add <resolved-files>\n# 3. git commit",
      fieldNote: { cmd: "Conflict resolution", desc: "Edit first, then add and commit. Or abort." }
    },

    {
      lesson: {
        title: "Temporarily saving work with stash",
        sections: [
          { type: "text", content: "Sometimes you need to switch branches but your current work is not ready to commit. git stash temporarily shelves your changes, giving you a clean working directory." },
          { type: "code", content: "$ git stash\nSaved working directory and index state WIP on main\n\n# Later, restore the work:\n$ git stash pop" },
          { type: "tip", content: "Stash is like a temporary drawer for unfinished work. Your changes are saved but not committed." }
        ]
      },
      id: 22, arc: 4, nodeType: "normal", chapterType: "lesson",
      title: "The Anomaly",
      story: "An alarm sounds throughout the Nexus. A slow corruption is spreading through the Repository. Files are being modified without authorization and commits are appearing with incorrect messages. We need to investigate without losing the progress we have made so far.",
      task: "Temporarily save your uncommitted changes without committing them.",
      xp: 10, qType: "binary",
      question: "Which command hides work temporarily?",
      options: ["git stash", "git save"],
      answer: "git stash",
      hint: "Think of a hidden compartment. A supply ___.",
      explanation: "git stash temporarily shelves your uncommitted changes, giving you a clean working directory. These changes are saved to a stack rather than the permanent history.",
      example: "$ git stash\nSaved working directory and index state WIP on main",
      fieldNote: { cmd: "git stash", desc: "Hide uncommitted work safely. Restore later." }
    },

    {
      lesson: {
        title: "Restoring stashed changes",
        sections: [
          { type: "text", content: "git stash pop applies the most recent stash and removes it from the stash stack. git stash apply also applies it but keeps a backup in the stack." },
          { type: "code", content: "# Apply stash and remove it:\n$ git stash pop\n\n# Apply stash but keep it in stack:\n$ git stash apply\n\n# List all stashes:\n$ git stash list" },
          { type: "tip", content: "Use pop when you are confident. Use apply if you want to keep the backup." }
        ]
      },
      id: 23, arc: 4, nodeType: "normal", chapterType: "lesson",
      title: "Reclaiming the Work",
      story: "The investigation is complete and the corruption has been neutralized. With the all clear signal given, it is time to restore our hidden work and resume the mission.",
      task: "Restore the most recent stashed changes AND remove them from the stash stack.",
      xp: 10, qType: "choice",
      options: ["git stash pop", "git stash apply", "git stash restore", "git stash get"],
      answer: "git stash pop",
      hint: "Pop applies the stash AND removes it from the stack. Apply keeps it in the stack.",
      explanation: "git stash pop applies the most recent stash and simultaneously deletes it from your stash list. If you want to apply changes but keep the backup, use git stash apply instead.",
      example: "$ git stash pop\nDropped stash@{0}",
      fieldNote: { cmd: "git stash pop", desc: "Restore stash + remove it from stack." }
    },

    {
      lesson: {
        title: "Undoing commits with reset",
        sections: [
          { type: "text", content: "git reset moves the branch pointer backwards, effectively undoing commits. There are three modes: --soft (keeps changes staged), --mixed (keeps changes but unstages them), and --hard (destroys all changes)." },
          { type: "code", content: "# Undo last commit, keep changes staged:\n$ git reset --soft HEAD~1\n\n# Undo last commit, keep changes unstaged:\n$ git reset --mixed HEAD~1\n\n# Undo last commit, destroy changes:\n$ git reset --hard HEAD~1" },
          { type: "warning", content: "--hard permanently destroys uncommitted work. Use it carefully. Never use reset on commits you have already pushed and shared." }
        ]
      },
      id: 24, arc: 4, nodeType: "normal", chapterType: "lesson",
      title: "The Premature Commit",
      story: "During the chaos of the crisis, a junior specialist accidentally committed a half finished file. The message is incorrect and the code is incomplete. The commit is only a few minutes old and no one else has pulled it yet. We can undo the mistake, but we must be careful to move the work back into a staged state rather than deleting it entirely.",
      task: "Undo the last commit but keep the changes staged.",
      xp: 15, qType: "choice",
      options: ["git reset --soft HEAD~1", "git reset --hard HEAD~1", "git revert HEAD", "git commit --undo"],
      answer: "git reset --soft HEAD~1",
      hint: "--soft moves the commit pointer back but keeps your files staged. --hard DESTROYS the changes.",
      explanation: "git reset --soft moves the branch pointer back to a previous commit but leaves your changes in the staging area. HEAD~1 refers to the commit immediately before the current one.",
      example: "$ git reset --soft HEAD~1\n# Your changes are back in the staging area.",
      fieldNote: { cmd: "git reset --soft HEAD~1", desc: "Undo last commit. Keep changes staged." }
    },

    {
      lesson: {
        title: "Safe undo with revert",
        sections: [
          { type: "text", content: "Unlike reset, git revert creates a NEW commit that undoes the changes from a previous commit. This is safe for shared branches because it does not rewrite history." },
          { type: "code", content: "$ git revert HEAD\n[main b2c4f9a] Revert \"Bad commit message\"\n 1 file changed, 3 deletions(-)" },
          { type: "tip", content: "Use revert for commits that have been pushed and shared. Use reset only for local commits." }
        ]
      },
      id: 25, arc: 4, nodeType: "normal", chapterType: "lesson",
      title: "The Risk Assessment",
      story: "The team has discovered a problematic commit deeper in the Repository history. We are debating the best way to handle it. One specialist suggests a hard reset, but another argues for a method that creates a clear reversal record. Which approach is safer for a shared branch?",
      task: "Which command safely reverses a PUSHED commit without rewriting history?",
      xp: 15, qType: "choice",
      options: ["git revert HEAD", "git reset --hard HEAD~1", "git undo HEAD", "git rollback"],
      answer: "git revert HEAD",
      hint: "Revert creates a NEW commit that undoes the old one. History is preserved.",
      explanation: "git revert creates a new commit that is the exact inverse of a previous one. This is the safest way to undo changes on public or shared branches because it does not rewrite the history.",
      example: "$ git revert HEAD\n[main b2c4f9a] Revert \"Bad commit message\"",
      fieldNote: { cmd: "git revert HEAD", desc: "Safe undo for pushed commits. Creates new commit." }
    },

    {
      id: 26, arc: 4, nodeType: "normal", chapterType: "test",
      title: "Test: Crisis Management",
      story: "The Repository corruption has spread to multiple sectors. We must demonstrate our ability to handle emergency situations: stashing work, undoing mistakes, and choosing the right recovery method based on whether commits have been shared. The Archive will not proceed until we prove our mastery.",
      task: "You made a bad commit and pushed it. Your team already pulled it. What is the SAFEST way to fix this?",
      xp: 35, qType: "choice",
      options: [
        "git revert HEAD (creates a new commit that undoes the bad one)",
        "git reset --hard HEAD~1 (destroys the commit locally)",
        "git commit --amend (rewrites the commit)",
        "Delete the repository and start over"
      ],
      answer: "git revert HEAD (creates a new commit that undoes the bad one)",
      hint: "Think about what happens when others have already pulled your commit. You cannot rewrite history they already have.",
      explanation: "Once a commit is pushed and others have pulled it, you cannot safely use reset or amend because those rewrite history. Your teammates would have conflicts. git revert is the only safe option: it creates a NEW commit that reverses the bad one, preserving the timeline everyone shares.",
      example: "# Safe for shared commits:\n$ git revert HEAD\n$ git push\n\n# Dangerous for shared commits:\n$ git reset --hard HEAD~1  # Don't do this!",
      fieldNote: { cmd: "Shared branch fixes", desc: "revert for pushed commits. reset only for local work." }
    },

    {
      lesson: {
        title: "Deleting branches safely",
        sections: [
          { type: "text", content: "After merging a branch, you often want to delete it to keep your branch list clean. git branch -d deletes a branch only if it has been fully merged. git branch -D force-deletes it regardless." },
          { type: "code", content: "# Safe delete (only if merged):\n$ git branch -d excavation\nDeleted branch excavation\n\n# Force delete (even if not merged):\n$ git branch -D experimental\nDeleted branch experimental" },
          { type: "warning", content: "Lowercase -d protects you from deleting unmerged work. Uppercase -D bypasses that protection." }
        ]
      },
      id: 27, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "The Threshold",
      story: "Beyond the Nexus lies a door of polished black glass. An electric blue glow outlines the frame, and as we step through, the stone walls vanish and are replaced by structures of pure light and data. The original civilization eventually moved their entire existence into the system itself.",
      task: "Clean up: delete the now-merged local 'excavation' branch.",
      xp: 10, qType: "fill",
      template: "git branch ___ excavation", blanks: ["-d"],
      hint: "The lowercase -d flag is for safe deletion of merged branches.",
      explanation: "git branch -d <name> deletes a local branch only if it has been fully merged into your current branch. Use a capital -D to force-delete an unmerged branch.",
      example: "$ git branch -d excavation\nDeleted branch excavation",
      fieldNote: { cmd: "git branch -d <name>", desc: "Safely delete a merged local branch." }
    },

    {
      lesson: {
        title: "The reference log (Git's safety net)",
        sections: [
          { type: "text", content: "git reflog records every movement of the HEAD pointer, even after resets, rebases, or branch deletions. It is your safety net for recovering lost commits." },
          { type: "code", content: "$ git reflog\na4f3b2e HEAD@{0}: commit: Add feature\n3c9d1aa HEAD@{1}: reset: moving to HEAD~1\nb7f2e44 HEAD@{2}: commit: Bad commit (now lost)\n\n# Restore the lost commit:\n$ git checkout b7f2e44" },
          { type: "tip", content: "Reflog entries expire after 90 days by default. Use it when you accidentally delete or reset something important." }
        ]
      },
      id: 28, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "The Reference Log",
      story: "A specialist who entered before us performed a hard reset and accidentally erased several important commits. In this environment, nothing is truly deleted. The system maintains a secret record of every movement of the HEAD pointer, even after resets or rebases.",
      task: "View the reference log showing every HEAD movement, including resets.",
      xp: 15, qType: "terminal", command: "git reflog",
      hint: "The command combines the words 'reference' and 'log'.",
      explanation: "git reflog is the ultimate safety net in Git. It records every time your HEAD pointer moves, such as during checkouts, commits, or resets. Even if you perform a hard reset, the previous commit hashes remain in the reflog for a limited time.",
      example: "$ git reflog\na4f3b2e HEAD@{0}: reset: moving to HEAD~1",
      fieldNote: { cmd: "git reflog", desc: "The safety net that records all HEAD movements." }
    },

    {
      lesson: {
        title: "Rebasing for linear history",
        sections: [
          { type: "text", content: "git rebase takes commits from your current branch and replays them on top of another branch. This creates a clean, linear history without merge commits." },
          { type: "code", content: "# On feature branch:\n$ git rebase main\nFirst, rewinding head to replay your work on top of it...\nApplying: Add new feature" },
          { type: "warning", content: "NEVER rebase commits that have been pushed and shared with others. Rebasing rewrites history, which causes problems for collaborators." }
        ]
      },
      id: 29, arc: 5, nodeType: "merge", chapterType: "lesson",
      title: "The Linear History",
      story: "The lead architect presents us with a question about how history should be recorded. When two timelines converge, we can either leave a visible fork in the record or rewrite the story so it appears as a single linear sequence.",
      task: "Which command rewrites commits to sit atop another branch for a linear history?",
      xp: 15, qType: "binary",
      question: "For a clean linear history, use:",
      options: ["git rebase main", "git merge main"],
      answer: "git rebase main",
      hint: "Think of moving the 'base' of your work onto a new foundation.",
      explanation: "git rebase takes the commits from your current branch and 'replays' them on top of another branch. This results in a much cleaner, linear project history without merge commits. Never rebase branches already shared with others.",
      example: "$ git checkout feature\n$ git rebase main",
      fieldNote: { cmd: "git rebase", desc: "Rewrite commits onto a new base for a linear history." }
    },

    {
      lesson: {
        title: "Tagging specific versions",
        sections: [
          { type: "text", content: "Tags are permanent labels for specific points in your history, typically used to mark release versions like v1.0 or v2.0. Unlike branches, tags do not move when you create new commits." },
          { type: "code", content: "$ git tag v1.0\n\n# List all tags:\n$ git tag\nv0.9\nv1.0\n\n# Push tags to remote:\n$ git push --tags" },
          { type: "tip", content: "Use annotated tags for releases: git tag -a v1.0 -m 'Release version 1.0'. They include metadata like the tagger and date." }
        ]
      },
      id: 30, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "The Tag Protocol",
      story: "We have reached a chamber where the civilization recorded their major milestones. These are not just standard commits, but specific moments in time given human-readable names. The architects believed that certain achievements deserve a permanent place in the record.",
      task: "Tag the current commit as version 'v1.0'.",
      xp: 10, qType: "terminal", command: "git tag v1.0",
      hint: "Use the tag command followed by the version name.",
      explanation: "git tag <name> creates a pointer to a specific point in your history, usually used to mark release points like v1.0 or v2.0. Unlike branches, tags do not move when you make new commits.",
      example: "$ git tag v1.0\n# To see all tags: git tag",
      fieldNote: { cmd: "git tag <name>", desc: "Create a permanent marker for a specific version." }
    },

    {
      id: 31, arc: 5, nodeType: "normal", chapterType: "test",
      title: "Test: Advanced Operations",
      story: "The digital architect's final trial. We must demonstrate understanding of advanced Git concepts: reflog recovery, rebasing for clean history, and proper tag management. This test requires thinking, not just memory. The Archive will measure our decision-making ability.",
      task: "You accidentally ran 'git reset --hard HEAD~3' and lost 3 commits. How do you recover them?",
      xp: 40, qType: "choice",
      options: [
        "git reflog, find the lost commit hash, git checkout <hash>",
        "git log --all, find the commits, git merge them",
        "git status, the commits should still be there",
        "Cannot recover, they are permanently deleted"
      ],
      answer: "git reflog, find the lost commit hash, git checkout <hash>",
      hint: "The reflog remembers every HEAD movement, even hard resets. The commits still exist, you just need to find them.",
      explanation: "When you run git reset --hard, the commits are not actually deleted. They are just disconnected from your branch. git reflog shows every HEAD movement, including the position before the reset. Find the commit hash in the reflog, then git checkout <hash> to restore it. You can then create a new branch from there.",
      example: "$ git reflog\nb7f2e44 HEAD@{3}: commit: Lost work\n$ git checkout b7f2e44\n$ git checkout -b recovery",
      fieldNote: { cmd: "Recovery workflow", desc: "reflog -> find hash -> checkout. Nothing is truly lost." }
    },

    {
      lesson: {
        title: "Ignoring files with .gitignore",
        sections: [
          { type: "text", content: "A .gitignore file tells Git which files and folders to ignore. This prevents your repository from becoming cluttered with temporary files, build artifacts, or sensitive data." },
          { type: "code", content: "# Example .gitignore file:\nnode_modules/\n*.log\n.env\nbuild/\n*.pyc" },
          { type: "tip", content: "Create .gitignore at the root of your repository. Each line is a pattern. Comments start with #." }
        ]
      },
      id: 32, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "Ignoring the Noise",
      story: "The Repository contains more than just essential code. It is often cluttered with machine-generated files, logs, and temporary data that should not be tracked. The ancient architects used a specific manifest to tell the system which files to ignore.",
      task: "What is the name of the file that tells Git which files to ignore?",
      xp: 10, qType: "choice",
      options: [".gitignore", ".git-ignore", "git.ignore", ".ignore"],
      answer: ".gitignore",
      hint: "It is a hidden file starting with a dot followed by the word 'ignore'.",
      explanation: "A .gitignore file is a plain text file where you list the names of files and folders that Git should ignore. This prevents your repository from becoming bloated with unnecessary files like compiled code or local configuration settings.",
      example: "# Inside .gitignore:\nnode_modules/\n*.log",
      fieldNote: { cmd: ".gitignore", desc: "A manifest used to exclude files from tracking." }
    },

    {
      lesson: {
        title: "Configuring Git identity",
        sections: [
          { type: "text", content: "Every commit includes the author's name and email. You must configure these using git config before making your first commit." },
          { type: "code", content: "# Set globally for all repos:\n$ git config --global user.name \"Your Name\"\n$ git config --global user.email \"you@example.com\"\n\n# Check current config:\n$ git config user.name" },
          { type: "tip", content: "Use --global to set identity once for all repositories. Omit it to set per-repository." }
        ]
      },
      id: 33, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "The Configuration Rite",
      story: "Every commit in the Repository carries a signature including a name and email address. However, our current terminal has not been configured yet. Before we can contribute to the Chronicle, the system must know our identity.",
      task: "What command sets your Git username globally?",
      xp: 10, qType: "fill",
      template: `git config ___ user.name "Your Name"`, blanks: ["--global"],
      hint: "Use a flag that ensures this setting applies to every repository on your machine.",
      explanation: "The git config --global command allows you to set your identity for all projects on your computer. It is one of the first things you should do when setting up Git.",
      example: "$ git config --global user.name \"Rainier-PS\"",
      fieldNote: { cmd: "git config --global", desc: "Set your identity for all Git projects." }
    },

    {
      lesson: {
        title: "Viewing commit details",
        sections: [
          { type: "text", content: "git show displays both the metadata of a commit (author, date, message) and the full diff of the changes it introduced." },
          { type: "code", content: "$ git show a4f3b2e\ncommit a4f3b2e\nAuthor: Lena <lena@dig.site>\nDate:   Mon Jan 1 09:00:00\n\n    Recovered fragment\n\ndiff --git a/recovery.txt b/recovery.txt\n+++ recovery data here +++" },
          { type: "tip", content: "This is the fastest way to see exactly what happened in a single commit." }
        ]
      },
      id: 34, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "Inspecting a Commit",
      story: "The architect flags a specific commit from the distant past that may be related to the corruption we found earlier. We need to see the actual changes, every line that was added or removed in that specific snapshot.",
      task: "View the detailed changes introduced by a specific commit.",
      xp: 15, qType: "choice",
      options: ["git show a4f3b2e", "git diff a4f3b2e", "git log -p a4f3b2e", "git inspect a4f3b2e"],
      answer: "git show a4f3b2e",
      hint: "The command name implies you want the system to display the commit details.",
      explanation: "git show displays both the metadata of a commit and the full diff of the changes made. This is the fastest way to see exactly what happened in a single commit.",
      example: "$ git show a4f3b2e",
      fieldNote: { cmd: "git show <hash>", desc: "View the full details and diff of a specific commit." }
    },

    {
      lesson: {
        title: "Finding who changed a line with git blame",
        sections: [
          { type: "text", content: "git blame shows who last modified each line of a file, along with the commit hash and timestamp. This is essential for understanding the history of specific code." },
          { type: "code", content: "$ git blame recovery.txt\na4f3b2e (Lena 2025-01-01 09:00:00  1) function recover() {\n3c9d1aa (Dev  2024-12-31 18:30:00  2)   return data;\nb7f2e44 (Lena 2025-01-02 14:15:00  3) }" },
          { type: "tip", content: "Use git blame to track down when a bug was introduced or who has expertise in a particular area of the code." }
        ]
      },
      id: 35, arc: 5, nodeType: "normal", chapterType: "lesson",
      title: "Finding the Culprit",
      story: "We have narrowed down the source of the corruption to a single line in a file, but that file has been edited by many different people. We need to find out who was the last person to modify that specific line.",
      task: "Which command shows which commit last modified each line of a file?",
      xp: 15, qType: "binary",
      question: "To see who last changed each line in a file:",
      options: ["git blame recovery.txt", "git log recovery.txt"],
      answer: "git blame recovery.txt",
      hint: "The command name suggests you are trying to find who is responsible for a change.",
      explanation: "git blame provides a line by line breakdown of a file, showing the commit hash and author for every modification. It is an essential tool for debugging and understanding the history of a specific piece of code.",
      example: "$ git blame recovery.txt",
      fieldNote: { cmd: "git blame <file>", desc: "Identify who last modified each line in a file." }
    },

    {
      id: 36, arc: 5, nodeType: "merge", chapterType: "test",
      title: "Test: Complete Professional Workflow",
      story: "We have reached the final chamber of the Kethara Repository. The digital architect presents the ultimate challenge: we must demonstrate complete mastery of the Git workflow by arranging the complete professional cycle from start to finish. This requires understanding not just individual commands, but how they fit together.",
      task: "Arrange the COMPLETE professional Git workflow in order.",
      xp: 45, qType: "sort",
      items: [
        "git push origin feature",
        "git clone https://repo.git",
        "git commit -m 'feat: add recovery'",
        "git checkout -b feature",
        "git add ."
      ],
      answer: [
        "git clone https://repo.git",
        "git checkout -b feature",
        "git add .",
        "git commit -m 'feat: add recovery'",
        "git push origin feature"
      ],
      hint: "Start with a new copy of the project and end by sharing your work with the remote server.",
      explanation: "The full professional cycle begins with cloning a repository and creating a new branch for your work. You then stage and commit your changes locally before pushing them to the remote server. This workflow ensures your main branch stays clean and your features are isolated until they are ready.",
      example: "$ git clone [url]\n$ git checkout -b feature\n$ git add .\n$ git commit -m \"message\"\n$ git push origin feature",
      fieldNote: { cmd: "Full Workflow", desc: "The complete cycle from cloning to pushing changes." }
    },

    {
      lesson: {
        title: "Viewing changes with git diff",
        sections: [
          { type: "text", content: "git diff shows the exact lines that have been added or removed in your working directory since the last commit. It only shows changes for files that are NOT staged." },
          { type: "code", content: "$ git diff\ndiff --git a/recovery.txt b/recovery.txt\n--- a/recovery.txt\n+++ b/recovery.txt\n@@ -1,3 +1,4 @@\n function recover() {\n+  console.log('starting');\n   return data;\n }\n\n# For staged changes:\n$ git diff --staged" },
          { type: "tip", content: "Lines starting with + are additions. Lines starting with - are deletions." }
        ]
      },
      id: 37, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "The Aftermath",
      story: "The Repository pulses with a steady rhythm now. New files are created, old ones are deleted, and sometimes you need to see exactly what you modified before deciding whether to commit it at all.",
      task: "See what has changed in your working directory since the last commit.",
      xp: 10, qType: "terminal", command: "git diff",
      hint: "The command name literally means the difference between two states.",
      explanation: "git diff shows the exact lines that have been added or removed in your working directory since the last commit, but only for files that are not yet staged. Use git diff --staged to compare what is staged against the last commit.",
      example: "$ git diff\n# Shows unstaged changes.\n\n$ git diff --staged\n# Shows staged changes vs last commit.",
      fieldNote: { cmd: "git diff", desc: "Show what changed since the last commit." }
    },

    {
      lesson: {
        title: "Unstaging files",
        sections: [
          { type: "text", content: "If you accidentally staged a file, you can unstage it without deleting the file itself using git restore --staged <file>." },
          { type: "code", content: "$ git restore --staged secrets.txt\n# File is now unstaged but still exists on disk" },
          { type: "tip", content: "This is the modern way to unstage. Older Git versions used 'git reset HEAD <file>'." }
        ]
      },
      id: 38, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "The Unstaging Protocol",
      story: "A junior specialist accidentally staged a configuration file that contains sensitive access credentials. We need to remove it from the staging area without deleting the file itself from disk.",
      task: "Remove 'secrets.txt' from the staging area without deleting the file.",
      xp: 10, qType: "fill",
      template: "git restore ___ secrets.txt", blanks: ["--staged"],
      hint: "You want to restore the staged version back to unstaged. The flag specifies the area.",
      explanation: "git restore --staged <file> removes a file from the staging area and puts it back in your working directory as an unstaged change. The file itself is untouched on disk.",
      example: "$ git restore --staged secrets.txt\n# File is back to unstaged state.",
      fieldNote: { cmd: "git restore --staged <file>", desc: "Unstage a file without touching it on disk." }
    },

    {
      lesson: {
        title: "Discarding local changes",
        sections: [
          { type: "text", content: "git restore <file> discards all uncommitted changes to a specific file, reverting it to the state it was in at the last commit." },
          { type: "code", content: "$ git restore translation.txt\n# All changes to translation.txt are gone" },
          { type: "warning", content: "This permanently destroys uncommitted work. Use it carefully. Changes that were never committed are lost forever." }
        ]
      },
      id: 39, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Discarding Local Changes",
      story: "We spent the last hour editing a translation file and the results made things worse. The file is not staged. Rather than manually undoing every change, the system allows us to discard all local modifications to a specific file instantly.",
      task: "Discard all local changes to 'translation.txt' and restore the last committed version.",
      xp: 10, qType: "terminal", command: "git restore translation.txt",
      hint: "Restore the file to its last committed state. Just the filename, no flags needed.",
      explanation: "git restore <file> discards all uncommitted changes to a specific file, reverting it to the state it was in at the last commit. Use it carefully, changes that were never committed are permanently lost.",
      example: "$ git restore translation.txt\n# All changes to translation.txt are gone.",
      fieldNote: { cmd: "git restore <file>", desc: "Discard local changes and restore last committed state." }
    },

    {
      lesson: {
        title: "Amending the last commit",
        sections: [
          { type: "text", content: "git commit --amend lets you modify the most recent commit. You can change the message or add forgotten files. The commit hash changes because you are creating a new commit." },
          { type: "code", content: "# Fix the message only:\n$ git commit --amend -m \"Correct message\"\n\n# Add a forgotten file:\n$ git add forgotten.txt\n$ git commit --amend --no-edit" },
          { type: "warning", content: "NEVER amend a commit that has been pushed and shared with others. Amending rewrites history." }
        ]
      },
      id: 40, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "The Amend Protocol",
      story: "We just committed a recovery record and immediately noticed two problems: a typo in the message and a missing file. Fortunately, no one has pulled our commit yet. The architect shows us how to absorb a new staged change and rewrite the message in one operation.",
      task: "Which flag allows you to modify the most recent commit?",
      xp: 10, qType: "binary",
      question: "To fix the last commit (message or files), use:",
      options: ["git commit --amend", "git commit --fix"],
      answer: "git commit --amend",
      hint: "The word 'amend' means to make corrections to something.",
      explanation: "git commit --amend opens your editor to rewrite the last commit message and also absorbs anything currently in the staging area into that commit. Never amend a commit that has already been pushed and shared with others.",
      example: "# Fix message:\n$ git commit --amend -m \"Correct message\"\n\n# Add forgotten file:\n$ git add forgotten.txt\n$ git commit --amend --no-edit",
      fieldNote: { cmd: "git commit --amend", desc: "Rewrite the last commit. Never on shared branches." }
    },

    {
      id: 41, arc: 6, nodeType: "normal", chapterType: "test",
      title: "Test: File Management",
      story: "The Archive tests our understanding of file management operations: staging, unstaging, discarding changes, and amending commits. These operations are the foundation of daily Git work. We must demonstrate not just knowledge, but wisdom in choosing the right tool for each situation.",
      task: "You staged secrets.txt by mistake. What is the correct command to unstage it WITHOUT deleting the file?",
      xp: 30, qType: "choice",
      options: [
        "git restore --staged secrets.txt",
        "git reset --hard secrets.txt",
        "git rm secrets.txt",
        "git checkout secrets.txt"
      ],
      answer: "git restore --staged secrets.txt",
      hint: "You want to move it from staged back to unstaged. The file should remain on disk.",
      explanation: "git restore --staged <file> is the correct modern command to unstage a file without touching it on disk. git reset --hard would destroy your changes. git rm would delete the file. git checkout is the old way and less clear in intent.",
      example: "$ git restore --staged secrets.txt\n# File is unstaged but still exists",
      fieldNote: { cmd: "Unstaging safely", desc: "restore --staged moves from staged to unstaged. File stays." }
    },

    {
      lesson: {
        title: "Stashing with a message",
        sections: [
          { type: "text", content: "You can save a stash with a descriptive message to make it easier to identify later when you have multiple stashes." },
          { type: "code", content: "$ git stash push -m \"wip: decoder fix\"\nSaved working directory: wip: decoder fix\n\n# List stashes with messages:\n$ git stash list\nstash@{0}: On main: wip: decoder fix\nstash@{1}: WIP on main: a4f3b2e Old work" },
          { type: "tip", content: "Using descriptive messages makes it much easier to find the right stash when you have several saved." }
        ]
      },
      id: 42, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Stash With a Name",
      story: "The expedition has grown in complexity and we now have several different pieces of unfinished work to shelve at different times. Plain stash entries with no label are difficult to tell apart. The architect reveals that the system allows us to save a stash with a descriptive message.",
      task: "Stash your current changes with the message 'wip: decoder fix'.",
      xp: 10, qType: "terminal", command: `git stash push -m "wip: decoder fix"`,
      hint: "Use git stash push with the -m flag followed by a message in quotes.",
      explanation: "git stash push -m \"message\" saves your changes to the stash stack with a descriptive label. When you run git stash list later, you will see this message next to the entry.",
      example: "$ git stash push -m \"wip: decoder fix\"\nSaved working directory: wip: decoder fix",
      fieldNote: { cmd: `git stash push -m "msg"`, desc: "Save a stash with a descriptive label." }
    },

    {
      lesson: {
        title: "Renaming branches",
        sections: [
          { type: "text", content: "git branch -m <new-name> renames the current branch. You can also specify both old and new names if you are not on the branch." },
          { type: "code", content: "# Rename current branch:\n$ git branch -m scanner-repair\n\n# Rename any branch:\n$ git branch -m old-name new-name" },
          { type: "tip", content: "The -m flag stands for 'move', which is how Unix systems rename things." }
        ]
      },
      id: 43, arc: 6, nodeType: "branch", chapterType: "lesson",
      title: "The Rename",
      story: "One of our working branches was created with a temporary name during an emergency. Now that the situation has stabilised, the name no longer reflects the purpose of the work. Rather than deleting and recreating it, the system allows us to rename it in place.",
      task: "Rename the current branch to 'scanner-repair'.",
      xp: 10, qType: "fill",
      template: "git branch ___ scanner-repair", blanks: ["-m"],
      hint: "The flag stands for 'move', which is how Unix systems rename things.",
      explanation: "git branch -m <new-name> renames the branch you are currently on. If you want to rename a branch you are not currently on, use git branch -m <old-name> <new-name>.",
      example: "# Rename current branch:\n$ git branch -m scanner-repair",
      fieldNote: { cmd: "git branch -m <name>", desc: "Rename the current branch in place." }
    },

    {
      lesson: {
        title: "Searching tracked files",
        sections: [
          { type: "text", content: "git grep searches the contents of all tracked files for a given pattern. It is much faster than regular grep because it only searches files Git knows about." },
          { type: "code", content: "$ git grep recoverSector\nrecovery.js:12: function recoverSector() {\nutils.js:45:   recoverSector(data);\n\n# With line numbers:\n$ git grep -n recoverSector" },
          { type: "tip", content: "git grep works with regular expressions and ignores untracked or ignored files automatically." }
        ]
      },
      id: 44, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Searching the Archive",
      story: "We need to find every location in the codebase where a specific function name was used. The files are scattered across dozens of directories and searching manually would take days. The architect reveals a built-in search tool that scans every tracked file for a given pattern.",
      task: "Search all tracked files for the text 'recoverSector'.",
      xp: 10, qType: "terminal", command: "git grep recoverSector",
      hint: "It works like a standard grep but only searches files tracked by Git.",
      explanation: "git grep <pattern> searches the contents of all tracked files for a given string or regular expression. It is much faster than running a general grep on a large project because it only searches files Git knows about.",
      example: "$ git grep recoverSector\nrecovery.js:12: function recoverSector() {",
      fieldNote: { cmd: "git grep <pattern>", desc: "Search tracked files for a string or pattern." }
    },

    {
      lesson: {
        title: "Cherry-picking specific commits",
        sections: [
          { type: "text", content: "git cherry-pick copies a specific commit from anywhere in the repository and applies it as a new commit on your current branch." },
          { type: "code", content: "$ git cherry-pick a4f3b2e\n[main c9d2f11] Apply critical fix\n 1 file changed, 3 insertions(+)" },
          { type: "tip", content: "Use this when you need just one specific fix from another branch without merging everything." }
        ]
      },
      id: 45, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Cherry Picking",
      story: "The scanner-repair branch has twelve commits. Most of them are experimental and not ready for the main timeline. However, there is one specific commit that contains a critical bug fix we need immediately. We want to copy only that commit without merging the entire branch.",
      task: "Apply only the commit 'a4f3b2e' to the current branch.",
      xp: 15, qType: "terminal", command: "git cherry-pick a4f3b2e",
      hint: "The command name describes selecting one specific item from a collection.",
      explanation: "git cherry-pick <hash> copies a specific commit from anywhere in the repository and applies it as a new commit on your current branch. The original commit remains where it was.",
      example: "$ git cherry-pick a4f3b2e\n[main c9d2f11] Apply critical fix\n 1 file changed, 3 insertions(+)",
      fieldNote: { cmd: "git cherry-pick <hash>", desc: "Copy one specific commit to the current branch." }
    },

    {
      id: 46, arc: 6, nodeType: "normal", chapterType: "test",
      title: "Test: Advanced Techniques",
      story: "The deepest protocols require mastery of specialized tools: cherry-picking individual commits, searching across the codebase, renaming branches on the fly. The Archive demands we understand not just what these commands do, but when to use them over alternatives.",
      task: "Match each advanced Git operation to its correct use case.",
      xp: 40, qType: "match",
      pairs: [
        { left: "git cherry-pick",  right: "Copy one specific commit to current branch" },
        { left: "git grep",         right: "Search all tracked files for a pattern" },
        { left: "git branch -m",    right: "Rename the current branch" },
        { left: "git reflog",       right: "Find commits lost after a reset" }
      ],
      hint: "Think about what each command is designed for. Cherry-pick is selective, grep is search, -m is rename, reflog is recovery.",
      explanation: "Each of these commands serves a specific purpose: cherry-pick for selective commit copying, grep for codebase searching, branch -m for renaming, and reflog for recovering lost work. Understanding when to reach for each tool is the mark of an experienced Git user.",
      example: "$ git cherry-pick a4f3b2e  # Copy one commit\n$ git grep 'bug'           # Search all files\n$ git branch -m new-name   # Rename branch\n$ git reflog               # Find lost commits",
      fieldNote: { cmd: "Advanced operations", desc: "cherry-pick, grep, branch -m, reflog. Each solves a specific problem." }
    },

    {
      lesson: {
        title: "Binary search with git bisect",
        sections: [
          { type: "text", content: "git bisect helps you find which commit introduced a bug by performing a binary search through your history. You mark a bad commit and a good commit, then Git checks out the midpoint for you to test." },
          { type: "code", content: "$ git bisect start\n$ git bisect bad          # Current commit is broken\n$ git bisect good v1.0    # v1.0 was working\n# Test your code, then:\n$ git bisect good  # or bad\n# Repeat until found\n$ git bisect reset" },
          { type: "tip", content: "Bisect is incredibly powerful for finding regressions in large codebases. It can find the problematic commit in log(n) steps." }
        ]
      },
      id: 47, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Bisect: The Time Search",
      story: "The corruption in the Repository introduced itself at some unknown point in the past. The commit log shows hundreds of entries and we cannot check them all by hand. The architect describes a method that cuts the history in half repeatedly until it isolates the single commit responsible.",
      task: "What is the first command to start a binary search for a bug?",
      xp: 15, qType: "terminal", command: "git bisect start",
      hint: "You begin the session with 'bisect start'.",
      explanation: "git bisect start begins a binary search session through your commit history. After starting, you mark a bad commit and a known good one, then Git checks out the midpoint for you to test. This process continues until the problematic commit is found.",
      example: "$ git bisect start\n$ git bisect bad\n$ git bisect good v1.0",
      fieldNote: { cmd: "git bisect start", desc: "Begin binary search to find bug-introducing commit." }
    },

    {
      lesson: {
        title: "Working with multiple worktrees",
        sections: [
          { type: "text", content: "git worktree allows you to check out multiple branches simultaneously in separate directories, all linked to the same repository. This is useful when you need to work on two branches at once." },
          { type: "code", content: "$ git worktree add ../hotfix-dir hotfix\nPreparing worktree (checking out 'hotfix')\n\n# List all worktrees:\n$ git worktree list\n/project        a4f3b2e [main]\n/hotfix-dir     b7f2e44 [hotfix]" },
          { type: "tip", content: "This is cleaner than cloning the repository twice. All worktrees share the same .git folder." }
        ]
      },
      id: 48, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Worktree: Two Places at Once",
      story: "A senior architect from the original civilization left a final lesson encoded in the deepest chamber. She had discovered a way to work on two branches simultaneously without losing the state of either. This technique creates a second working directory on disk linked to the same repository.",
      task: "Which command creates a second working directory for the 'hotfix' branch?",
      xp: 20, qType: "choice",
      options: [
        "git worktree add ../hotfix-dir hotfix",
        "git checkout --worktree hotfix",
        "git branch --copy hotfix ../hotfix-dir",
        "git clone --branch hotfix . ../hotfix-dir"
      ],
      answer: "git worktree add ../hotfix-dir hotfix",
      hint: "The worktree subcommand is followed by the path for the new directory and then the branch name.",
      explanation: "git worktree add <path> <branch> creates a new directory on disk that is linked to your existing repository but checked out to a different branch. You can work on the hotfix branch while your main directory stays on main.",
      example: "$ git worktree add ../hotfix-dir hotfix\nPreparing worktree (checking out 'hotfix')",
      fieldNote: { cmd: "git worktree add <path> <branch>", desc: "Work on two branches simultaneously in separate folders." }
    },

    {
      lesson: {
        title: "Viewing contributor statistics",
        sections: [
          { type: "text", content: "git shortlog produces a summary of commits grouped by author. The -s flag shows only counts, and -n sorts by number of commits." },
          { type: "code", content: "$ git shortlog -sn\n    42  Lena Vasquez\n    31  Rainier-PS\n    18  Dev Okonkwo" },
          { type: "tip", content: "This is useful for understanding who has contributed most to a project or specific area of code." }
        ]
      },
      id: 49, arc: 6, nodeType: "normal", chapterType: "lesson",
      title: "Shortlog and Contributors",
      story: "The expedition leadership wants a summary of who contributed what to the Repository before the restoration. Reading through every commit one by one would take too long. The archive records contain a condensed view of contributions grouped by author.",
      task: "View a summary of commits grouped by author.",
      xp: 15, qType: "binary",
      question: "Which command shows commit counts grouped by contributor?",
      options: ["git shortlog -sn", "git log --authors"],
      answer: "git shortlog -sn",
      hint: "The -s flag means summary and the -n flag sorts by number of commits.",
      explanation: "git shortlog -sn produces a sorted list of contributors along with how many commits each person has made. The -s flag suppresses individual commit messages and shows only the count. The -n flag sorts from most to fewest commits.",
      example: "$ git shortlog -sn\n    42  Lena Vasquez\n    31  Rainier-PS",
      fieldNote: { cmd: "git shortlog -sn", desc: "Summarise commits per author, sorted by count." }
    },

    {
      id: 50, arc: 6, nodeType: "merge", chapterType: "test",
      title: "Final Test: Master Evaluation",
      story: "The final chamber of the deep archive has opened. The oldest inscription in the entire Repository is carved here. The civilization's greatest specialists were not those who memorised the most commands. They were those who understood why each command existed and when to reach for it over the alternatives. This is the ultimate test.",
      task: "Arrange these scenarios in order from the safest operation to the most potentially destructive.",
      xp: 50, qType: "sort",
      items: [
        "git reset --hard HEAD~3",
        "git log --oneline",
        "git revert HEAD",
        "git commit --amend (on a pushed branch)"
      ],
      answer: [
        "git log --oneline",
        "git revert HEAD",
        "git commit --amend (on a pushed branch)",
        "git reset --hard HEAD~3"
      ],
      hint: "Reading is always safe. Creating a new reversal commit is safer than rewriting history. Hard reset is the most dangerous.",
      explanation: "Git operations exist on a spectrum of risk. Read-only operations like git log are always completely safe. git revert is safe even on shared branches because it adds a new commit. Amending a pushed commit rewrites history and will cause problems for collaborators. Hard reset permanently destroys local changes and is the most dangerous operation.",
      example: "# From safest to most dangerous:\n# 1. git log --oneline       (read only)\n# 2. git revert HEAD         (new commit)\n# 3. git commit --amend      (rewrites history)\n# 4. git reset --hard HEAD~3 (destroys work)",
      fieldNote: { cmd: "Risk spectrum", desc: "log < revert < amend < reset --hard. Know the danger level." }
    }
  ]
};
