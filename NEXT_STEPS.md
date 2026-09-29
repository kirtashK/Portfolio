# Next steps

Status as of 2026-09-28. Update or delete items as they get done.

## Done so far

- Repo on GitHub (private), branches `main` and `develop`, feature branches merged via PR.
- Single-page site: hero, about, projects, contact, nav, footer.
- Real name, email, GitHub and LinkedIn filled in (phone intentionally left out).
- Dark theme with toggle, saved preference and system default (PR #1).
- English / Spanish as two hand-written pages (`index.html`, `es/index.html`) with an
  EN | ES switcher that keeps the current section (`feature/language-switcher`).

## Should do next

1. **Sticky navigation** (`feature/sticky-nav`)
   - `position: sticky` on `.site-header`; `scroll-margin-top` is already in place.
   - Optional: highlight the nav link of the section currently in view.
2. **Write the real content** (can be done any time, no code needed)
   - In both `index.html` (English) and `es/index.html` (Spanish).
   - Tagline, intro, bio, contact intro sentence, `<meta name="description">`.
   - Projects: title, description, tags, link (replace `href="#"` and the hidden title text).
3. **Go live on GitHub Pages**
   - Merge `develop` into `main`
   - Make the repo public (Pages needs a paid plan for private repos), then
     Settings → Pages → Deploy from branch → `main` / root.
   - Check the site works from the `/Portfolio/` subfolder URL, including `/Portfolio/es/`.
   - The `hreflang` links in both pages assume `https://kirtashk.github.io/Portfolio/`;
     update them if the URL differs (e.g. a custom domain).

## Could do later

- Profile photo in the hero or about section (`assets/images/`, with alt text).
- Project thumbnails on the cards.
- Social preview tags (Open Graph image, title, description) so links look good when shared.
- Downloadable CV (PDF in `assets/`, link in hero or contact).
- "Skills" or "Experience" section.
- Lighthouse audit (performance, accessibility, SEO) before going live.
- Custom domain for GitHub Pages.
