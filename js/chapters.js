/* GITGUD — CHAPTERS DATA
   To add chapters: push new objects to CHAPTERS array.
   To export to JSON: JSON.stringify(CHAPTERS) */

const PROLOGUE_SLIDES = [
  `Year unknown. The expedition team has been excavating the Kethara Plateau for six months when they find it — buried beneath forty feet of stone and sand: a structure unlike anything on record. Not a tomb. Not a temple. A machine room.

The walls are covered in inscriptions. Not symbols of gods or kings, but something stranger. Sequences. Patterns. Commands.`,

  `Your team's linguist cracks the first glyph on day three: the inscription reads "git init". An hour later, a second: "git commit". By nightfall, the walls are speaking a language you recognise.

Version control. An ancient civilisation built the entire science of version control — not with computers, but carved into stone. And then they vanished, taking their knowledge with them.`,

  `The machine room connects to a vast underground network: the Kethara Repository. Thousands of data chambers, each holding a fragment of their civilization's accumulated knowledge. But the Repository is corrupted. Sectors are dark. Branches are broken. The commit log ends mid-sentence, 3,000 years ago.

Someone — or something — interrupted the Archive before it could be sealed.`,

  `Your mission is clear: reactivate the Repository sector by sector. Recover the knowledge. Rebuild the commit history. Find out what happened to the civilization that built this place.

You are not just learning their system. You are following their footsteps. You are a Ledger Specialist now — and every command you type brings a dead world back to life.`,

  `As you power on your own terminal and connect it to the ancient interface, the screen flickers once. Then a single line appears:

                    repository: KETHARA-ARCHIVE
                    status: CORRUPTED
                    chapters recovered: 0 / 35
                    
                    awaiting specialist input...

Take a breath. The expedition begins now.`
];

const ARCS = {
  1: { name: "ARC I: THE AWAKENING",      label: "ARC I",   era: "era-0", eraName: "THE ANCIENT ARCHIVE",   icon: "&#9670;" },
  2: { name: "ARC II: PARALLEL HISTORIES",label: "ARC II",  era: "era-0", eraName: "THE ANCIENT ARCHIVE",   icon: "&#9670;" },
  3: { name: "ARC III: THE CONVERGENCE",  label: "ARC III", era: "era-1", eraName: "THE AWAKENED CODEX",     icon: "&#9632;" },
  4: { name: "ARC IV: CRISIS PROTOCOL",   label: "ARC IV",  era: "era-1", eraName: "THE AWAKENED CODEX",     icon: "&#9632;" },
  5: { name: "ARC V: THE DIGITAL ASCENT", label: "ARC V",   era: "era-2", eraName: "THE NEXUS TERMINAL",     icon: "&#9670;" }
};

