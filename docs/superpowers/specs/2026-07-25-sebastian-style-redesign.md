# Portfolio Redesign — Match Sebastian's Format — Design

## Goal

Restyle Cristian's already-built and deployed portfolio site (index.html/style.css/mediaqueries.css) to closely match the visual format of the reference site (Sebastian Soto's portfolio, https://portafolio-sebastian-delta.vercel.app) — colors, sizing/breakpoints, experience-section box style, and project cards with images — while keeping Cristian's actual content and the accessibility fixes already in place. Content structure (sections, copy, links) stays the same; this is a visual/CSS pass plus two structural changes (experience tile format, project card images).

Reference values below were pulled directly from the live site's `style.css` and `mediaqueries.css` (fetched 2026-07-25), not reconstructed from memory.

## Non-goals

- No change to page content, copy, or links (resume, GitHub, LinkedIn, project descriptions) — this is styling only, plus the two structural changes below.
- Not collapsing the 4 skill categories (Languages/Frameworks/Databases/Tools) into Sebastian's 2 (Skills/Programming Languages) — keeping Cristian's real category breakdown.
- Not adding fabricated skill-proficiency labels ("Intermediate"/"Basic") — no real data backs this, so the tile format drops that line entirely.
- Not regressing the accessibility fixes already applied (hidden-menu `visibility` toggle, `<main>` landmark + heading hierarchy, `aria-label`s on both navs, sticky nav, `scroll-margin-top`) — Sebastian's site lacks all of these; this redesign layers his visual system on top of the existing correct structure, not a wholesale copy of his HTML/CSS.
- Not adding a "Live Demo" button — none of Cristian's 4 projects are deployed live, so cards keep a single GitHub/View Code button.

## 1. Color system

Replace the blue-accent palette with Sebastian's monochrome scheme. New `:root` values in `style.css`:

| Variable | Old (blue) | New (monochrome, from Sebastian's CSS) |
|---|---|---|
| `--color-bg` | `#f3f3f3` | `#f3f3f3` (unchanged) |
| `--color-card` | `#ffffff` | `#ffffff` (unchanged) |
| `--color-text` | `#141414` | `#000000` (`black`, matches his `a { color: black }` / body text) |
| `--color-text-secondary` | `#555555` | `rgb(85, 85, 85)` (same value, kept as-is — already matches) |
| `--color-border` | `#a3a3a3` | `rgb(163, 163, 163)` (same value, kept as-is — already matches) |
| `--color-accent` | `#2563eb` | `rgb(53, 53, 53)` (dark grey — replaces blue as the "filled button / accent" color) |
| `--color-accent-dark` | `#1d4ed8` | `rgb(0, 0, 0)` (pure black — hover state for filled buttons, matches his `.btn-color-1:hover { background: rgb(0,0,0) }`) |

Every place `--color-accent`/`--color-accent-dark` is currently used (nav-link hover, tagline color, filled buttons, project-card hover border, focus-visible outline, experience sub-title color) picks up the new grey/black automatically via the variable — no separate find/replace needed beyond the `:root` block.

`:focus-visible` keeps using `--color-accent` for its outline (now dark grey instead of blue) — still clearly visible against the light background, satisfies the existing keyboard-accessibility constraint without needing blue specifically.

## 2. Sizing / breakpoints

- Adopt Sebastian's three breakpoints in `mediaqueries.css`: **1400px, 1200px, 600px** (replacing the current 1200px/768px/480px scheme). Rewrite the responsive rules to match his structure: nav swap still at 1200px; pic/section-padding adjustments split across 1400px and 1200px; the small-phone tier moves from 480px to 600px.
- `.nav-links` font-size → `1.5rem` (was `1.25rem`), matching his value.
- `.btn` sizing → `padding: 1rem; width: 8rem;` fixed-width pill (was `padding: 0.9rem 1.5rem` auto-width) — matches his button proportions. `border-radius: 2rem` stays (already matches).
- `.section__pic-container` responsive sizing: 400×400 desktop (unchanged) → 275×275 at ≤1200px (was 280×280 at ≤768px) → fluid `height: 46vw; width: auto;` at ≤600px (was fixed 280px at ≤768px — his mobile tier scales with viewport instead of a fixed px value).
- `.title` font-size: `3rem` desktop (unchanged) → `2rem` at ≤600px (was a two-step 2.25rem/1.85rem scale at 768/480 — collapsing to his single mobile value).
- Section outer margin: `0 10rem` desktop (unchanged) → `0 5%` at ≤1200px (was `0 5rem`) → unchanged further at ≤600px (his CSS doesn't shrink it further at the smallest tier, relying on the 5% already applied).

## 3. Experience section — tile format

Restructure each skill's markup from the current `<article><img class="icon"/><span>Name</span></article>` row into Sebastian's tile shape: `<article><img class="icon"/><div><h3>Name</h3></div></article>` (dropping his `<p>proficiency</p>` line — no fabricated data). CSS changes:

- `.article-container`: switch from a vertical `flex-direction: column` list to his wrapping row layout — `display: flex; flex-wrap: wrap; flex-direction: row; gap: 2.5rem; justify-content: space-around;`.
- `article`: fixed `width: 10rem; display: flex; justify-content: space-around; gap: 0.5rem;` (was a simple flex row with no fixed width).
- Keep the existing 4 `.details-container` category cards (Languages/Frameworks/Databases/Tools) — each now contains a wrapping tile grid of its skills instead of a vertical checklist.

## 4. Projects section — cards with images

Add an image slot and subtitle line to each project card, restyled to Sebastian's card look:

- New markup per card: `<img class="project-card-img" src="./assets/projects/<slug>.svg" alt="..."/>`, `<h3>` title (unchanged), new `<h4 class="project-card-subtitle">` short type label, existing tech-stack `<p>`, existing GitHub button.
- Subtitle text per project: ThreatScope → "NIDS Dashboard"; HBnB → "Airbnb Clone"; Task Manager → "Task Management App"; Simple Shell → "Unix Shell".
- Card CSS restyled toward his `.new-card`: white/`--color-card` background, `border: 1px solid var(--color-border)`, `border-radius: 1rem`, `box-shadow: 0 4px 6px rgba(0,0,0,0.1)`, hover lift `translateY(-5px)` with a stronger shadow — closely matching his values, using our CSS variables instead of his hardcoded hex where equivalent.
- `.project-card-img`: `border-radius: 1rem 1rem 0 0`, `width: 100%`, `height: auto`, `max-height: 200px`, `object-fit: cover`.
- **Images:** since no real screenshots exist yet, generate one simple placeholder SVG graphic per project (abstract/icon-style, monochrome to match the new palette — e.g. a terminal glyph for Simple Shell, a network/radar motif for ThreatScope, a house/listing motif for HBnB, a checklist motif for Task Manager) saved to `assets/projects/`. These are explicitly stand-ins — swappable later for real screenshots without any HTML/CSS change (same filenames, same `<img>` slot).

## 5. Final polish pass — ui-ux-pro-max

After the above changes are implemented and verified in-browser, run the `ui-ux-pro-max` skill against the finished redesign (color system, spacing/type scale, project cards, experience tiles) looking specifically for improvements beyond a straight copy of Sebastian's site — e.g. contrast refinement, hover/motion polish, spacing consistency — respecting `prefers-reduced-motion` and the existing keyboard-accessibility requirements. Any suggested changes get presented before applying, same as the original design's font-pairing/accent-color review.

## Testing / verification

No automated test suite (static site, consistent with the original build). Verification is: local dev server visual check at desktop/tablet/phone widths (matching the new 1400/1200/600 breakpoints), keyboard tab-through of the experience tiles and project cards, and a final whole-site review pass before commit — same process used for the original build.
