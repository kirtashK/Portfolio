# Portfolio

Personal portfolio website: a single-page static site built with plain HTML, CSS and JavaScript (no frameworks, no build step), hosted on GitHub Pages.

## Structure

```
index.html    All markup and visible text
styles.css    Design tokens, base styles, then one block per section
script.js     Small behavior only (no content)
assets/       Images and icons
```

## Branches

- `main`: the published site (GitHub Pages deploys from here).
- `develop`: integration branch for ongoing work.
- `feature/*`: one branch per feature, merged into `develop`.

When `develop` is ready to go live, merge it into `main`.

## Running locally

Open `index.html` in a browser, or serve the folder with any static server.

## Planned features

- Sticky navigation
- Dark mode toggle
- Spanish / English language switcher
