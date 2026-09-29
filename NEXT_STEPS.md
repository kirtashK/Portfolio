# Next steps

Status as of 2026-09-28. Update or delete items as they get done.

## Done so far

- Repo on GitHub (private), branches `main` and `develop`, feature branches merged via PR.
- Single-page site: hero, about, projects, contact, nav, footer.
- Real name, email, GitHub and LinkedIn filled in (phone intentionally left out).
- Dark theme with toggle, saved preference and system default (PR #1).

## Should do next

1. **Sticky navigation** (`feature/sticky-nav`)
   - `position: sticky` on `.site-header`; `scroll-margin-top` is already in place.
   - Optional: highlight the nav link of the section currently in view.
2. **Spanish / English switcher** (`feature/i18n`)
   - Every text element already has a `data-i18n` key.
   - Add `translations.js` with `{ en: {...}, es: {...} }`, a language button in the header,
     save the choice, update `<html lang>`, and translate the `aria-label`s too.
3. **Write the real content** (can be done any time, no code needed)
   - Tagline, intro, bio, contact intro sentence, `<meta name="description">`.
   - Projects: title, description, tags, link (replace `href="#"` and the hidden title text).
4. **Go live on GitHub Pages**
   - Merge `develop` into `main`
   - Make the repo public (Pages needs a paid plan for private repos), then
     Settings → Pages → Deploy from branch → `main` / root.
   - Check the site works from the `/Portfolio/` subfolder URL.

## Could do later

- Profile photo in the hero or about section (`assets/images/`, with alt text).
- Project thumbnails on the cards.
- Social preview tags (Open Graph image, title, description) so links look good when shared.
- Downloadable CV (PDF in `assets/`, link in hero or contact).
- "Skills" or "Experience" section.
- Lighthouse audit (performance, accessibility, SEO) before going live.
- Custom domain for GitHub Pages.
