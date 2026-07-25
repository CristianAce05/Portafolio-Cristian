# Portfolio Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Cristian Acevedo's single-page portfolio site (`index.html`, `style.css`, `mediaqueries.css`, `script.js`) in the `Portafolio-Cristian` repo, ready to deploy on GitHub Pages.

**Architecture:** Plain static HTML/CSS/JS, no build step. One `index.html` with six anchor-linked sections (Hero, About, Experience, Projects, Contact, Footer), styled with CSS custom properties for a grey/white base + blue accent palette, with a small `script.js` for the mobile hamburger menu. All content is hardcoded (no CMS/backend).

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox, grid), vanilla JavaScript. Google Fonts (Poppins for headings, Open Sans for body) via `@import`. No npm, no frameworks, no build tools.

## Global Constraints

- No build tools, no frameworks, no npm dependencies — plain HTML/CSS/JS only, per spec.
- Deploy target is GitHub Pages serving directly from the repo root — all asset paths must be relative (`./assets/...`), never absolute.
- Base palette: background `#f3f3f3`, text `#141414`, secondary text `#555555`, accent `#2563eb` (blue), accent hover `#1d4ed8` — defined once as CSS custom properties in `style.css` and reused everywhere (no hardcoded hex outside `:root`). Validated against ui-ux-pro-max's portfolio design-system recommendation (exact accent match).
- Fonts: Poppins (weights 400/500/600) for headings/nav/buttons, Open Sans (weights 300/400/600) for body copy — "Modern Professional" pairing, via Google Fonts `@import`, `sans-serif` fallback. Body text uses `line-height: 1.6`.
- Keyboard/accessibility: all interactive elements (nav links, hamburger toggle, buttons) must be reachable and operable via keyboard, with a visible `:focus-visible` outline in the accent color. `.menu-links` must be a real `<ul>` (not a `<div>` holding bare `<li>`s) — invalid HTML breaks screen readers.
- Respect `prefers-reduced-motion: reduce` — transitions/transforms (hamburger animation, project-card hover lift) must be disabled for users who request it.
- No phone number anywhere on the page — contact methods are email, LinkedIn, GitHub only.
- No placeholder/lorem-ipsum content — every piece of copy comes from the approved spec (`docs/superpowers/specs/2026-07-24-portfolio-site-design.md`).
- Repo: `https://github.com/CristianAce05/Portafolio-Cristian.git`, already cloned to `~/Portafolio-Cristian`, currently has one commit (the design spec).

---

## Task 1: HTML skeleton, CSS reset, and nav

**Files:**
- Create: `index.html`
- Create: `style.css`
- Create: `mediaqueries.css` (empty placeholder, filled in Task 8)
- Create: `script.js` (empty placeholder, filled in Task 8)

**Interfaces:**
- Produces: section anchors `#profile`, `#about`, `#experience`, `#projects`, `#contact` that all later tasks fill in and that nav links (`.nav-links a[href="#..."]`) target.
- Produces: CSS custom properties `--color-bg`, `--color-card`, `--color-text`, `--color-text-secondary`, `--color-border`, `--color-accent`, `--color-accent-dark` on `:root`, reused by every later CSS task.
- Produces: global function name `toggleMenu()` referenced by the hamburger `onclick`/`onkeydown` here, implemented in Task 8 (must toggle `aria-expanded` on `.hamburger-icon` in addition to the `open` class).

- [ ] **Step 1: Create `index.html` with full page skeleton**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Cristian Acevedo | Full-Stack Software Engineer</title>
  <link rel="stylesheet" href="./style.css" />
  <link rel="stylesheet" href="./mediaqueries.css" />
