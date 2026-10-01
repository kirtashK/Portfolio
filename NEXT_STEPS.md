# Next steps

Status as of 2026-09-28. Update or delete items as they get done.

## Done so far

- Repo on GitHub (private), branches `main` and `develop`, feature branches merged via PR.
- Single-page site: hero, about, projects, contact, nav, footer.
- Real name, email, GitHub and LinkedIn filled in (phone intentionally left out).
- Dark theme with toggle, saved preference and system default (PR #1).
- English / Spanish as two hand-written pages (`index.html`, `es/index.html`) with an
  EN | ES switcher that keeps the current section (PR #2).
- Sticky header with shadow on scroll, current-section highlight, and the mobile
  menu closing on scroll (PR #3).
- Skills (grouped tags) and Experience (work and education timelines) sections;
  menu collapses behind the button below 1024px (`feature/skills-and-experience`).

## Should do next

1. **Write the real content** (can be done any time, no code needed)
   - In both `index.html` (English) and `es/index.html` (Spanish).
   - Tagline, intro, bio, contact intro sentence, `<meta name="description">`.
   - Skills: groups and tags. Experience: jobs and education, newest first.
   - Projects: title, description, tags, link (replace `href="#"` and the hidden title text).
2. **Go live on GitHub Pages**
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
- Lighthouse audit (performance, accessibility, SEO) before going live.
- Custom domain for GitHub Pages.

## Decided against

- Downloadable CV: a public PDF can be scraped; recruiters ask for it by email instead.
- Phone number on the site, for the same reason.
