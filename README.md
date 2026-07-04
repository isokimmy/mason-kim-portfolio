# Mason Kim — Portfolio

A personal portfolio with a cinematic, monochrome dark design and a chromatic-prism motif. Two pages:

- **About** — hero, bio, education, experience timeline, toolkit
- **Work** — a dedicated deep-dive on **SQL Asteroids** (how to play, SQL topics by level, visual themes, features, tech stack) plus other projects

**▶ Live:** https://isokimmy.github.io/mason-kim-portfolio/

## Stack
- Vanilla HTML/CSS/JS, no build step
- General Sans (Fontshare); animated SVG prism artifact with RGB channel-split
- Custom chromatic cursor, magnetic buttons, masked/word-split reveals, count-up stats,
  scroll-scrubbed prism, keyword marquee — all guarded by `prefers-reduced-motion`
- Responsive down to 375px

## Structure
```
├── index.html   # About page
├── work.html    # Work / SQL Asteroids showcase
├── style.css    # Shared styles
└── app.js       # Shared interactions
```

## Run locally
```bash
python -m http.server 8099
# then open http://localhost:8099
```