</head>
<body>
  <nav id="desktop-nav">
    <div class="logo">Cristian Acevedo</div>
    <div>
      <ul class="nav-links">
        <li><a href="#about">About</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>
  <nav id="hamburger-nav">
    <div class="logo">Cristian Acevedo</div>
    <div class="hamburger-menu">
      <div
        class="hamburger-icon"
        role="button"
        tabindex="0"
        aria-label="Toggle menu"
        aria-expanded="false"
        onclick="toggleMenu()"
        onkeydown="if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggleMenu(); }"
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="menu-links">
        <li><a href="#about" onclick="toggleMenu()">About</a></li>
        <li><a href="#experience" onclick="toggleMenu()">Experience</a></li>
        <li><a href="#projects" onclick="toggleMenu()">Projects</a></li>
        <li><a href="#contact" onclick="toggleMenu()">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section id="profile"></section>

  <section id="about"></section>

  <section id="experience"></section>

  <section id="projects"></section>

  <section id="contact"></section>

  <footer>
    <p>Copyright &#169; 2026 Cristian Acevedo. All Rights Reserved.</p>
  </footer>

  <script src="./script.js"></script>
</body>
</html>
```

- [ ] **Step 2: Create empty placeholder files for CSS/JS filled in later**

```bash
touch mediaqueries.css script.js
```

- [ ] **Step 3: Create `style.css` with font import, reset, CSS variables, nav, and section base rules**

```css
/* GENERAL */

@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&family=Open+Sans:wght@300;400;600&display=swap");

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

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  line-height: 1.6;
  background-color: var(--color-bg);
  color: var(--color-text);
}

h1,
h2,
h3,
.logo,
.nav-links,
.menu-links,
.btn {
  font-family: var(--font-heading);
}

p {
  color: var(--color-text-secondary);
}

a,
.btn {
  transition: all 300ms ease;
}

a {
  color: var(--color-text);
  text-decoration: none;
}

a:hover {
  color: var(--color-accent);
}

:focus-visible {
  outline: 0.15rem solid var(--color-accent);
  outline-offset: 0.2rem;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  a,
  .btn,
  .hamburger-icon span,
  .menu-links,
  .project-card {
    transition: none;
  }

  .project-card:hover {
    transform: none;
  }
}

/* NAV */

nav,
.nav-links {
  display: flex;
}

nav {
  justify-content: space-around;
  align-items: center;
  height: 17vh;
}

.nav-links {
  gap: 2rem;
  list-style: none;
  font-size: 1.25rem;
}

.nav-links a:hover {
  text-decoration: underline;
  text-underline-offset: 0.5rem;
}

.logo {
  font-size: 1.75rem;
  font-weight: 600;
  cursor: default;
}

/* HAMBURGER NAV */

#hamburger-nav {
  display: none;
}

.hamburger-menu {
  position: relative;
  display: inline-block;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  cursor: pointer;
}

.hamburger-icon span {
  width: 100%;
  height: 2px;
  background-color: var(--color-text);
  transition: all 0.3s ease-in-out;
}

.hamburger-icon.open span:first-child {
  transform: rotate(45deg) translate(9px, 5px);
}

.hamburger-icon.open span:nth-child(2) {
  opacity: 0;
}

.hamburger-icon.open span:last-child {
  transform: rotate(-45deg) translate(9px, -5px);
}

.menu-links {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: var(--color-card);
  width: fit-content;
  max-height: 0;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  border-radius: 0 0 0.5rem 0.5rem;
}

.menu-links li {
  list-style: none;
}

.menu-links a {
  display: block;
  padding: 0.75rem 1.5rem;
  text-align: center;
  font-size: 1.25rem;
}

.menu-links.open {
  max-height: 300px;
}

/* SECTIONS */

section {
  padding-top: 4vh;
  margin: 0 10rem;
  box-sizing: border-box;
  min-height: fit-content;
}
```

- [ ] **Step 4: Verify the skeleton renders and contains every required anchor**

Run:
```bash
cd ~/Portafolio-Cristian
python3 -m http.server 8000 &
sleep 1
curl -s http://localhost:8000/ | grep -oE 'id="(profile|about|experience|projects|contact)"'
kill %1
```
Expected: five lines printed, one per id (`id="profile"`, `id="about"`, `id="experience"`, `id="projects"`, `id="contact"`).

- [ ] **Step 5: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css mediaqueries.css script.js
git commit -m "Add page skeleton, nav, and base styles"
```

---

## Task 2: Assets — profile photo, resume, icons

