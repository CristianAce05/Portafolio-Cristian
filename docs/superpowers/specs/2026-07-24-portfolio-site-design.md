# Cristian Acevedo Portfolio Site — Design

## Goal

A single-page personal portfolio for Cristian Acevedo, published on GitHub (repo `CristianAce05/Portfolio-Cristian`), to showcase his background, skills, and projects. Design closely follows the structure of a reference portfolio (Sebastian Soto's, https://portafolio-sebastian-delta.vercel.app) with Cristian's own content, and a blue accent color instead of pure monochrome.

## Tech stack

Plain HTML, CSS, and vanilla JavaScript. No build tools, no frameworks. Deploy target: GitHub Pages, serving directly from the repo.

## File structure

```
Portfolio-Cristian/
├── index.html
├── style.css
├── mediaqueries.css
├── script.js
├── assets/
│   ├── profile-pic.png       (from GitHub avatar)
│   ├── resume.pdf            (from Cristian's Google Doc export)
│   ├── icons/                (linkedin, github, email, arrow icons — SVG)
│   └── projects/              (project thumbnail images, added later per-project)
└── docs/
    └── superpowers/specs/    (this design doc)
```

## Visual style

- Base palette: light grey background (`#F3F3F3`), black text, white cards — same monochrome foundation as the reference site.
- Accent color: blue (used for links on hover, primary button, section highlights, and any icon accents) instead of the reference's pure black/white/grey.
- Font: Poppins (Google Fonts), weights 300/400/500/600 — same as reference.
- Circular profile photo (400x400, `border-radius: 50%`) in hero.
- Pill-shaped buttons (`border-radius: 2rem`), primary filled (accent blue) and secondary outlined.
- Rounded cards with soft border for About/Experience/Project items (`border-radius: 2rem` for detail cards, `1rem` for project cards).
- Smooth scroll (`scroll-behavior: smooth`) single-page navigation.
- Sticky nav bar (desktop); hamburger menu on mobile (`mediaqueries.css` breakpoint ~768px), reused pattern from reference site.

## Sections (in order)

1. **Nav** — Logo/name on left, links to About / Experience / Projects / Contact. Hamburger version collapses into a dropdown menu on mobile.

2. **Hero (`#profile`)**
   - Circular photo (Cristian's GitHub avatar, `avatars.githubusercontent.com/u/230878784`)
   - "Hello, I'm Cristian Acevedo"
   - Tagline: "Full-Stack Software Engineer"
   - Buttons: "Download Resume" (links to `assets/resume.pdf`) and "Contact Info" (scrolls to `#contact`)
   - Social icons: GitHub (`github.com/CristianAce05`), LinkedIn (`linkedin.com/in/cristian-acevedo-368697352`)

3. **About (`#about`)**
   - Two detail cards: "Education" and "Bio" (following the reference's two-card layout, adapted from its Experience/Education split)
   - Education card lists: Holberton Coding School — Software Engineering Intensive Program, Ponce PR (expected grad July 2026); Universidad Interamericana de PR — CS coursework; Mech Tech College — Automotive Technology
   - Bio text: adapted from Cristian's GitHub profile README — full-stack development, backend systems focus, system design interest

4. **Experience/Skills (`#experience`)**
   - Grouped skill grid (checkmark-icon rows, matching reference style), grouped under subheadings:
     - Languages: Python, C, JavaScript, SQL, Bash
     - Frameworks: Flask, Node.js, React
     - Databases: MySQL, SQLite, MongoDB
     - Tools: Git/GitHub, Docker, VS Code, GDB

5. **Projects (`#projects`)** — 4 project cards, each with title, description, tech-used line, and GitHub link:
   1. **ThreatScope** — real-time network intrusion detection dashboard built with 2 other developers; React frontend, FastAPI backend, WebSockets for live updates, SQLite, RESTful APIs, Docker.
   2. **HBnB** — Airbnb-style full-stack web app; Flask backend with RESTful APIs, SQLite persistence, HTML/CSS/JS frontend; manages users, places, and reviews.
   3. **Task Manager** — full-stack task management app; React (Vite) frontend, Node/Express backend, Supabase (PostgreSQL), JWT auth, dark mode, Docker Compose deployment.
   4. **Simple Shell** — custom Unix command-line interpreter in C; implements command parsing and process execution via `fork`, `execve`, `wait` system calls.

6. **Contact (`#contact`)**
   - Email: acecristian35@gmail.com (mailto link)
   - LinkedIn link
   - No phone number (kept private)

7. **Footer** — copyright line, current year.

## Out of scope (explicitly deferred)

- Helpdesk Ticket System project — unfinished, will be added later once the project itself is done.
- Non-technical work history (Walmart, Mech Tech office assistant, gas station cashier) — omitted to keep the portfolio focused on technical work.
- Resume content is only linked as a PDF download, not transcribed into the page.

## Assets needed before/after build

- Profile photo: pulled from GitHub avatar (`https://avatars.githubusercontent.com/u/230878784`)
- Resume PDF: exported from Cristian's Google Doc, needs to be placed at `assets/resume.pdf`
- Project thumbnail images: none yet — cards will initially ship without images or with simple placeholder graphics; can be added later per project.
