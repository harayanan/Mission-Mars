# CLAUDE.md - Mission-Mars

## Project Purpose

Financial literacy educational game where players navigate Mars colonization challenges while learning personal finance concepts. Features 3 progressive versions with increasing complexity.

**Started**: August 2024 | **Status**: Complete (3 versions)

## Tech Stack

- Vanilla HTML, CSS, JavaScript (no frameworks, no build process)
- No package manager or dependencies

## Architecture

```
Mission-Mars/
├── V1/
│   └── index.html         # Version 1 — single-file prototype
├── V2/
│   ├── index.html         # Version 2 — modular structure
│   ├── styles.css         # Extracted CSS
│   ├── game-data.js       # Game content/challenges data
│   └── game-engine.js     # Game logic engine
├── V3/
│   ├── index.html         # Version 3 — most complete
│   ├── styles.css         # Enhanced styling
│   ├── game-data.js       # Expanded game data
│   └── game-engine.js     # Improved game engine
├── index.html             # Root entry (likely redirects to latest)
└── README.md              # Project documentation
```

## Version History

- **V1**: Single HTML file prototype with embedded CSS/JS
- **V2**: Modular structure with separated CSS, data, and engine files
- **V3**: Most complete version with expanded content and improved gameplay

## Game Design

- 8 financial challenges themed around Mars colonization
- Topics: budgeting, investing, risk management, emergency funds
- Progressive difficulty through challenges
- Score tracking and decision consequences

## Development

Open any version's `index.html` directly in a browser. No build step, no server, no dependencies.