**Files:**
- Create: `assets/profile-pic.png`
- Create: `assets/resume.pdf`
- Create: `assets/icons/github.svg`
- Create: `assets/icons/linkedin.svg`
- Create: `assets/icons/email.svg`
- Create: `assets/icons/checkmark.svg`
- Create: `assets/icons/education.svg`
- Create: `assets/icons/focus.svg`

**Interfaces:**
- Produces: file paths `./assets/profile-pic.png`, `./assets/resume.pdf`, `./assets/icons/*.svg` referenced by `<img src>` and download links in Task 3–6.

- [ ] **Step 1: Download the GitHub avatar as the profile photo**

```bash
cd ~/Portafolio-Cristian
mkdir -p assets/icons
curl -sL "https://avatars.githubusercontent.com/u/230878784?v=4&s=460" -o assets/profile-pic.png
file assets/profile-pic.png
```
Expected: output contains `PNG image data`.

- [ ] **Step 2: Copy the resume PDF into the project**

```bash
cp "/private/tmp/claude-501/-Users-acevedo-DemoDayProject-ThreatScope/79ec628e-2535-41d9-b244-1a9e741a4647/scratchpad/resume.pdf" ~/Portafolio-Cristian/assets/resume.pdf
file ~/Portafolio-Cristian/assets/resume.pdf
```
Expected: output contains `PDF document`.

> Note for the implementing engineer: if that scratchpad path no longer exists when you run this step, re-export the resume from the Google Doc at `https://docs.google.com/document/d/10SQN3Y2EH3yL1Q2pb8ilxOtH3TOJVTwVVJ-DwcX1z4I/export?format=pdf` (the doc is link-shareable) and save it to `assets/resume.pdf`.

- [ ] **Step 3: Create `assets/icons/github.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
```

- [ ] **Step 4: Create `assets/icons/linkedin.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708C16 15.487 15.474 16 14.825 16H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
```

- [ ] **Step 5: Create `assets/icons/email.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.708 2.825L15 11.105V5.383zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741zM1 11.105l4.708-2.897L1 5.383v5.722z"/></svg>
```

- [ ] **Step 6: Create `assets/icons/checkmark.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="#2563eb"><path d="M13.485 1.929a1 1 0 0 1 0 1.414l-7.5 7.5a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 1 1 1.414-1.414L5.278 8.72l6.793-6.792a1 1 0 0 1 1.414 0z"/></svg>
```

- [ ] **Step 7: Create `assets/icons/education.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0 0 4l8 4 8-4-8-4zM2 6.5v3.19a1 1 0 0 0 .553.894l5 2.5a1 1 0 0 0 .894 0l5-2.5A1 1 0 0 0 14 9.69V6.5l-6 3-6-3z"/></svg>
```

- [ ] **Step 8: Create `assets/icons/focus.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="8" cy="8" r="7"/><circle cx="8" cy="8" r="4"/><circle cx="8" cy="8" r="1.3" fill="currentColor" stroke="none"/></svg>
```

- [ ] **Step 9: Verify all asset files exist**

Run:
```bash
cd ~/Portafolio-Cristian
ls -la assets/ assets/icons/
```
Expected: `profile-pic.png`, `resume.pdf` listed under `assets/`; six `.svg` files listed under `assets/icons/`.

- [ ] **Step 10: Commit**

```bash
cd ~/Portafolio-Cristian
git add assets/
git commit -m "Add profile photo, resume, and icon assets"
```

---

## Task 3: Hero section

**Files:**
- Modify: `index.html` (replace `<section id="profile"></section>`)
- Modify: `style.css` (append PROFILE, BUTTONS, SOCIALS rules)

**Interfaces:**
- Consumes: CSS variables from Task 1 (`--color-accent`, `--color-text`, etc.), assets from Task 2 (`./assets/profile-pic.png`, `./assets/icons/github.svg`, `./assets/icons/linkedin.svg`, `./assets/resume.pdf`).
- Produces: `.btn`, `.btn-color-1`, `.btn-color-2` classes reused by other sections' call-to-action buttons if needed later.

- [ ] **Step 1: Replace the empty profile section in `index.html`**