const CHAPTERS = [

  {
    id: 0,
    arc: 1,
    nodeType: "normal",
    title: "The First Inscription",
    story: "The entrance to the chamber is silent and the air is heavy with dust. We set up our equipment on a stone slab while torchlight reflects off the walls. There are carvings everywhere, but the system is currently dormant. Our team's linguist identified two specific words near the entrance. She explained that before the archive can record any new data, we have to initialize the system to begin tracking.",
    task: "Initialize the repository to begin tracking.",
    xp: 10,
    qType: "terminal",
    command: "git init",
    hint: "Two words. 'git' followed by a word meaning 'to start' or 'initiate'.",
    explanation: `git init creates a hidden folder called .git inside your project directory. This folder is the brain of your version control system — it tracks every change, every commit, and every branch from this point forward. You only need to run it once per project. Without it, Git doesn't know your folder even exists.`,
    example: `$ git init\nInitialized empty Git repository in /project/.git/`,
    fieldNote: { cmd: "git init", desc: "Wake the repository. Run once per project." }
  },

  {
    id: 1,
    arc: 1,
    nodeType: "normal",
    title: "The Observer's Rite",
    story: `The system is active now, though the chamber remains dark. Files are scattered across the workspace, including new documents and others that were modified recently. We have to follow a strict rule inscribed above the entrance: always check the state of the archive before taking action. Acting without checking first could lead to overwriting important history.`,
    task: "Check the current status of the repository.",
    xp: 10,
    qType: "terminal",
    command: "git status",
    hint: "Two words. 'git' followed by a word describing the current state.",
    explanation: `git status is the most frequently used command. It shows you which files are untracked, modified, or staged and ready for a commit. Checking your status regularly helps prevent mistakes.`,
    example: `$ git status\nOn branch main\nUntracked files:\n  history.txt`,
    fieldNote: { cmd: "git status", desc: "Check the current state of files." }
  },

  {
    id: 2,
    arc: 1,
    nodeType: "normal",
    title: "Staging the Fragment",
    story: `In the second room, we found a clay tablet labeled "history.txt" that is warm to the touch. It contains data that the system has not captured yet. The interface does not automatically save every change we make. Instead, we must manually select which fragments to preserve. This process allows us to be intentional about what enters the permanent record.`,
    task: "Add the file 'history.txt' to the staging area.",
    xp: 10,
    qType: "fill",
    template: "git ___ history.txt",
    blanks: ["add"],
    hint: "The blank is a three-letter word meaning 'to include' or 'to place into'.",
    explanation: `git add moves a file into the staging area. Think of the staging area as a preparation zone where you decide exactly what goes into the next commit. This extra step gives you total control over your project's timeline.`,
    example: `$ git add history.txt\n# No output means success.\n# Check with: git status`,
    fieldNote: { cmd: "git add <file>", desc: "Stage a specific file for the next commit." }
  },

  {
    id: 3,
    arc: 1,
    nodeType: "normal",
    title: "The First Snapshot",
    story: `The tablet is staged and ready for the system. Our lead researcher explains that committing a change makes it a permanent part of the timeline. Every saved fragment receives a timestamp and a message explaining why it was preserved. The creators of this place were very clear that every entry must have a stated purpose.`,
    task: "Commit the staged changes with the message 'Recovered fragment'.",
    xp: 10,
    qType: "terminal",
    command: `git commit -m "Recovered fragment"`,
    hint: "Use 'git commit' with the -m flag, then the message in quotes.",
    explanation: `git commit creates a permanent snapshot of your staged changes. The -m flag allows you to add a descriptive message. These commits are the building blocks that form the entire history of the repository.`,
    example: `$ git commit -m "Recovered fragment"\n[main (root-commit) a4f3b2e] Recovered fragment\n 1 file changed, 12 insertions(+)`,
    fieldNote: { cmd: `git commit -m "msg"`, desc: "Snapshot staged changes permanently." }
  },

  {
    id: 4,
    arc: 1,
    nodeType: "normal",
    title: "Stage Everything",
    story: `A new door opens to reveal twelve tablets glowing simultaneously. Manually processing each one would be inefficient. Fortunately, the system includes a shorthand command to stage every modified and new file in the directory at once. This allows us to move much deeper into the archive without wasting time.`,
    task: "Stage ALL files in the current directory at once.",
    xp: 10,
    qType: "choice",
    options: ["git add --all", "git add .", "git add *", "git add -a"],
    answer: "git add .",
    hint: "A single dot represents the current directory in Unix systems.",
    explanation: `git add . is the standard way to stage all new and modified files in your current folder and its subfolders. It is the fastest way to prepare your work before a commit.`,
    example: `$ git add .\n# Stages everything in current directory.\n# Then:\n$ git commit -m "Stage all recovered tablets"`,
    fieldNote: { cmd: "git add .", desc: "Stage ALL changes in current directory." }
  },

  {
    id: 5,
    arc: 1,
    nodeType: "normal",
    title: "Reading the Chronicle",
    story: `Deep in the archive room, we found a wall that functions as a complete history of the chamber. Every action taken here is recorded with a date, a name, and a specific reason. The ancient builders referred to this as the Chronicle. A prominent inscription at the top suggests that understanding the past is the only way to navigate the future effectively.`,
    task: "View the complete commit history of this repository.",
    xp: 10,
    qType: "terminal",
    command: "git log",
    hint: "Think: a written record of events. A ship's ___.",
    explanation: `git log displays all commits in reverse chronological order. Each entry shows the unique commit hash, the author, the date, and the message. This command is essential for reviewing the timeline of your project.`,
    example: `$ git log\ncommit a4f3b2e\nAuthor: You <you@dig.site>\nDate:   Mon Jan 1 09:00:00\n\n    Recovered fragment\n\n$ git log --oneline\na4f3b2e Recovered fragment`,
    fieldNote: { cmd: "git log", desc: "Read the Chronicle. All past commits." }
  },

  {
    id: 6,
    arc: 1,
    nodeType: "normal",
    title: "The Compact View",
    story: `The Chronicle wall is massive and contains thousands of entries. Reading every detail would take far too long, but Lena found a symbol in the corner that reveals a compact version of the record. It displays only one line per entry. The architects clearly designed the system for efficiency when scanning through long periods of history.`,
    task: "Which flags produce a compact, one-line-per-commit log?",
    xp: 10,
    qType: "binary",
    question: "Which command shows the commit log in compact form?",
    options: ["git log --oneline", "git log --short"],
    answer: "git log --oneline",
    hint: "--oneline = one line per commit. Simple.",
    explanation: `git log --oneline shows each commit with just its short hash and message. This is the most useful way to get a quick overview of your project's progress without cluttering the screen.`,
    example: `$ git log --oneline\na4f3b2e Recovered fragment\n3c9d1aa Initialize repository\n\n$ git log --oneline --graph --all\n* a4f3b2e (HEAD -> main) Recovered fragment\n* 3c9d1aa Initialize repository`,
    fieldNote: { cmd: "git log --oneline", desc: "Compact history. One line per commit." }
  },

  {
    id: 7,
    arc: 2,
    nodeType: "branch",
    title: "The Fork in the Stone",
    story: `The passage ahead splits into two tunnels. The eastern tunnel is the stable primary archive, while the western tunnel is marked as an experimental branch. Our team geologist noted that the builders did not work in a single linear sequence. Instead, they created parallel copies of the record to experiment without risking the main archive. We need to create a branch of our own to proceed.`,
    task: "Create a new branch called 'excavation'.",
    xp: 15,
    qType: "terminal",
    command: "git branch excavation",
    hint: "Two words: 'git branch' followed by the name of the new branch.",
    explanation: `git branch <name> creates a new pointer at your current commit. It is important to remember that this command does not switch you to the new branch. It simply marks a new path in the timeline.`,
    example: `$ git branch excavation\n# No output = success.\n\n# To see all branches:\n$ git branch\n* main\n  excavation\n# The * shows your current branch.`,
    fieldNote: { cmd: "git branch <name>", desc: "Create a new branch. Doesn't switch." }
  },

  {
    id: 8,
    arc: 2,
    nodeType: "branch",
    title: "Stepping Through",
    story: `The western tunnel is now visible in the system map, but we are still standing in the main corridor. Creating a branch and entering it are distinct actions. An inscription above the doorway reminds us that to walk a parallel path, we must consciously step away from the main timeline.`,
    task: "Switch to the 'excavation' branch.",
    xp: 10,
    qType: "binary",
    question: "Which command switches to the 'excavation' branch?",
    options: ["git checkout excavation", "git branch switch excavation"],
    answer: "git checkout excavation",
    hint: "The classic command for switching branches uses a word meaning 'to inspect' or 'to retrieve'.",
    explanation: `git checkout <branch> updates your working directory to match the state of the selected branch. You can think of it as physically moving your workspace from one timeline to another.`,
    example: `$ git checkout excavation\nSwitched to branch 'excavation'\n\n# Modern equivalent:\n$ git switch excavation\nSwitched to branch 'excavation'`,
    fieldNote: { cmd: "git checkout <branch>", desc: "Switch to an existing branch." }
  },

  {
    id: 9,
    arc: 2,
    nodeType: "branch",
    title: "One Motion",
    story: `We have been creating and switching branches frequently today. Lena noticed a shorthand command carved into the floor that allows us to perform both actions in a single move. The original specialists seem to have valued speed and reduced repetitive steps whenever possible.`,
    task: "Create AND switch to a new branch called 'deep-scan' in one command.",
    xp: 10,
    qType: "fill",
    template: "git checkout ___ deep-scan",
    blanks: ["-b"],
    hint: "A single flag. The letter 'b' stands for 'branch'.",
    explanation: `git checkout -b <name> is a very common shortcut that creates a branch and switches to it immediately. This is much faster than running the 'branch' and 'checkout' commands separately.`,
    example: `$ git checkout -b deep-scan\nSwitched to a new branch 'deep-scan'\n\n# Or modern syntax:\n$ git switch -c deep-scan\nSwitched to a new branch 'deep-scan'`,
    fieldNote: { cmd: "git checkout -b <name>", desc: "Create + switch in one move." }
  },

  {
    id: 10,
    arc: 2,
    nodeType: "normal",
    title: "The Name Convention",
    story: `Our team found a master index that lists every branch known to this sector. Interestingly, the primary branch has two different names carved from different time periods. An older inscription uses the term "master," while a newer one uses "main." Our historian believes this represents a shift in standard conventions that occurred late in the civilization's history.`,
    task: "What is the modern default branch name in Git?",
    xp: 10,
    qType: "binary",
    question: "Modern Git default branch name:",
    options: ["main", "master"],
    answer: "main",
    hint: "GitHub changed the default in October 2020.",
    explanation: `While older repositories still use 'master', 'main' is now the standard default for new projects on most platforms. Both are just labels, but 'main' is the convention used in modern development.`,
    example: `# Rename master to main:\n$ git branch -m master main\n\n# Set default for new repos (Git 2.28+):\n$ git config --global init.defaultBranch main`,
    fieldNote: { cmd: "main vs master", desc: "Modern default is 'main'. Older repos use 'master'." }
  },

  {
    id: 11,
    arc: 2,
    nodeType: "normal",
    title: "The Correct Sequence",
    story: `We have entered a training chamber where the walls display the fundamental sequence of operations. This three step process is something every Ledger Specialist must master before moving deeper into the Archive. Currently, the carvings are scrambled as a test for anyone who enters. A stone inscription on the floor warns that order is everything and that deviating from the sequence will cause the system to reject our input.`,
    task: "Arrange the Git workflow steps in the correct order.",
    xp: 15,
    qType: "sort",
    items: ["git push", "git add .", "git commit -m 'msg'"],
    answer: ["git add .", "git commit -m 'msg'", "git push"],
    hint: "Stage first, snapshot second, send to remote last.",
    explanation: `The core Git workflow always follows this pattern: (1) git add to stage your changes, (2) git commit to save a permanent snapshot, and (3) git push to send those commits to the remote server. Reversing these steps or skipping one will break the chain of history.`,
    example: `# The fundamental sequence:\n$ git add .\n$ git commit -m "Add recovery data"\n$ git push origin main`,
    fieldNote: { cmd: "add -> commit -> push", desc: "The fundamental sequence. Always in this order." }
  },

  {
    id: 12,
    arc: 2,
    nodeType: "normal",
    title: "Branch Inventory",
    story: `We are now deep within the branch network and it is easy to get lost in these parallel corridors. The Repository contains dozens of branches, including some that are active and others that date back centuries. To navigate successfully, we need a map of the entire system. We found a command inscribed on the ceiling that allows us to list every known branch in existence.`,
    task: "List ALL branches, including remote-tracking ones.",
    xp: 10,
    qType: "choice",
    options: ["git branch -a", "git branch --list", "git log --branches", "git branch -all"],
    answer: "git branch -a",
    hint: "The flag -a stands for 'all'. Not '--all', just '-a'.",
    explanation: `The standard git branch command only shows local branches. By adding the -a flag, you can see every branch available, including remote-tracking branches like origin/main. This gives you a full view of the work happening across the entire project.`,
    example: `$ git branch -a\n* excavation\n  main\n  remotes/origin/main\n  remotes/origin/feature-x`,
    fieldNote: { cmd: "git branch -a", desc: "List ALL branches, local + remote." }
  },

  {
    id: 13,
    arc: 3,
    nodeType: "normal",
    title: "The Central Nexus",
    story: `The tunnels eventually lead into a vast central chamber known as the Nexus. Here, the stone walls are embedded with pulsing circuits and teal light. This area serves as the ancient remote server for the civilization. To move forward, we must identify our connection to this machine and see exactly where our local terminal is anchored.`,
    task: "List all remote connections and their URLs.",
    xp: 10,
    qType: "fill",
    template: "git remote ___",
    blanks: ["-v"],
    hint: "The flag means 'verbose' — show more detail.",
    explanation: `git remote -v lists all configured remote connections along with their specific URLs. This allows you to verify where your code is being sent when you push or where it is coming from when you fetch.`,
    example: `$ git remote -v\norigin  https://github.com/you/repo.git (fetch)\norigin  https://github.com/you/repo.git (push)`,
    fieldNote: { cmd: "git remote -v", desc: "See all remote connections + their URLs." }
  },

  {
    id: 14,
    arc: 3,
    nodeType: "normal",
    title: "Downloading Without Merging",
    story: `The Nexus contains data from other teams who have been working on the Archive. Before we integrate their work into our own timeline, we need to download their progress and review it. Our lead researcher suggests a cautious approach: we should receive the data from the remote without immediately merging it into our active branch.`,
    task: "Download remote changes without merging them.",
    xp: 10,
    qType: "binary",
    question: "Which command downloads remote changes WITHOUT merging?",
    options: ["git fetch", "git pull"],
    answer: "git fetch",
    hint: "Fetch brings the data. Pull brings AND integrates.",
    explanation: `git fetch downloads the latest changes from the remote repository but does not change your local files. This allows you to inspect what others have done before you decide to merge their work into your own.`,
    example: `$ git fetch origin\nFrom https://github.com/you/repo\n   a4f3b2e..c7d9f11  main -> origin/main\n\n# Now inspect before merging:\n$ git log origin/main --oneline`,
    fieldNote: { cmd: "git fetch", desc: "Download remote changes. Don't merge yet." }
  },

  {
    id: 15,
    arc: 3,
    nodeType: "normal",
    title: "Integrating the Data",
    story: `After reviewing the downloaded data, our team has decided it is safe to integrate. We are now ready to perform a full integration using a command that both fetches and merges the remote information in a single motion. This was a standard daily practice for the specialists who originally managed the Nexus.`,
    task: "Fetch AND merge the remote 'main' branch into your current branch.",
    xp: 10,
    qType: "terminal",
    command: "git pull origin main",
    hint: "Pull, then the remote name, then the branch name.",
    explanation: `git pull is a combination of fetch and merge. It brings down the remote data and immediately integrates it into your current branch. It is a good habit to pull frequently to stay in sync with your team.`,
    example: `$ git pull origin main\nUpdating a4f3b2e..c7d9f11`,
    fieldNote: { cmd: "git pull", desc: "Fetch + merge. Integrate remote changes." }
  },

  {
    id: 16,
    arc: 3,
    nodeType: "normal",
    title: "Sending Your Work",
    story: `We have completed several important recoveries in our local timeline and it is now time to share that work with the rest of the expedition. The Nexus is ready to receive our data. By transmitting our local record to the remote Archive, we ensure that the entire team has access to the latest findings.`,
    task: "Push your local commits to the 'origin' remote on the 'main' branch.",
    xp: 10,
    qType: "terminal",
    command: "git push origin main",
    hint: "Push, then remote name, then branch name.",
    explanation: `git push sends your local commit history to a remote server. This is how you share your progress with others. If the remote has new changes you haven't pulled yet, the system will ask you to pull before you can push.`,
    example: `$ git push origin main`,
    fieldNote: { cmd: "git push origin main", desc: "Send local commits to remote." }
  },

  {
    id: 17,
    arc: 3,
    nodeType: "normal",
    title: "Command Identification",
    story: `A stone panel in the chamber shows four remote commands, but the descriptions have faded over time. To properly maintain the connection to the Nexus, we must identify the specific role of each command. Mistaking one for another could cause issues with how our data is synchronized.`,
    task: "Match each Git remote command to what it actually does.",
    xp: 20,
    qType: "match",
    pairs: [
      { left: "git fetch",  right: "Downloads remote changes, no merge" },
      { left: "git pull",   right: "Downloads AND merges into current branch" },
      { left: "git push",   right: "Uploads local commits to remote" },
      { left: "git clone",  right: "Copies an entire repository locally" }
    ],
    hint: "Think: fetch = download only. pull = download + integrate. push = upload. clone = full copy.",
    explanation: `These four commands are the foundation of working with remotes. Fetch allows for inspection, pull updates your work, push shares your work, and clone creates a starting point from an existing project.`,
    example: `$ git clone https://url.com/repo.git`,
    fieldNote: { cmd: "fetch / pull / push / clone", desc: "The four pillars of remote work." }
  },

  {
    id: 18,
    arc: 3,
    nodeType: "merge",
    title: "Two Paths Become One",
    story: `The work on our excavation branch is finally complete and the data is clean. It is time for the Convergence, where we rejoin our parallel timeline with the primary archive. The chamber walls glow as we prepare to integrate the histories. This is a critical moment that specialists have performed for thousands of years.`,
    task: "Merge the 'excavation' branch into your current branch.",
    xp: 15,
    qType: "terminal",
    command: "git merge excavation",
    hint: "Two words: 'git merge' followed by the branch name.",
    explanation: `git merge integrates the changes from another branch into the one you are currently using. If the branches have diverged, the system will create a merge commit to tie the two histories together.`,
    example: `$ git checkout main\n$ git merge excavation`,
    fieldNote: { cmd: "git merge <branch>", desc: "Bring another branch's history into current." }
  },

  {
    id: 19,
    arc: 3,
    nodeType: "merge",
    title: "The Glitch Markers",
    story: `A conflict has been detected because two specialists modified the same section of a file at the same time. The machine cannot determine which version is correct and has paused for our intervention. The file is now marked with specific symbols to show us exactly where the disagreement lies. We must identify these markers before we can resolve the conflict manually.`,
    task: "Click ALL lines that are Git conflict markers in this file.",
    xp: 20,
    qType: "conflict",
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
    explanation: `Git uses three markers to show a conflict. The top section shows your current version, and the bottom section shows the version you are trying to merge. To fix it, you must remove these markers and edit the code to your preference, then add and commit the result.`,
    example: `# After editing the file to resolve:\n$ git add recovery.txt\n$ git commit -m "Resolve merge conflict in recovery"\n\n# Or abort the merge entirely:\n$ git merge --abort`,
    fieldNote: { cmd: "<<<<<<< / ======= / >>>>>>>", desc: "Conflict markers. Edit file, then add + commit." }
  },

  {
    id: 20,
    arc: 4,
    nodeType: "normal",
    title: "The Anomaly",
    story: `An alarm sounds throughout the Nexus. A slow corruption is spreading through the Repository. It is not catastrophic yet, but it is persistent. Files are being modified without authorization and commits are appearing with incorrect messages. Our team lead has called for an immediate halt to all work. We need to investigate the cause without losing the progress we have made so far. She asks if we are ready to implement the stash protocol.`,
    task: "Temporarily save your uncommitted changes without committing them.",
    xp: 10,
    qType: "binary",
    question: "Which command hides work temporarily?",
    options: ["git stash", "git save"],
    answer: "git stash",
    hint: "Think of a hidden compartment. A supply ___.",
    explanation: `git stash temporarily shelves your uncommitted changes, giving you a clean working directory. These changes are saved to a stack rather than the permanent history. This is perfect for switching tasks quickly without losing half finished work.`,
    example: `$ git stash\nSaved working directory and index state WIP on main`,
    fieldNote: { cmd: "git stash", desc: "Hide uncommitted work safely. Restore later." }
  },

  {
    id: 21,
    arc: 4,
    nodeType: "normal",
    title: "Reclaiming the Work",
    story: `The investigation is complete and the corruption has been neutralized. It was caused by a rogue process that has now been removed from the system. With the all clear signal given, it is time to restore our hidden work and resume the mission. Our stashed changes are still preserved in the machine's memory, exactly as they were when we shelved them.`,
    task: "Restore the most recent stashed changes AND remove them from the stash stack.",
    xp: 10,
    qType: "choice",
    options: ["git stash pop", "git stash apply", "git stash restore", "git stash get"],
    answer: "git stash pop",
    hint: "Pop applies the stash AND removes it from the stack. Apply keeps it in the stack.",
    explanation: `git stash pop applies the most recent stash and simultaneously deletes it from your stash list. If you want to apply changes but keep the backup in your stash for later use, you would use git stash apply instead.`,
    example: `$ git stash pop\nDropped stash@{0}`,
    fieldNote: { cmd: "git stash pop", desc: "Restore stash + remove it from stack." }
  },

  {
    id: 22,
    arc: 4,
    nodeType: "normal",
    title: "The Premature Commit",
    story: `During the chaos of the crisis, a junior specialist accidentally committed a half finished file. The message is incorrect and the code is incomplete. Fortunately, the commit is only a few minutes old and no one else has pulled it into their own workspace yet. We can undo the mistake, but we must be careful to move the work back into a staged state rather than deleting it entirely.`,
    task: "Undo the last commit but keep the changes staged.",
    xp: 15,
    qType: "choice",
    options: ["git reset --soft HEAD~1", "git reset --hard HEAD~1", "git revert HEAD", "git commit --undo"],
    answer: "git reset --soft HEAD~1",
    hint: "--soft moves the commit pointer back but keeps your files staged. --hard DESTROYS the changes.",
    explanation: `git reset --soft moves the branch pointer back to a previous commit but leaves your changes in the staging area. This allows you to fix a mistake or rewrite a commit message before trying again. The HEAD~1 notation specifically refers to the commit immediately before the current one.`,
    example: `$ git reset --soft HEAD~1\n# Your changes are back in the staging area.`,
    fieldNote: { cmd: "git reset --soft HEAD~1", desc: "Undo last commit. Keep changes staged." }
  },

  {
    id: 23,
    arc: 4,
    nodeType: "normal",
    title: "The Risk Assessment",
    story: `The team has discovered a problematic commit deeper in the Repository history. We are debating the best way to handle it. One specialist suggests a hard reset for an immediate fix, but another argues for a method that creates a clear reversal record. Our team lead wants to know which approach is safer for a shared branch where others may have already synchronized their work.`,
    task: "Which command safely reverses a PUSHED commit without rewriting history?",
    xp: 15,
    qType: "choice",
    options: ["git revert HEAD", "git reset --hard HEAD~1", "git undo HEAD", "git rollback"],
    answer: "git revert HEAD",
    hint: "Revert creates a NEW commit that undoes the old one. History is preserved.",
    explanation: `git revert creates a new commit that is the exact inverse of a previous one. This is the safest way to undo changes on public or shared branches because it does not rewrite the history. Using a reset on shared branches can cause significant issues for other team members.`,
    example: `$ git revert HEAD\n[main b2c4f9a] Revert "Bad commit message"`,
    fieldNote: { cmd: "git revert HEAD", desc: "Safe undo for pushed commits. Creates new commit." }
  },

  {
    id: 24,
    arc: 4,
    nodeType: "normal",
    title: "The Metaphor Matrix",
    story: `In the crisis protocol chamber, a training construct from the Nexus presents a calibration test. It projects a series of Git commands alongside blank spaces. Our task is to match each command to the real world metaphors the original architects used to explain the system. They wanted these concepts to be intuitive for everyone, regardless of their technical background.`,
    task: "Match each Git concept to its real-world metaphor.",
    xp: 20,
    qType: "match",
    pairs: [
      { left: "git stash",  right: "Locking unfinished work in a drawer" },
      { left: "git commit", right: "Taking a photograph of the current state" },
      { left: "git branch", right: "Making a photocopy to experiment on" },
      { left: "git revert", right: "Writing a correction note in the margin" }
    ],
    hint: "Stash = temporary hiding spot. Commit = permanent snapshot. Branch = safe copy. Revert = visible correction.",
    explanation: `Using metaphors helps clarify the intent of each command. Stashing is like putting work in a drawer for later. A commit is like a permanent photograph of your project. Branching is like making a photocopy to test ideas safely. Reverting is like adding a visible correction to a document without erasing the original error.`,
    example: `# Stash: "I will hide this for now."\n# Commit: "I am recording this state forever."`,
    fieldNote: { cmd: "Metaphors", desc: "Stash=drawer, Commit=photo, Branch=copy, Revert=errata" }
  },

  {
    id: 25,
    arc: 5,
    nodeType: "normal",
    title: "The Threshold",
    story: `Beyond the Nexus lies a door of polished black glass embedded in the rock. An electric blue glow outlines the frame, and the inscription above it translates to a surprisingly modern phrase about a digital ascent. As we step through, the stone walls vanish and are replaced by structures of pure light and data. It seems the original civilization eventually moved their entire existence into the system itself, leaving this repository behind for those capable of reaching it.`,
    task: "Clean up: delete the now-merged local 'excavation' branch.",
    xp: 10,
    qType: "fill",
    template: "git branch ___ excavation",
    blanks: ["-d"],
    hint: "The lowercase -d flag is for safe deletion of merged branches.",
    explanation: `git branch -d <name> deletes a local branch only if it has been fully merged into your current branch. This safety feature prevents you from accidentally losing work. If you need to force-delete a branch that hasn't been merged, you would use a capital -D instead.`,
    example: `$ git branch -d excavation\nDeleted branch excavation`,
    fieldNote: { cmd: "git branch -d <name>", desc: "Safely delete a merged local branch." }
  },

  {
    id: 26,
    arc: 5,
    nodeType: "normal",
    title: "The Reference Log",
    story: `The digital realm has its own set of risks. A specialist who entered before us performed a hard reset and accidentally erased several important commits. They believe the data is gone forever, but in this environment, nothing is truly deleted. The system maintains a secret record of every movement of the HEAD pointer, even after resets or rebases. There is always a way to recover lost history if you know where to look.`,
    task: "View the reference log showing every HEAD movement, including resets.",
    xp: 15,
    qType: "terminal",
    command: "git reflog",
    hint: "The command combines the words 'reference' and 'log'.",
    explanation: `git reflog is the ultimate safety net in Git. It records every time your HEAD pointer moves, such as during checkouts, commits, or resets. Even if you perform a hard reset, the previous commit hashes remain in the reflog for a limited time, allowing you to restore your project to its previous state.`,
    example: `$ git reflog\na4f3b2e HEAD@{0}: reset: moving to HEAD~1`,
    fieldNote: { cmd: "git reflog", desc: "The safety net that records all HEAD movements." }
  },

  {
    id: 27,
    arc: 5,
    nodeType: "merge",
    title: "The Linear History",
    story: `The lead architect of the Repository presents us with a question about how history should be recorded. When two timelines converge, we can either leave a visible fork in the record or rewrite the story so it appears as a single linear sequence. While both methods are valid, the architect notes that creating a clean, straight line requires more precision and care.`,
    task: "Which command rewrites commits to sit atop another branch for a linear history?",
    xp: 15,
    qType: "binary",
    question: "For a clean linear history, use:",
    options: ["git rebase main", "git merge main"],
    answer: "git rebase main",
    hint: "Think of moving the 'base' of your work onto a new foundation.",
    explanation: `git rebase takes the commits from your current branch and 'replays' them on top of another branch. This results in a much cleaner, linear project history without merge commits. However, you should never rebase branches that have already been shared with other people, as it rewrites commit hashes.`,
    example: `$ git checkout feature\n$ git rebase main`,
    fieldNote: { cmd: "git rebase", desc: "Rewrite commits onto a new base for a linear history." }
  },

  {
    id: 28,
    arc: 5,
    nodeType: "normal",
    title: "The Tag Protocol",
    story: `We have reached a chamber where the civilization recorded their major milestones. These are not just standard commits, but specific moments in time given human-readable names. These markers represent the day the Repository first went live or when a major crisis was finally resolved. The architects believed that certain achievements deserve a permanent place in the record.`,
    task: "Tag the current commit as version 'v1.0'.",
    xp: 10,
    qType: "terminal",
    command: "git tag v1.0",
    hint: "Use the tag command followed by the version name.",
    explanation: `git tag <name> creates a pointer to a specific point in your history, usually used to mark release points like v1.0 or v2.0. Unlike branches, tags do not move when you make new commits. They are permanent markers for important versions of your project.`,
    example: `$ git tag v1.0\n# To see all tags: git tag`,
    fieldNote: { cmd: "git tag <name>", desc: "Create a permanent marker for a specific version." }
  },

  {
    id: 29,
    arc: 5,
    nodeType: "normal",
    title: "Interactive Sorting",
    story: `Before we can enter the inner sanctum, we must pass one final knowledge test. The digital architect presents us with a professional workflow used by the original specialists. The steps are currently out of order, and we must restore them to prove we understand how to manage a production-level mission from start to finish.`,
    task: "Arrange the advanced Git workflow in the correct order.",
    xp: 25,
    qType: "sort",
    items: ["git push origin feature", "git checkout -b feature", "git rebase main", "git add .", "git commit -m 'done'"],
    answer: ["git checkout -b feature", "git add .", "git commit -m 'done'", "git rebase main", "git push origin feature"],
    hint: "Start by creating a branch, then work and commit before cleaning up the history.",
    explanation: `The professional workflow involves creating a new branch for each feature, committing your work, and then rebasing onto the main branch to ensure your history remains clean and linear before you push your changes to the remote server.`,
    example: `$ git checkout -b feature-a\n$ git add .\n$ git commit -m "Finish feature"\n$ git rebase main\n$ git push origin feature-a`,
    fieldNote: { cmd: "Professional Workflow", desc: "The standard sequence for feature development." }
  },

  {
    id: 30,
    arc: 5,
    nodeType: "normal",
    title: "Ignoring the Noise",
    story: `The Repository contains more than just essential code. It is often cluttered with machine-generated files, logs, and temporary data that should not be tracked. The ancient architects used a specific manifest to tell the system which files to ignore. This creates a clear boundary between the work we want to preserve and the background noise of the digital environment.`,
    task: "What is the name of the file that tells Git which files to ignore?",
    xp: 10,
    qType: "choice",
    options: [".gitignore", ".git-ignore", "git.ignore", ".ignore"],
    answer: ".gitignore",
    hint: "It is a hidden file starting with a dot followed by the word 'ignore'.",
    explanation: `A .gitignore file is a plain text file where you list the names of files and folders that Git should ignore. This prevents your repository from becoming bloated with unnecessary files like compiled code or local configuration settings.`,
    example: `# Inside .gitignore:\nnode_modules/\n*.log`,
    fieldNote: { cmd: ".gitignore", desc: "A manifest used to exclude files from tracking." }
  },

  {
    id: 31,
    arc: 5,
    nodeType: "normal",
    title: "The Configuration Rite",
    story: `Every commit in the Repository carries a signature including a name and email address. However, our current terminal has not been configured yet. The digital architect explains that before we can contribute to the Chronicle, the system must know our identity. We need to set our global configuration so that every future record we create is properly attributed to us.`,
    task: "What command sets your Git username globally?",
    xp: 10,
    qType: "fill",
    template: `git config ___ user.name "Your Name"`,
    blanks: ["--global"],
    hint: "Use a flag that ensures this setting applies to every repository on your machine.",
    explanation: `The git config --global command allows you to set your identity for all projects on your computer. It is one of the first things you should do when setting up Git, as it ensures your name and email are attached to your commits.`,
    example: `$ git config --global user.name "Rainier-PS"`,
    fieldNote: { cmd: "git config --global", desc: "Set your identity for all Git projects." }
  },

  {
    id: 32,
    arc: 5,
    nodeType: "normal",
    title: "Inspecting a Commit",
    story: `The architect flags a specific commit from the distant past that may be related to the corruption we found earlier. The log only shows us the basic message, but we need to see the actual changes. We need to inspect every line that was added or removed in that specific snapshot to understand what the original specialist was trying to achieve.`,
    task: "View the detailed changes introduced by a specific commit.",
    xp: 15,
    qType: "choice",
    options: ["git show a4f3b2e", "git diff a4f3b2e", "git log -p a4f3b2e", "git inspect a4f3b2e"],
    answer: "git show a4f3b2e",
    hint: "The command name implies you want the system to display the commit details.",
    explanation: `git show displays both the metadata of a commit and the full diff of the changes made. This is the fastest way to see exactly what happened in a single commit without having to compare multiple versions manually.`,
    example: `$ git show a4f3b2e`,
    fieldNote: { cmd: "git show <hash>", desc: "View the full details and diff of a specific commit." }
  },

  {
    id: 33,
    arc: 5,
    nodeType: "normal",
    title: "Finding the Culprit",
    story: `We have narrowed down the source of the corruption to a single line in a file, but that file has been edited by many different people over the years. We need to find out who was the last person to modify that specific line. The architect gestures to a command that will annotate the file, showing us the author and date for every single line of code.`,
    task: "Which command shows which commit last modified each line of a file?",
    xp: 15,
    qType: "binary",
    question: "To see who last changed each line in a file:",
    options: ["git blame recovery.txt", "git log recovery.txt"],
    answer: "git blame recovery.txt",
    hint: "The command name suggests you are trying to find who is responsible for a change.",
    explanation: `git blame provides a line by line breakdown of a file, showing the commit hash and author for every modification. It is an essential tool for debugging and understanding the history of a specific piece of code.`,
    example: `$ git blame recovery.txt`,
    fieldNote: { cmd: "git blame <file>", desc: "Identify who last modified each line in a file." }
  },

  {
    id: 34,
    arc: 5,
    nodeType: "merge",
    title: "The Final Sequence",
    story: `We have reached the final chamber of the Kethara Repository. The digital architect presents a terminal of light and the ultimate challenge: we must demonstrate complete mastery of the Git workflow. This final sequence represents the heartbeat of the entire system. Once we prove we can move from an empty workspace to a fully shared project in the correct order, the Repository will be fully restored.`,
    task: "Arrange the COMPLETE professional Git workflow in order.",
    xp: 30,
    qType: "sort",
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
    explanation: `The full professional cycle begins with cloning a repository and creating a new branch for your work. You then stage and commit your changes locally before pushing them to the remote server so the rest of your team can access them.`,
    example: `$ git clone [url]\n$ git checkout -b feature\n$ git add .\n$ git commit -m "message"\n$ git push origin feature`,
    fieldNote: { cmd: "Full Workflow", desc: "The complete cycle from cloning to pushing changes." }
  },

  /* NEW CHAPTERS — continuing the story after the Repository is restored */

  {
    id: 35,
    arc: 5,
    nodeType: "normal",
    title: "The Aftermath",
    story: `The Repository pulses with a steady rhythm now that the full workflow has been completed. The digital architect acknowledges our work but warns us that restoring a repository is only the beginning. Every day in a real project, things change. New files are created, old ones are deleted, and sometimes you need to see exactly what you modified before deciding whether to commit it at all. The architect points to a command carved into the floor that compares your current state against your last commit.`,
    task: "See what has changed in your working directory since the last commit.",
    xp: 10,
    qType: "terminal",
    command: "git diff",
    hint: "The command name literally means the difference between two states.",
    explanation: `git diff shows the exact lines that have been added or removed in your working directory since the last commit, but only for files that are not yet staged. If you want to compare what is staged against the last commit, use git diff --staged. This is extremely useful before committing, as it lets you review your changes one more time.`,
    example: `$ git diff\n# Shows unstaged changes.\n\n$ git diff --staged\n# Shows staged changes vs last commit.\n\n$ git diff main..feature\n# Compares two branches.`,
    fieldNote: { cmd: "git diff", desc: "Show what changed since the last commit." }
  },

  {
    id: 36,
    arc: 5,
    nodeType: "normal",
    title: "The Unstaging Protocol",
    story: `A junior specialist on our team accidentally staged a configuration file that contains sensitive access credentials. The file was not supposed to be included in the next commit at all. We need to remove it from the staging area without deleting the file itself from disk. The architect explains that the system has a specific mechanism for precisely this situation.`,
    task: "Remove 'secrets.txt' from the staging area without deleting the file.",
    xp: 10,
    qType: "fill",
    template: "git restore ___ secrets.txt",
    blanks: ["--staged"],
    hint: "You want to restore the staged version back to unstaged. The flag specifies the area.",
    explanation: `git restore --staged <file> removes a file from the staging area and puts it back in your working directory as an unstaged change. The file itself is untouched on disk. This is the modern equivalent of git reset HEAD <file>, which still works but is considered older syntax.`,
    example: `$ git restore --staged secrets.txt\n# File is back to unstaged state.\n# Verify with:\n$ git status`,
    fieldNote: { cmd: "git restore --staged <file>", desc: "Unstage a file without touching it on disk." }
  },

  {
    id: 37,
    arc: 5,
    nodeType: "normal",
    title: "Discarding Local Changes",
    story: `We spent the last hour editing a translation file, trying to decode a section of the ancient inscriptions. The results were wrong and made things worse. The file is not staged and has not been committed. There is a clean version from the last commit that we need to restore. Rather than manually undoing every change, the system allows us to discard all local modifications to a specific file instantly.`,
    task: "Discard all local changes to 'translation.txt' and restore the last committed version.",
    xp: 10,
    qType: "terminal",
    command: "git restore translation.txt",
    hint: "Restore the file to its last committed state. Just the filename, no flags needed.",
    explanation: `git restore <file> discards all uncommitted changes to a specific file, reverting it to the state it was in at the last commit. This is permanent for those changes since they were never committed. Use it carefully. It replaces the older git checkout -- <file> syntax.`,
    example: `$ git restore translation.txt\n# All changes to translation.txt are gone.\n# The file now matches the last commit.`,
    fieldNote: { cmd: "git restore <file>", desc: "Discard local changes and restore last committed state." }
  },

  {
    id: 38,
    arc: 5,
    nodeType: "normal",
    title: "The Amend Protocol",
    story: `We just committed a recovery record and immediately noticed two problems. The commit message has a typo, and we forgot to include one small file. Fortunately, no one has pulled our commit yet. The architect shows us a way to fix the most recent commit by amending it, which absorbs the new staged change and allows us to rewrite the message in one operation.`,
    task: "Which flag allows you to modify the most recent commit?",
    xp: 10,
    qType: "binary",
    question: "To fix the last commit (message or files), use:",
    options: ["git commit --amend", "git commit --fix"],
    answer: "git commit --amend",
    hint: "The word 'amend' means to make corrections to something.",
    explanation: `git commit --amend opens your editor to rewrite the last commit message and also absorbs anything currently in the staging area into that commit. It is a clean way to fix a small mistake immediately after committing. Important: never amend a commit that has already been pushed and shared with others, as it rewrites history.`,
    example: `# Fix the message only:\n$ git commit --amend -m "Correct message here"\n\n# Add a forgotten file to the last commit:\n$ git add forgotten.txt\n$ git commit --amend --no-edit`,
    fieldNote: { cmd: "git commit --amend", desc: "Rewrite the last commit. Never on shared branches." }
  },

  {
    id: 39,
    arc: 5,
    nodeType: "normal",
    title: "Stash With a Name",
    story: `The expedition has grown in complexity and we now have several different pieces of unfinished work that need to be shelved at different times. Plain stash entries with no label are difficult to tell apart. The architect reveals that the system allows us to save a stash with a descriptive message so we can identify each one when we need to retrieve it later.`,
    task: "Stash your current changes with the message 'wip: decoder fix'.",
    xp: 10,
    qType: "terminal",
    command: `git stash push -m "wip: decoder fix"`,
    hint: "Use git stash push with the -m flag followed by a message in quotes.",
    explanation: `git stash push -m "message" saves your changes to the stash stack with a descriptive label. When you run git stash list later, you will see this message next to the entry, making it much easier to find the right stash when you have multiple ones saved at the same time.`,
    example: `$ git stash push -m "wip: decoder fix"\nSaved working directory and index state On main: wip: decoder fix\n\n$ git stash list\nstash@{0}: On main: wip: decoder fix`,
    fieldNote: { cmd: `git stash push -m "msg"`, desc: "Save a stash with a descriptive label." }
  },

  {
    id: 40,
    arc: 5,
    nodeType: "branch",
    title: "The Rename",
    story: `One of our working branches was created with a temporary name during an emergency earlier in the expedition. Now that the situation has stabilised, the name no longer reflects the purpose of the work. Rather than deleting the branch and recreating it, the system allows us to rename it in place, preserving the entire commit history attached to it.`,
    task: "Rename the current branch from 'emergency-fix' to 'scanner-repair'.",
    xp: 10,
    qType: "fill",
    template: "git branch ___ scanner-repair",
    blanks: ["-m"],
    hint: "The flag stands for 'move', which is how Unix systems rename things.",
    explanation: `git branch -m <new-name> renames the branch you are currently on. If you want to rename a branch you are not currently on, use git branch -m <old-name> <new-name>. After renaming, if the old branch was tracking a remote, you will need to push with the new name and delete the old remote branch separately.`,
    example: `# Rename current branch:\n$ git branch -m scanner-repair\n\n# Rename any branch:\n$ git branch -m emergency-fix scanner-repair`,
    fieldNote: { cmd: "git branch -m <name>", desc: "Rename the current branch in place." }
  },

  {
    id: 41,
    arc: 5,
    nodeType: "normal",
    title: "Searching the Archive",
    story: `We need to find every location in the codebase where a specific function name was used. The files are scattered across dozens of directories and searching manually would take days. The architect reveals that the system has a built-in search tool that scans every tracked file for a given pattern, returning the file name and line number for each match. It is far faster than any manual approach.`,
    task: "Search all tracked files for the text 'recoverSector'.",
    xp: 10,
    qType: "terminal",
    command: "git grep recoverSector",
    hint: "It works like a standard grep but only searches files tracked by Git.",
    explanation: `git grep <pattern> searches the contents of all tracked files for a given string or regular expression. It is much faster than running a general grep on a large project because it only searches files Git knows about. Add -n to show line numbers, or -l to show only file names.`,
    example: `$ git grep recoverSector\nrecovery.js:12: function recoverSector() {\nindex.js:4:   recoverSector();\n\n# Show line numbers:\n$ git grep -n recoverSector`,
    fieldNote: { cmd: "git grep <pattern>", desc: "Search tracked files for a string or pattern." }
  },

  {
    id: 42,
    arc: 5,
    nodeType: "normal",
    title: "Cherry Picking",
    story: `The scanner-repair branch has twelve commits. Most of them are experimental and not ready for the main timeline. However, there is one specific commit in the middle of that branch that contains a critical bug fix we need immediately. We do not want to merge the entire branch yet. The architect points to a technique that allows us to copy a single specific commit onto our current branch without touching the rest.`,
    task: "Apply only the commit 'a4f3b2e' to the current branch.",
    xp: 15,
    qType: "terminal",
    command: "git cherry-pick a4f3b2e",
    hint: "The command name describes selecting one specific item from a collection.",
    explanation: `git cherry-pick <hash> copies a specific commit from anywhere in the repository and applies it as a new commit on your current branch. The original commit remains where it was. This is useful when you need one specific fix without bringing along unrelated changes from another branch.`,
    example: `$ git cherry-pick a4f3b2e\n[main c9d2f11] Apply critical fix\n 1 file changed, 3 insertions(+)`,
    fieldNote: { cmd: "git cherry-pick <hash>", desc: "Copy one specific commit to the current branch." }
  },

  {
    id: 43,
    arc: 5,
    nodeType: "normal",
    title: "Bisect: The Time Search",
    story: `The corruption in the Repository introduced itself at some unknown point in the past. The commit log shows hundreds of entries and we cannot check them all by hand. The architect describes a method the original specialists used to locate the exact commit where a problem was introduced. It works by cutting the history in half repeatedly, asking us to test each midpoint, until it isolates the single commit responsible.`,
    task: "Match each bisect command to the correct step in the process.",
    xp: 20,
    qType: "match",
    pairs: [
      { left: "git bisect start",    right: "Begins the binary search session" },
      { left: "git bisect bad",      right: "Marks the current commit as broken" },
      { left: "git bisect good v1.0",right: "Marks a known working commit" },
      { left: "git bisect reset",    right: "Ends the session and returns to HEAD" }
    ],
    hint: "Think about the order: start, declare the bad point, declare the good point, then clean up when done.",
    explanation: `git bisect performs a binary search through your commit history to find the exact commit that introduced a bug. You start the session, mark a bad commit and a known good one, then test each midpoint Git checks out for you, calling it good or bad until it finds the culprit. It can narrow down hundreds of commits in just a few steps.`,
    example: `$ git bisect start\n$ git bisect bad\n$ git bisect good v1.0\n# Git checks out the midpoint.\n# Test your code, then:\n$ git bisect good  # or bad\n# Repeat until Git prints the guilty commit.\n$ git bisect reset`,
    fieldNote: { cmd: "git bisect", desc: "Binary search to find which commit introduced a bug." }
  },

  {
    id: 44,
    arc: 5,
    nodeType: "merge",
    title: "The Final Record",
    story: `The Repository is fully restored. Every corrupted sector has been recovered, every broken branch reconnected, and every missing commit found. The digital architect stands before us one last time, not with a test but with a question about philosophy. The civilization that built this place understood one truth above all others: a commit message is not a formality. It is a message to the next person who reads the record, whether that person is a colleague, a stranger, or your own future self three months from now. We have one final sequence to arrange, ensuring that the correct workflow is sealed into the Archive as a permanent lesson.`,
    task: "Arrange these commit message guidelines from most important to least important.",
    xp: 30,
    qType: "sort",
    items: [
      "Explain WHY the change was made",
      "Use imperative tense: 'Fix bug', not 'Fixed bug'",
      "Keep the subject line under 50 characters",
      "Add a body paragraph for complex changes"
    ],
    answer: [
      "Use imperative tense: 'Fix bug', not 'Fixed bug'",
      "Keep the subject line under 50 characters",
      "Explain WHY the change was made",
      "Add a body paragraph for complex changes"
    ],
    hint: "Format comes first, then content. The subject line is the most visible part of any commit.",
    explanation: `A well-written commit message is one of the most valuable habits a developer can build. The subject line should be short and use the imperative mood so it reads as an instruction. The most important content is the reason behind the change, not just what changed, because the diff already shows the what. For complex commits, a body paragraph adds the context that future developers will need.`,
    example: `# Good commit message format:\n\nFix memory leak in sector recovery loop\n\nThe recovery function was holding references to\ncompleted tablet objects, preventing garbage\ncollection. This caused the process to consume\nan extra 200MB over a 24-hour run.\n\n# Bad:\n$ git commit -m "fixed stuff"`,
    fieldNote: { cmd: "Commit message style", desc: "Imperative, short subject, explain the WHY." }
  }

];