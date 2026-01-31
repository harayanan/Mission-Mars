# Changelog

All notable changes to Mission Mars are documented here.

---

## [v3.0] — 2026-01-31

### Added

#### Badge & Achievement System
- 12 earnable badges: Water Wise, Budget Boss, Insurance Pro, Scam Spotter, Market Maven, Diversity Champion, Compound King, SIP Star, Speed Demon, Quiz Master, Perfect Score, Early Bird
- Badges earned through gameplay decisions, quiz performance, and speed
- Badge grid display on recap and certificate screens
- Speed Demon badge for answering quiz in under 5 seconds

#### New Interactive Mini-Games
- **Needs vs Wants sorting game** in Challenge 1: drag/tap 12 items into Needs or Wants categories with animated feedback
- **Inflation impact table** in Challenge 5: visual comparison of how ₹100 loses purchasing power over 10/20/30 years
- **Early vs Late investor comparison** in Challenge 7: side-by-side chart showing starting at 15 vs 25
- **SIP growth chart** in Challenge 8: animated bar chart showing SIP returns over 5/10/15/20/25 years
- **Market crash scenarios** in Challenge 8: historical Sensex crash and recovery data (2008, 2020, 2022)

#### Timed Quiz System
- Quiz timer bar with 15-second countdown and visual progress
- Speed bonus (+10 points) for answers under 5 seconds
- Timer animation with color transition (green → red)

#### Expanded Content & Research
- Deeper financial lessons with real HDFC Mutual Fund program context
- 15 curated "Did You Know?" bonus facts (up from 8)
- More detailed real-world Indian financial examples
- Enhanced narrative dialogue with richer character interactions
- ~4,400 lines of code (up from ~2,150 in V2), zero external dependencies

#### UI Enhancements
- New CSS styles for mini-games: `.nw-game`, `.nw-item`, `.inflation-table`, `.sip-chart`, `.badge-grid`, `.badge-item`
- Emotion scenario cards and comparison cards
- Step indicators for multi-part challenges
- Next steps section on certificate screen
- New animations: `slideRight`, `flipIn`, `popIn`

### Changed
- Game engine rewritten with badge system integration and mini-game renderers
- Challenge phases now include `badgeId` linking to earnable badges
- Quiz system upgraded from simple modal to timed challenge with speed tracking
- Game data expanded from ~635 lines to ~1,800+ lines with richer content

---

## [v2.0] — 2026-01-30

### Added

#### Multi-File Web App Architecture
- Split into 4 files: `index.html` (shell), `styles.css` (design system), `game-data.js` (content), `game-engine.js` (logic)
- ~2,150 lines of code, zero external dependencies

#### Deep Teaching Content (30+ minutes of engagement)
- 3 intro/briefing screens before challenges begin (mission story, mission parameters, "why financial literacy")
- Each of the 8 challenges now has 3 stages: Intro Story → Interactive Decision → Feedback + Lesson + Real-World Connection + Quiz
- 8 bonus quizzes (one per challenge) with explanations and bonus points
- Detailed real-world examples using Indian Rupee amounts (₹500 SIP, ₹1 crore compounding math, etc.)
- Financial concepts taught in depth: 50/30/20 budgeting rule, Rule of 72, rupee cost averaging, inflation vs returns, concentration risk, Ponzi scheme anatomy, asset allocation, SEBI verification

#### Interactive Elements
- Animated starfield canvas (replaces static CSS dots from V1)
- Avatar selection during onboarding (6 options)
- Dialogue bubble system for narrative (Mission Control, AI Companion, other kids)
- Interactive slider with live bottle visualization and day-survival counter
- Multi-select investment grid with staggered animated winner/loser reveals
- Compounding bar chart with sequential growth animation
- Modal-based quiz system with instant correct/wrong feedback and explanations
- Toast notifications for bonus points
- Floating score popup animation on points earned
- Optional sound effects toggle (correct/wrong/click/points via Web Audio API)

#### Navigation & Back Buttons
- Back button on name entry screen (returns to landing)
- Back/Continue bottom nav bar on all story and challenge briefing screens
- Inline "← Back to briefing" button on challenge interaction screens
- Back button on recap screen
- Full progress rail with numbered step indicators showing completed/current/upcoming challenges

#### UI & Polish
- Top HUD bar with avatar, player name, water bar, score counter, and mission day
- Stat grid showing mission parameters (10 days, 2/day supply, etc.)
- Day timeline visualization (green = water supplied, red = no water)
- Certificate of Achievement with date, rank, player name, and score
- Score-based rank system: Trainee → Rookie → Cadet → Commander → Legend
- Confetti canvas animation on mission completion
- Mobile-safe bottom nav with `env(safe-area-inset-bottom)` padding

#### Content Structure Per Challenge
1. Narrative intro with space-themed scenario and character dialogue
2. Interactive decision point (slider, multiple choice, or grid selection)
3. Outcome feedback card (good/warn/bad with contextual explanation)
4. Detailed financial lesson box with bolded key concepts
5. Real-world connection box with Indian context and rupee examples
6. Random "Did You Know?" bonus fact from curated list
7. Optional bonus quiz with 4 choices, explanation, and bonus points

#### Teaching Flow
| Challenge | Mars Scenario | Financial Concept | Day |
|-----------|--------------|-------------------|-----|
| 1 | Water Budgeting | Budgeting, 50/30/20 rule | 1 |
| 2 | Peer Pressure at Station | Follow your own plan, lifestyle inflation | 3 |
| 3 | Cosmo the Space Dog | Insurance (health, life, vehicle) | 4 |
| 4 | The Water Scam | Ponzi schemes, fraud red flags, SEBI | 5 |
| 5 | Mars Companies | Equity vs Fixed Deposits, asset allocation | 6 |
| 6 | 9 Mars Industries | Mutual funds, diversification, fund managers | 7 |
| 7 | The Magic Plant | Compounding, Rule of 72, start early | 8 |
| 8 | Water Market Prices | SIP, rupee cost averaging, time in market | 9 |

### Changed
- Game title renamed from "MARS" to "Mission Mars" on landing screen
- Landing title font size adjusted to accommodate longer name (52px → 42px, 42px → 34px on small screens)

---

## [v1.0] — 2026-01-30

### Added
- Single-file HTML prototype (`V1/index.html`) — zero dependencies, works offline
- 8 interactive challenges with space-themed scenarios using water bottles as currency
- Challenge types: slider input, multiple choice, multi-select grid
- Points system (800 max) with 4 score-based titles (Cadet → Legend)
- Water bottle visualization tracking resources across challenges
- Real-life money lesson revealed after every challenge
- Animated starfield background (CSS-based)
- Mars planet CSS animation on landing screen
- Confetti animation on game completion
- Full recap screen summarizing all 8 financial concepts
- Certificate screen with player name and rank
- Mobile-first responsive design (max 480px container)
- Self-contained — no server, no build step, no dependencies