```html
  <section id="profile">
    <div class="section__pic-container">
      <img src="./assets/profile-pic.png" alt="Cristian Acevedo" />
    </div>
    <div class="section__text">
      <p class="section__text__p1">Hello, I'm</p>
      <h1 class="title">Cristian Acevedo</h1>
      <p class="section__text__p2">Full-Stack Software Engineer</p>
      <div class="btn-container">
        <a href="./assets/resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-color-2">Download Resume</a>
        <a href="#contact" class="btn btn-color-1">Contact Info</a>
      </div>
      <div id="socials-container">
        <a href="https://github.com/CristianAce05" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <img src="./assets/icons/github.svg" class="icon" alt="GitHub" />
        </a>
        <a href="https://linkedin.com/in/cristian-acevedo-368697352" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <img src="./assets/icons/linkedin.svg" class="icon" alt="LinkedIn" />
        </a>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append hero styles to `style.css`**

```css
/* PROFILE */

#profile {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
  min-height: 80vh;
  flex-wrap: wrap;
}

.section__pic-container {
  display: flex;
  height: 400px;
  width: 400px;
}

.section__pic-container img {
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border: 0.3rem solid var(--color-card);
  box-shadow: 0 0 0 0.2rem var(--color-accent);
}

.section__text {
  text-align: center;
}

.section__text__p1 {
  font-size: 1.5rem;
}

.section__text__p2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--color-accent);
  margin: 0.5rem 0 1.5rem;
}

.title {
  font-size: 3rem;
}

#socials-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
  gap: 1rem;
}

.icon {
  cursor: pointer;
  height: 1.75rem;
}

/* BUTTONS */

.btn-container {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.5rem;
}

.btn {
  font-weight: 600;
  padding: 0.9rem 1.5rem;
  border-radius: 2rem;
  border: 0.1rem solid var(--color-text);
  cursor: pointer;
  display: inline-block;
}

.btn-color-1 {
  background: var(--color-accent);
  color: white;
  border-color: var(--color-accent);
}

.btn-color-1:hover {
  background: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
}

.btn-color-2 {
  background: none;
  color: var(--color-text);
}

.btn-color-2:hover {
  background: var(--color-text);
  color: white;
}
```

- [ ] **Step 3: Verify in browser**

Run:
```bash
cd ~/Portafolio-Cristian
python3 -m http.server 8000 &
sleep 1
open http://localhost:8000/
```
Check visually: circular photo with blue ring, name, tagline in blue, two pill buttons, GitHub/LinkedIn icons below. Click "Download Resume" — the PDF should open. Click "Contact Info" — page should jump toward the (still empty) contact section.
Then: `kill %1`

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css
git commit -m "Add hero section"
```

---

## Task 4: About section

**Files:**
- Modify: `index.html` (replace `<section id="about"></section>`)
- Modify: `style.css` (append ABOUT rules)

**Interfaces:**
- Consumes: `./assets/icons/education.svg`, `./assets/icons/focus.svg` from Task 2; `.details-container`-style card look reused visually by Task 5.

- [ ] **Step 1: Replace the empty about section in `index.html`**

```html
  <section id="about">
    <p class="section__text__p1">Get To Know More</p>
    <h1 class="title">About Me</h1>
    <div class="about-containers">
      <div class="details-container">
        <img src="./assets/icons/education.svg" class="icon" alt="Education" />
        <h3>Education</h3>
        <p>Holberton Coding School — Software Engineering Intensive Program (expected graduation July 2026)</p>
        <p>Universidad Interamericana de Puerto Rico — Computer Science coursework</p>
        <p>Mech Tech College — Automotive Technology</p>
      </div>
      <div class="details-container">
        <img src="./assets/icons/focus.svg" class="icon" alt="Focus" />
        <h3>Focus</h3>
        <p>Full-Stack Development</p>
        <p>Backend Systems &amp; APIs</p>
        <p>System Design &amp; Architecture</p>
      </div>
    </div>
    <p class="about-bio">
      Aspiring Software Engineer focused on full-stack development and backend systems, with experience
      building scalable and production-ready applications. Particularly interested in system design,
      backend architecture, and building reliable, high-performance software.
    </p>
  </section>
```

