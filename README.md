# Portfolio

Personal portfolio website: a single-page static site built with plain HTML, CSS and JavaScript, hosted on GitHub Pages.

## Structure

```
index.html      English page: markup and visible text
es/index.html   Spanish page: same structure and section ids, Spanish text
styles.css      Design tokens, base styles, then one block per section
theme-init.js   Applies the saved/system theme before first paint
script.js       Small behavior, shared by both pages
assets/         Images and icons
```

Each language is written by hand in its own page. When you add or change a
section, update both `index.html` and `es/index.html`.

## Branches

- `main`: the published site
- `develop`: integration branch for ongoing work.
- `feature/*`: one branch per feature, merged into `develop`.

## Running locally

Serve the folder with any static server so the EN / ES links (which point to
folders like `es/`) work, for example:

```
python -m http.server 5500
```

Then open http://localhost:5500. Opening `index.html` directly also works,
except for switching language.

## Planned features

- Sticky navigation
- Dark mode toggle
- Spanish / English language switcher
