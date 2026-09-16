# Malaq Impact Initiative — Website

A static, multi-page website for Malaq Impact Initiative, an NGO working to end
technology-facilitated gender-based violence (TFGBV) in Uganda.

Built with plain HTML/CSS/JavaScript (ES6 classes, no framework/build step, no
database) so it can be hosted directly on GitHub Pages.

## Project structure

```
index.html            Home
about.html             About Us (mission, pillars, team)
the-issue.html          What is TFGBV
get-help.html           Support resources
digital-safety.html     Digital safety tips
get-involved.html       Volunteer / partner / donate
news.html                News & stories (placeholder)
contact.html            Contact form (Formspree)
privacy.html            Privacy policy
404.html                 Not found page

partials/
  header.html            Shared nav, injected into every page
  footer.html            Shared footer, injected into every page

assets/
  css/main.css           Design system + all site styles
  js/main.js              App entry point
  js/classes/             Navigation, QuickExit, RevealOnScroll,
                           Accordion, ContactForm, PartialLoader
  favicon.svg
```

Each page loads `partials/header.html` and `partials/footer.html` at runtime via
`fetch()`, so the nav/footer only need to be edited in one place.

## Running locally

Because the header/footer are loaded via `fetch()`, opening `index.html`
directly by double-clicking it won't work (browsers block `fetch` on the
`file://` protocol). Serve the folder with any local static server, e.g.:

```bash
# Python
python -m http.server 8000

# Node (no install needed)
npx serve .
```

Then open `http://localhost:8000`.

## Things you still need to fill in

Search the codebase for `TODO` / `[TODO` / `placeholder-note` to find every
spot marked for your input. In summary:

1. **Images** — every `.img-placeholder` box is a labeled empty slot. Replace
   it with an `<img>` tag once you have real photos/graphics.
2. **Contact form endpoint** (`contact.html`) — currently points to
   `https://formspree.io/f/YOUR_FORM_ID`. Once you have your domain email
   (e.g. `info@yourdomain.org`):
   1. Create a free account at [formspree.io](https://formspree.io).
   2. Create a new form using that email as the recipient.
   3. Copy the endpoint URL Formspree gives you and paste it into the
      `action="..."` attribute of the `<form data-contact-form>` in
      `contact.html`.
   4. Spam protection is already wired up via Formspree's built-in honeypot
      (the hidden `_gotcha` field) — no extra setup needed.
3. **Get Help hotlines** (`get-help.html`) — placeholder boxes for the
   national GBV helpline, police contact, legal aid and counselling services.
   Please verify these with a live source before publishing.
4. **Contact/footer details** — email and location are marked "(TBD)" in
   `partials/footer.html` and `contact.html`.
5. **Social media links** — placeholder `#` links in `partials/footer.html`.
6. **Team section** (`about.html`) — placeholder cards, ready for names/photos.
7. **Homepage statistics** — placeholder `[X]%` figures; replace with real,
   sourced numbers (and consider citing the source).

## Attaching your custom domain

1. Buy your domain (e.g. from Namecheap, GoDaddy, etc.).
2. In the repo, create a file named `CNAME` (no extension) at the project
   root containing just your domain, e.g.:
   ```
   www.malaqimpact.org
   ```
3. In GitHub → repo **Settings → Pages**, add the same custom domain and
   enable "Enforce HTTPS" once it's available (GitHub provisions a free TLS
   certificate automatically).
4. At your domain registrar, point the domain at GitHub Pages:
   - For an apex domain (`malaqimpact.org`): add `A` records pointing to
     GitHub's Pages IPs (listed in GitHub's Pages custom-domain docs).
   - For a `www` subdomain: add a `CNAME` record pointing to
     `<your-github-username>.github.io`.

## Security notes

- **Content-Security-Policy** is set via a `<meta>` tag in every page
  (restricts scripts/styles/connections to this site, Google Fonts, and
  Formspree). GitHub Pages doesn't let you set real HTTP response headers, so
  this meta-tag CSP is the strongest option available without moving to a
  platform like Cloudflare Pages or Netlify (which support a `_headers` file
  for additional headers like `X-Frame-Options`).
- No inline `<script>`/`onclick=` handlers anywhere — all JS is in external
  files using `addEventListener`, reducing XSS risk.
- The contact form is spam-protected with Formspree's honeypot field and
  validated client-side, and Formspree itself enforces its own server-side
  protections and submission limits.
- No analytics/tracking scripts and no database — nothing to be breached
  beyond the static files themselves.
- All external links use `rel="noopener noreferrer"`.

## The "Quick Exit" safety feature

A red **Quick Exit** button appears in the header on every page. Clicking it
(or pressing `Escape` three times quickly) immediately redirects to
`https://www.google.com` and *replaces* the current history entry, so the
back button won't return to this site. This is standard practice on
GBV-support websites. You can change the destination URL by editing
`QuickExit.DESTINATION` in `assets/js/classes/QuickExit.js`.

## Deploying to GitHub Pages

1. Push this repository to GitHub (public repo, so Pages is free).
2. Go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save — your site will be live at
   `https://<username>.github.io/<repo-name>/` within a minute or two.