- [ ] **Step 2: Append about styles to `style.css`**

```css
/* ABOUT */

#about {
  text-align: center;
  padding-bottom: 2vh;
}

.about-containers {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: 2rem 0;
  flex-wrap: wrap;
}

.details-container {
  padding: 1.5rem;
  flex: 1;
  min-width: 260px;
  max-width: 360px;
  background: var(--color-card);
  border-radius: 2rem;
  border: 0.1rem solid var(--color-border);
  text-align: center;
}

.details-container .icon {
  height: 2rem;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
}

.details-container h3 {
  margin-bottom: 0.75rem;
}

.details-container p {
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}

.about-bio {
  max-width: 700px;
  margin: 1rem auto 0;
  font-size: 1.1rem;
  line-height: 1.6;
}
```

- [ ] **Step 3: Verify section presence and content**

Run:
```bash
cd ~/Portafolio-Cristian
grep -c "Holberton Coding School" index.html
grep -c "Backend Systems" index.html
```
Expected: both commands print `1` or higher (non-zero).

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css
git commit -m "Add about section"
```

---

## Task 5: Experience/Skills section

**Files:**
- Modify: `index.html` (replace `<section id="experience"></section>`)
- Modify: `style.css` (append EXPERIENCE rules)

**Interfaces:**
- Consumes: `.details-container` card style from Task 4, `./assets/icons/checkmark.svg` from Task 2.

- [ ] **Step 1: Replace the empty experience section in `index.html`**

```html
  <section id="experience">
    <p class="section__text__p1">Explore My</p>
    <h1 class="title">Skills</h1>
    <div class="experience-details-container">
      <div class="details-container">
        <h3 class="experience-sub-title">Languages</h3>
        <div class="article-container">
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Python</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>C</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>JavaScript</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>SQL</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Bash</span></article>
        </div>
      </div>
      <div class="details-container">
        <h3 class="experience-sub-title">Frameworks</h3>
        <div class="article-container">
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Flask</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Node.js</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>React</span></article>
        </div>
      </div>
      <div class="details-container">
        <h3 class="experience-sub-title">Databases</h3>
        <div class="article-container">
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>MySQL</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>SQLite</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>MongoDB</span></article>
        </div>
      </div>
      <div class="details-container">
        <h3 class="experience-sub-title">Tools</h3>
        <div class="article-container">
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Git &amp; GitHub</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>Docker</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>VS Code</span></article>
          <article><img src="./assets/icons/checkmark.svg" class="icon" alt="" /><span>GDB</span></article>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append experience styles to `style.css`**

```css
/* EXPERIENCE */

#experience {
  text-align: center;
  padding-bottom: 2vh;
}

.experience-details-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.experience-sub-title {
  color: var(--color-accent);
  font-size: 1.25rem;
  margin-bottom: 1.25rem;
}

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

- [ ] **Step 3: Verify all skills are present**

Run:
```bash
cd ~/Portafolio-Cristian
for skill in Python Flask MySQL Docker; do grep -c "$skill" index.html; done
```
Expected: four non-zero counts printed.

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css
git commit -m "Add experience/skills section"
```

---

## Task 6: Projects section

**Files:**
- Modify: `index.html` (replace `<section id="projects"></section>`)
- Modify: `style.css` (append PROJECTS rules)

**Interfaces:**
- Consumes: `.btn`, `.btn-color-1` from Task 3.
- Produces: `.projects-container`, `.project-card` classes, self-contained to this task.

- [ ] **Step 1: Replace the empty projects section in `index.html`**

