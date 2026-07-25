# Sebastian-Style Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. **Task 5 is an exception — see its header note.**

**Goal:** Restyle the already-deployed portfolio site (`index.html`, `style.css`, `mediaqueries.css`) to match the visual format of the reference site (Sebastian Soto's portfolio) — monochrome color system, his sizing/breakpoints, tile-style experience section, and image-bearing project cards — while keeping Cristian's real content and the accessibility fixes already in place.

**Architecture:** CSS-variable-driven color swap (one `:root` edit propagates everywhere), a `mediaqueries.css` rewrite to match the reference's three breakpoints, and two structural HTML+CSS changes (experience tiles, project card images). No new files except four placeholder project SVGs. No build step, no framework — same plain HTML/CSS/JS approach as the original build.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript (untouched by this plan). No npm, no frameworks, no build tools.

## Global Constraints

- No build tools, no frameworks, no npm dependencies — plain HTML/CSS/JS only.
- All asset paths stay relative (`./assets/...`) — GitHub Pages root deploy.
- **Do not regress the accessibility fixes already in place:** `.menu-links` visibility toggle (keyboard/screen-reader trap fix), `<main>` landmark + `<h2>` section headings (hero keeps its `<h1>`), `aria-label`s on both `<nav>` elements, sticky nav, `section { scroll-margin-top: 17vh }`. This redesign is a visual layer on top of that structure, not a wholesale copy of the reference site's HTML/CSS.
- Do not fabricate skill-proficiency labels — the reference site's "Intermediate"/"Basic" text has no basis in Cristian's real data and must not appear.
- Do not collapse the 4 skill categories (Languages/Frameworks/Databases/Tools) into the reference's 2 (Skills/Programming Languages) — keep Cristian's real category breakdown.
- Do not add "Live Demo" buttons — none of the 4 projects are deployed; each project card keeps its single GitHub/View Code button.
- Exact reference values (pulled from the live site's CSS on 2026-07-25, not reconstructed from memory) are given verbatim in each task below — use them exactly except where a task explicitly calls out an adaptation and why.
- No placeholder/lorem-ipsum content in any text field — only the four new project SVGs are placeholder *graphics* (explicitly scoped as swappable stand-ins, per the approved spec).
- Repo: already deployed to GitHub Pages from `main`. Work happens directly on `main` (no worktree) per the user's explicit request to watch changes land in real time — this was already the working mode for the tail end of the original build.

---

## Task 1: Color system — monochrome swap

**Files:**
- Modify: `style.css` (the `:root` block only)

**Interfaces:**
- Produces: no new interface — this task only changes the *values* of the existing `--color-text`, `--color-accent`, `--color-accent-dark` custom properties already consumed by every other rule in `style.css` (nav hover, focus outline, buttons, section__text__p2, experience-sub-title, project-card hover/heading, details-container icon). No other file needs to change for the color swap to take full effect.

- [ ] **Step 1: Update the three color variables in `style.css`'s `:root` block**

Current block (style.css lines 5-15):
```css
:root {
  --color-bg: #f3f3f3;
  --color-card: #ffffff;
  --color-text: #141414;
  --color-text-secondary: #555555;
  --color-border: #a3a3a3;
  --color-accent: #2563eb;
  --color-accent-dark: #1d4ed8;
  --font-heading: "Poppins", sans-serif;
  --font-body: "Open Sans", sans-serif;
}
```

Replace with:
```css
:root {
  --color-bg: #f3f3f3;
  --color-card: #ffffff;
  --color-text: #000000;
  --color-text-secondary: #555555;
  --color-border: #a3a3a3;
  --color-accent: rgb(53, 53, 53);
  --color-accent-dark: rgb(0, 0, 0);
  --font-heading: "Poppins", sans-serif;
  --font-body: "Open Sans", sans-serif;
}
```

Note: `--color-bg`, `--color-card`, `--color-text-secondary`, `--color-border` are unchanged — they already match the reference site's equivalent values (`#f3f3f3`, white, `rgb(85,85,85)`, `rgb(163,163,163)`). Only `--color-text` (now pure black), `--color-accent` (now dark grey, replacing blue), and `--color-accent-dark` (now pure black, the hover state) change.

- [ ] **Step 2: Verify the swap propagated correctly**

Run:
```bash
cd ~/Portafolio-Cristian
grep -n "color-accent\|color-text:" style.css | head -5
grep -c "#2563eb\|#1d4ed8\|#141414" style.css
```
Expected: first command shows the new `rgb(...)`/`#000000` values in the `:root` block; second command prints `0` (no leftover old hex values anywhere in the file).

Then visually confirm in the browser (server already running at http://localhost:8000/, or start one with `python3 -m http.server 8000`): nav-link hover, the "Full-Stack Software Engineer" tagline, both hero buttons, the "Skills" sub-headings, and project-card hover borders/titles are all grey/black now — no blue anywhere on the page.

- [ ] **Step 3: Commit**

```bash
cd ~/Portafolio-Cristian
git add style.css
git commit -m "Redesign: swap blue accent for monochrome grey/black palette"
```

---

## Task 2: Sizing and breakpoints

**Files:**
- Modify: `style.css` (`.nav-links` font-size, `.btn` sizing)
- Modify: `mediaqueries.css` (full rewrite — new breakpoints)

**Interfaces:**
- Consumes: `--color-bg` custom property from Task 1's `:root` (used nowhere new here, just noting the file is already updated).
- No new class names introduced. Existing classes (`.section__pic-container`, `.title`, `.about-containers`, `.experience-details-container`, `.projects-container`, `.btn-container`, `.contact-info-upper-container`) get new breakpoint values, matched to the reference where the site's structure allows, adapted where it doesn't (see Step 3 note on the phone-tier pic sizing).

- [ ] **Step 1: Widen `.nav-links` font-size in `style.css`**

Find (style.css, in the `/* NAV */` block):
```css
.nav-links {
  gap: 2rem;
  list-style: none;
  font-size: 1.25rem;
}
```
Change `font-size: 1.25rem;` to `font-size: 1.5rem;` (matches the reference exactly).

- [ ] **Step 2: Switch `.btn` to fixed-width sizing in `style.css`**

Find (style.css, in the `/* BUTTONS */` block):
```css
.btn {
  font-weight: 600;
  padding: 0.9rem 1.5rem;
  border-radius: 2rem;
  border: 0.1rem solid var(--color-text);
  cursor: pointer;
  display: inline-block;
}
```
Replace with:
```css
.btn {
  font-weight: 600;
  padding: 1rem;
  width: 8rem;
  border-radius: 2rem;
  border: 0.1rem solid var(--color-text);
  cursor: pointer;
  display: inline-block;
  text-align: center;
}
```
(Added `text-align: center` since a fixed-width button with a longer label like "Download Resume" needs its text centered rather than left-aligned — the reference site doesn't need this explicitly because its default text alignment already centers inline-block content in its layout, but ours should be explicit.)

Note: because our global `* { box-sizing: border-box }` (style.css line 17-21) makes `width: 8rem` include padding and border, this may render tighter than the reference (which doesn't set `box-sizing: border-box` globally). If "Download Resume" wraps awkwardly across two lines when you check it in the browser in Step 4, increase `.btn`'s `width` in small increments (e.g. to `9rem`, then `10rem`) until the label fits on one line without breaking the pill look — note whatever final value you land on in your report.

- [ ] **Step 3: Rewrite `mediaqueries.css` with the reference's three breakpoints**

Replace the entire file contents with:
```css
@media screen and (max-width: 1400px) {
  #profile {
    margin-bottom: 6rem;
  }

  .about-containers {
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1200px) {
  #desktop-nav {
    display: none;
  }

  #hamburger-nav {
    display: flex;
  }

  section {
    margin: 0 5%;
  }

  .section__pic-container {
    width: 275px;
    height: 275px;
  }

  .about-containers {
    margin-top: 0;
  }
}

@media screen and (max-width: 600px) {
  #profile {
    gap: 2rem;
    min-height: fit-content;
    padding: 4vh 0;
    margin-bottom: 0;
  }

  .section__pic-container,
  .section__pic-container img {
    width: 46vw;
    height: 46vw;
  }

  .title {
    font-size: 2rem;
  }

  .section__text__p2 {
    font-size: 1.25rem;
  }

  .logo {
    font-size: 1.5rem;
  }

  .about-containers,
  .experience-details-container,
  .projects-container {
    grid-template-columns: 1fr;
  }

  .about-containers {
    flex-direction: column;
  }

  .btn-container,
  .contact-info-upper-container {
    flex-wrap: wrap;
  }
}
```

Note on the phone-tier profile picture (the `.section__pic-container` rule in the `max-width: 600px` block): the reference site uses `width: auto; height: 46vw;` there, relying on its `.section__pic-container img { max-width: 100%; max-height: 100%; }` rule to preserve a roughly-square photo's aspect ratio. Our `.section__pic-container img` rule instead uses `width: 100%; height: 100%;` (style.css line 216-217, unchanged by this task) — with an `auto`-width parent that rule is ambiguous. Using `width: 46vw; height: 46vw;` (an explicit square) instead achieves the same visual result — a viewport-scaled circular photo — without needing to also change the image-fill rule. This is an intentional, documented adaptation, not a deviation to flag.

- [ ] **Step 4: Verify at all three breakpoints**

Run:
```bash
cd ~/Portafolio-Cristian
python3 -m http.server 8000 &
sleep 1
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:8000/
```
Expected: `200`.

Then in the browser (DevTools device toolbar), check at widths ~1300px (1400px tier), ~1000px (1200px tier — hamburger nav should appear), and ~375px (600px tier — profile picture should be a viewport-scaled circle, single-column grids, hero buttons should not wrap mid-word). Confirm nothing overlaps or overflows horizontally at any width. Adjust `.btn` width per Step 2's note if needed.
Then: `kill %1`

- [ ] **Step 5: Commit**

```bash
cd ~/Portafolio-Cristian
git add style.css mediaqueries.css
git commit -m "Redesign: match reference site's sizing and breakpoints"
```

---

## Task 3: Experience section — tile format

**Files:**
- Modify: `index.html` (all 15 `<article>` entries inside `<section id="experience">`)
- Modify: `style.css` (`.article-container` and its children, in the `/* EXPERIENCE */` block)

**Interfaces:**
- Consumes: the existing 4 `.details-container` category cards (Languages/Frameworks/Databases/Tools) from the original build — unchanged, only their *contents* change shape.
- No new class names — `.article-container`, `article`, `.icon` are reused, just restyled.

- [ ] **Step 1: Change each skill's HTML from `<span>` to a `<div><h3>` wrapper**

In `index.html`, inside `<section id="experience">`, every skill entry currently looks like:
```html
<article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Python</span></article>
```
Change to:
```html
<article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><div><h3>Python</h3></div></article>
```

Apply this same `<span>Name</span>` → `<div><h3>Name</h3></div>` change to all 15 entries, preserving each name exactly:
- Languages: Python, C, JavaScript, SQL, Bash
- Frameworks: Flask, Node.js, React
- Databases: MySQL, SQLite, MongoDB
- Tools: Git & GitHub, Docker, VS Code, GDB

(Do not add a proficiency `<p>` line under the `<h3>` — per the Global Constraints, there's no real data to back one.)

- [ ] **Step 2: Restyle `.article-container` and its children in `style.css`**

Find (style.css, `/* EXPERIENCE */` block):
```css
.article-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: left;
}

.article-container article {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.article-container .icon {
  height: 1.1rem;
  margin-bottom: 0;
  flex-shrink: 0;
}
```
Replace with:
```css
.article-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1.25rem;
  justify-content: center;
  text-align: initial;
}

.article-container article {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.article-container article h3 {
  font-size: 0.95rem;
  font-weight: 400;
}

.article-container .icon {
  height: 1.1rem;
  margin-bottom: 0;
  flex-shrink: 0;
}
```

Note: the reference site's tiles use a fixed `width: 10rem` per skill inside two wide category columns spanning most of the page. Our layout keeps Cristian's real 4-category breakdown (narrower per-category cards in a grid, not 2 wide columns), so a fixed `10rem` tile width would overflow or badly under-fill those narrower cards. Letting each tile size to its content (icon + name) and wrap within its category card achieves the same "wrapping tile" visual concept from the reference without breaking the narrower-card layout — this is an intentional adaptation, not a deviation to flag.

Also find, in the same block, the existing grid definition:
```css
.experience-details-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}
```
Change `minmax(240px, 1fr)` to `minmax(280px, 1fr)` — gives each category card a bit more room now that its contents wrap in two dimensions instead of stacking as a single column.

- [ ] **Step 3: Verify all 15 skills still render correctly**

Run:
```bash
cd ~/Portafolio-Cristian
for skill in Python Flask MySQL Docker GDB; do grep -c "$skill" index.html; done
grep -c "<h3>Python</h3>" index.html
```
Expected: five non-zero counts from the first loop; the second command prints `1`.

Then visually confirm in the browser: each of the 4 skill category cards shows its skills as wrapping icon+name tiles (not a vertical list), and no proficiency text appears anywhere.

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css
git commit -m "Redesign: restyle experience section skills as wrapping tiles"
```

---

## Task 4: Projects section — card images and subtitles

**Files:**
- Create: `assets/projects/threatscope.svg`
- Create: `assets/projects/hbnb.svg`
- Create: `assets/projects/task-manager.svg`
- Create: `assets/projects/simple-shell.svg`
- Modify: `index.html` (all 4 `.project-card` blocks inside `<section id="projects">`)
- Modify: `style.css` (`.project-card` and new `.project-card-img`/`.project-card-subtitle` rules, in the `/* PROJECTS */` block)

**Interfaces:**
- Produces: `assets/projects/` directory, four placeholder SVG images — explicitly scoped as swappable stand-ins for real screenshots later (same filenames, same `<img>` slot, no future HTML/CSS change needed to swap them).
- Produces: `.project-card-img`, `.project-card-subtitle` CSS classes, self-contained to this task.

- [ ] **Step 1: Create `assets/projects/threatscope.svg`** (network/radar motif)

```bash
mkdir -p assets/projects
```

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220"><rect width="400" height="220" fill="#f3f3f3"/><circle cx="200" cy="110" r="70" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><circle cx="200" cy="110" r="45" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><circle cx="200" cy="110" r="20" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><circle cx="200" cy="110" r="4" fill="rgb(53,53,53)"/><circle cx="260" cy="70" r="5" fill="rgb(53,53,53)"/><circle cx="130" cy="150" r="5" fill="rgb(53,53,53)"/><circle cx="270" cy="150" r="5" fill="rgb(53,53,53)"/><line x1="200" y1="110" x2="260" y2="70" stroke="rgb(53,53,53)" stroke-width="1.5"/><line x1="200" y1="110" x2="130" y2="150" stroke="rgb(53,53,53)" stroke-width="1.5"/><line x1="200" y1="110" x2="270" y2="150" stroke="rgb(53,53,53)" stroke-width="1.5"/></svg>
```

- [ ] **Step 2: Create `assets/projects/hbnb.svg`** (house/listing motif)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220"><rect width="400" height="220" fill="#f3f3f3"/><polygon points="200,55 280,110 280,170 120,170 120,110" fill="none" stroke="rgb(53,53,53)" stroke-width="3"/><rect x="185" y="130" width="30" height="40" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><rect x="140" y="120" width="24" height="24" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><rect x="236" y="120" width="24" height="24" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/></svg>
```

- [ ] **Step 3: Create `assets/projects/task-manager.svg`** (checklist motif)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220"><rect width="400" height="220" fill="#f3f3f3"/><rect x="110" y="60" width="180" height="100" rx="8" fill="none" stroke="rgb(53,53,53)" stroke-width="2.5"/><rect x="128" y="80" width="14" height="14" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><line x1="152" y1="87" x2="255" y2="87" stroke="rgb(53,53,53)" stroke-width="2"/><rect x="128" y="105" width="14" height="14" fill="rgb(53,53,53)"/><polyline points="131,112 135,116 141,107" fill="none" stroke="#f3f3f3" stroke-width="2"/><line x1="152" y1="112" x2="255" y2="112" stroke="rgb(53,53,53)" stroke-width="2"/><rect x="128" y="130" width="14" height="14" fill="none" stroke="rgb(53,53,53)" stroke-width="2"/><line x1="152" y1="137" x2="230" y2="137" stroke="rgb(53,53,53)" stroke-width="2"/></svg>
```

- [ ] **Step 4: Create `assets/projects/simple-shell.svg`** (terminal motif)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220"><rect width="400" height="220" fill="#f3f3f3"/><rect x="90" y="50" width="220" height="130" rx="10" fill="none" stroke="rgb(53,53,53)" stroke-width="2.5"/><line x1="90" y1="75" x2="310" y2="75" stroke="rgb(53,53,53)" stroke-width="2"/><circle cx="108" cy="62" r="4" fill="rgb(53,53,53)"/><circle cx="122" cy="62" r="4" fill="rgb(53,53,53)"/><circle cx="136" cy="62" r="4" fill="rgb(53,53,53)"/><polyline points="112,100 132,115 112,130" fill="none" stroke="rgb(53,53,53)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><line x1="142" y1="130" x2="180" y2="130" stroke="rgb(53,53,53)" stroke-width="3" stroke-linecap="round"/></svg>
```

- [ ] **Step 5: Add image and subtitle to each project card in `index.html`**

For each of the 4 `.project-card` blocks in `<section id="projects">`, add an `<img>` as the first child and a `<h4 class="project-card-subtitle">` right after the existing `<h3>` title. The four cards, in order:

```html
      <div class="project-card">
        <img src="./assets/projects/threatscope.svg" alt="" class="project-card-img" />
        <h3>ThreatScope</h3>
        <h4 class="project-card-subtitle">NIDS Dashboard</h4>
        <p>Real-time network intrusion detection dashboard built with two other developers. Monitors live network traffic and visualizes cybersecurity threats.</p>
        <p class="project-tech">React · FastAPI · WebSockets · SQLite · Docker</p>
        <a href="https://github.com/MicaelVR04/ThreatScope" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
      <div class="project-card">
        <img src="./assets/projects/hbnb.svg" alt="" class="project-card-img" />
        <h3>HBnB</h3>
        <h4 class="project-card-subtitle">Airbnb Clone</h4>
        <p>Airbnb-style full-stack web app. Users can create accounts, list properties, and browse available places, with backend logic managing users, places, and reviews.</p>
        <p class="project-tech">Python · Flask · SQLite · RESTful APIs</p>
        <a href="https://github.com/CristianAce05/holbertonschool-hbnb" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
      <div class="project-card">
        <img src="./assets/projects/task-manager.svg" alt="" class="project-card-img" />
        <h3>Task Manager</h3>
        <h4 class="project-card-subtitle">Task Management App</h4>
        <p>Full-stack task management app with secure authentication, full CRUD task management, search/filtering, and dark mode.</p>
        <p class="project-tech">React (Vite) · Node/Express · Supabase · JWT · Docker</p>
        <a href="https://github.com/CristianAce05/task-manager_app_project" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
      <div class="project-card">
        <img src="./assets/projects/simple-shell.svg" alt="" class="project-card-img" />
        <h3>Simple Shell</h3>
        <h4 class="project-card-subtitle">Unix Shell</h4>
        <p>Custom Unix command-line interpreter capable of executing basic shell commands, implementing command parsing and process execution.</p>
        <p class="project-tech">C · Linux system calls (fork, execve, wait) · GCC</p>
        <a href="https://github.com/CristianAce05/holbertonschool-shell" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
```
(`alt=""` on each project image — the card's own `<h3>` title immediately conveys the same information, so the image is decorative in accessibility terms, consistent with how the checkmark icons elsewhere on the page are already handled.)

- [ ] **Step 6: Restyle `.project-card` and add the two new classes in `style.css`**

Find (style.css, `/* PROJECTS */` block):
```css
.project-card {
  background: var(--color-card);
  border: 0.1rem solid var(--color-border);
  border-radius: 1.5rem;
  padding: 1.75rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  border-color: var(--color-accent);
}

.project-card h3 {
  color: var(--color-accent);
}
```
Replace with:
```css
.project-card {
  background: var(--color-card);
  border: 0.1rem solid var(--color-border);
  border-radius: 1rem;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
}

.project-card h3 {
  color: var(--color-text);
  font-size: 1.5rem;
}

.project-card-img {
  width: calc(100% + 3rem);
  margin: -1.5rem -1.5rem 0.5rem;
  border-radius: 1rem 1rem 0 0;
  height: auto;
  max-height: 200px;
  object-fit: cover;
}

.project-card-subtitle {
  color: var(--color-text-secondary);
  font-weight: 400;
  font-size: 1rem;
}
```

(`.project-card-img` uses a negative margin equal to the card's own padding so the image spans edge-to-edge at the top of the card despite the card having padding on all sides — this reproduces the reference site's "full-bleed image at the top of a padded card" look without needing a separate no-padding wrapper element. Text alignment changes from `text-align: left` to `text-align: center` to match the reference's centered card content; `.project-tech` and the `.btn` inside `.project-card` don't need explicit centering changes since they already inherit from their container or have their own `display` rules.)

Also check the existing rule further down in the same block:
```css
.project-card .btn {
  align-self: flex-start;
  margin-top: auto;
  width: fit-content;
}
```
Change `align-self: flex-start;` to `align-self: center;` and remove `width: fit-content;` (the `.btn` class already has a fixed `width: 8rem` from Task 2 — an explicit `fit-content` here would fight that). Resulting rule:
```css
.project-card .btn {
  align-self: center;
  margin-top: auto;
}
```

- [ ] **Step 7: Verify images and layout**

Run:
```bash
cd ~/Portafolio-Cristian
ls -la assets/projects/
grep -c "project-card-img" index.html
grep -c "project-card-subtitle" index.html
```
Expected: four `.svg` files listed; both grep commands print `4`.

Then visually confirm in the browser: all four project cards show a top image, a centered title, a grey subtitle line, the tech-stack line, and a centered "View Code" button; hovering a card lifts it with a shadow.

- [ ] **Step 8: Commit**

```bash
cd ~/Portafolio-Cristian
git add assets/projects/ index.html style.css
git commit -m "Redesign: add project card images and subtitles"
```

---

## Task 5: Final polish pass — ui-ux-pro-max review

> **This task is executed by the controller session directly, not dispatched as a standard implementer subagent.** It requires live design judgment and interactive approval from the user before any change is applied — the same reasoning that kept the original build's GitHub Pages step out of the subagent loop. Skip this task's dispatch/review/fix-loop machinery entirely; just do the work described below in the main session after Tasks 1-4 are complete, reviewed, and merged.

**Files:** whichever of `style.css`/`mediaqueries.css`/`index.html` the approved suggestions touch — not knowable in advance, hence no fixed file list.

- [ ] **Step 1:** With the local dev server running and Tasks 1-4 complete, invoke the `ui-ux-pro-max` skill against the finished redesign — color system, spacing/type scale, project cards, experience tiles — looking specifically for improvements beyond a straight copy of the reference site (contrast refinement, hover/motion polish, spacing consistency). Constraints: must respect `prefers-reduced-motion: reduce` (already defined in `style.css`) and the existing keyboard-accessibility requirements (visible `:focus-visible`, no regression to the `<main>`/heading/nav-label structure from the final review).
- [ ] **Step 2:** Present whatever the skill suggests to the user before applying anything — same pattern as the original build's font-pairing/accent-color review. Do not apply changes the user hasn't approved.
- [ ] **Step 3:** Apply only the approved changes, verify visually in the browser at desktop/tablet/phone widths, and commit with a message describing what changed and why (e.g. `git commit -m "Polish: <specific change> per ui-ux-pro-max review"`).

---

## Final Verification

After all 5 tasks: full visual pass at desktop (~1440px), tablet (~1000px), and phone (~375px) widths; keyboard tab-through of the experience tiles and project cards to confirm nothing new fell out of the tab order; confirm no console errors in the browser; confirm the live GitHub Pages site matches once pushed. No automated test suite (static site, consistent with the original build) — this manual pass is the verification, same as it was for the original 9-task build.
