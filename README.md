# Mason Kim — Portfolio

A single-page personal portfolio. Clean, cinematic dark design with a chromatic-prism hero, an About section (bio, education, experience timeline), and a Work section of selected projects.

**▶ Live:** https://isokimmy.github.io/mason-kim-portfolio/

## Stack
- Single self-contained `index.html` — vanilla HTML/CSS/JS, no build step
- General Sans (Fontshare); animated SVG prism artifact with RGB channel-split
- IntersectionObserver scroll reveals, count-up stats, tab-switched panels, pointer parallax
- Respects `prefers-reduced-motion`; responsive down to 375px

## Run locally
Open `index.html` in a browser, or serve the folder:
```bash
python -m http.server 8099
```