```html
  <section id="projects">
    <p class="section__text__p1">Browse My Recent</p>
    <h1 class="title">Projects</h1>
    <div class="projects-container">
      <div class="project-card">
        <h3>ThreatScope</h3>
        <p>Real-time network intrusion detection dashboard built with two other developers. Monitors live network traffic and visualizes cybersecurity threats.</p>
        <p class="project-tech">React · FastAPI · WebSockets · SQLite · Docker</p>
        <a href="https://github.com/MicaelVR04/ThreatScope" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
      <div class="project-card">
        <h3>HBnB</h3>
        <p>Airbnb-style full-stack web app. Users can create accounts, list properties, and browse available places, with backend logic managing users, places, and reviews.</p>
        <p class="project-tech">Python · Flask · SQLite · RESTful APIs</p>
        <a href="https://github.com/CristianAce05/holbertonschool-hbnb" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
      <div class="project-card">
        <h3>Task Manager</h3>
        <p>Full-stack task management app with secure authentication, full CRUD task management, search/filtering, and dark mode.</p>
        <p class="project-tech">React (Vite) · Node/Express · Supabase · JWT · Docker</p>
        <a href="https://github.com/CristianAce05/task-manager_app_project" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
      <div class="project-card">
        <h3>Simple Shell</h3>
        <p>Custom Unix command-line interpreter capable of executing basic shell commands, implementing command parsing and process execution.</p>
        <p class="project-tech">C · Linux system calls (fork, execve, wait) · GCC</p>
        <a href="https://github.com/CristianAce05/holbertonschool-shell" target="_blank" rel="noopener noreferrer" class="btn btn-color-1">View Code</a>
      </div>
    </div>
  </section>
```

- [ ] **Step 2: Append projects styles to `style.css`**

```css
/* PROJECTS */

#projects {
  text-align: center;
  padding-bottom: 2vh;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

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

.project-tech {
  font-size: 0.85rem;
  font-style: italic;
}

.project-card .btn {
  align-self: flex-start;
  margin-top: auto;
  width: fit-content;
}
```

- [ ] **Step 3: Verify all four projects are present**

Run:
```bash
cd ~/Portafolio-Cristian
for p in ThreatScope HBnB "Task Manager" "Simple Shell"; do grep -c "$p" index.html; done
```
Expected: four non-zero counts printed.

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css
git commit -m "Add projects section"
```

---

## Task 7: Contact section and footer

**Files:**
- Modify: `index.html` (replace `<section id="contact"></section>`, update `<footer>`)
- Modify: `style.css` (append CONTACT, FOOTER rules)

**Interfaces:**
- Consumes: `./assets/icons/email.svg`, `./assets/icons/linkedin.svg` from Task 2.

- [ ] **Step 1: Replace the empty contact section and footer in `index.html`**

```html
  <section id="contact">
    <p class="section__text__p1">Get in Touch</p>
    <h1 class="title">Contact Me</h1>
    <div class="contact-info-upper-container">
      <div class="contact-info-container">
        <img src="./assets/icons/email.svg" class="icon" alt="Email" />
        <a href="mailto:acecristian35@gmail.com">acecristian35@gmail.com</a>
      </div>
      <div class="contact-info-container">
        <img src="./assets/icons/linkedin.svg" class="icon" alt="LinkedIn" />
        <a href="https://linkedin.com/in/cristian-acevedo-368697352" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
    </div>
  </section>
```

Replace the existing `<footer>...</footer>` block with:

```html
  <footer>
    <p>Copyright &#169; 2026 Cristian Acevedo. All Rights Reserved.</p>
  </footer>
```
(This is identical to Task 1's footer — no change needed if it already matches; skip if so.)

- [ ] **Step 2: Append contact/footer styles to `style.css`**

```css
/* CONTACT */

#contact {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-bottom: 4vh;
}

.contact-info-upper-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.contact-info-container {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--color-card);
  border: 0.1rem solid var(--color-border);
  border-radius: 2rem;
  padding: 0.9rem 1.75rem;
}

.contact-info-container a:hover {
  text-decoration: underline;
}

/* FOOTER */

footer {
  height: 12vh;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
}

footer p {
  text-align: center;
}
```

- [ ] **Step 3: Verify contact info is present**

Run:
```bash
cd ~/Portafolio-Cristian
grep -c "acecristian35@gmail.com" index.html
grep -c "mailto:" index.html
```
Expected: both non-zero.

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add index.html style.css
git commit -m "Add contact section and footer"
```

---

## Task 8: Hamburger menu behavior and responsive layout

**Files:**
- Modify: `script.js` (currently empty)
- Modify: `mediaqueries.css` (currently empty)

**Interfaces:**
- Consumes: `.hamburger-icon`, `.menu-links` classes and `onclick="toggleMenu()"` markup from Task 1.
- Produces: global `toggleMenu()` function (already referenced by Task 1's HTML).

- [ ] **Step 1: Write `script.js`**

```javascript
function toggleMenu() {
  const hamburgerIcon = document.querySelector(".hamburger-icon");
  const menuLinks = document.querySelector(".menu-links");
  const isOpen = hamburgerIcon.classList.toggle("open");
  menuLinks.classList.toggle("open");
  hamburgerIcon.setAttribute("aria-expanded", isOpen);
}
```

- [ ] **Step 2: Write `mediaqueries.css`**

```css
@media screen and (max-width: 1200px) {
  #desktop-nav {
    display: none;
  }

  #hamburger-nav {
    display: flex;
  }

  section {
    margin: 0 5rem;
  }
}

@media screen and (max-width: 768px) {
  section {
    margin: 0 2rem;
  }

  #profile {
    gap: 2rem;
    min-height: fit-content;
    padding: 4vh 0;
  }

  .section__pic-container,
  .section__pic-container img {
    width: 280px;
    height: 280px;
  }

  .title {
    font-size: 2.25rem;
  }

  .about-containers,
  .experience-details-container,
  .projects-container {
    grid-template-columns: 1fr;
  }

  .about-containers {
    flex-direction: column;
  }

  .btn-container {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 12rem;
    text-align: center;
  }
}

@media screen and (max-width: 480px) {
  .title {
    font-size: 1.85rem;
  }

  .section__text__p2 {
    font-size: 1.4rem;
  }

  .contact-info-upper-container {
    flex-direction: column;
    width: 100%;
  }
}
```

- [ ] **Step 3: Verify hamburger toggle works and layout collapses on mobile**

Run:
```bash
cd ~/Portafolio-Cristian
python3 -m http.server 8000 &
sleep 1
open http://localhost:8000/
```
In the browser: open DevTools, toggle device toolbar to a mobile width (e.g. 375px). Confirm the desktop nav links disappear and the hamburger icon appears top-right. Click the hamburger icon — the menu should slide open with About/Experience/Projects/Contact links, and the icon should animate into an X. Click a link — the menu should close and the page should scroll to that section. Resize back to desktop width and confirm the desktop nav reappears.
Then: `kill %1`

- [ ] **Step 4: Commit**

```bash
cd ~/Portafolio-Cristian
git add script.js mediaqueries.css
git commit -m "Add hamburger menu behavior and responsive layout"
```

---

## Task 9: README, GitHub Pages, and final verification

**Files:**
- Create: `README.md`

**Interfaces:**
- None — this is the final integration/deployment task.

- [ ] **Step 1: Write `README.md`**

```markdown
# Cristian Acevedo — Portfolio

Personal portfolio site built with plain HTML, CSS, and JavaScript.

## Live site

https://cristianace05.github.io/Portafolio-Cristian/

## Sections

- About
- Experience / Skills
- Projects
- Contact

## Stack

No build tools — plain HTML5, CSS3, and vanilla JavaScript, deployed on GitHub Pages.
```

- [ ] **Step 2: Commit and push everything**

```bash
cd ~/Portafolio-Cristian
git add README.md
git commit -m "Add README"
git push -u origin main
```
Expected: push succeeds, `git log --oneline` on GitHub matches local history.

- [ ] **Step 3: Enable GitHub Pages**

Tell the user to go to `https://github.com/CristianAce05/Portafolio-Cristian/settings/pages`, set **Source** to "Deploy from a branch", branch `main`, folder `/ (root)`, then save. This step requires manual action in the GitHub UI — it cannot be done via git push alone.

- [ ] **Step 4: Verify the live site**

Run (after waiting ~1 minute for Pages to build):
```bash
curl -s -o /dev/null -w "%{http_code}\n" https://cristianace05.github.io/Portafolio-Cristian/
```
Expected: `200`. If it returns `404`, Pages may still be building — wait another minute and retry.

Open the live URL in a browser and confirm: hero photo loads, resume download works, all four project links work, contact email/LinkedIn links work, hamburger menu works on a narrow viewport.
