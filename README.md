# Malaq Impact Initiative: Website

A static, multi-page website for Malaq Impact Initiative, an NGO working to end
technology-facilitated gender-based violence (TFGBV) in Uganda.

Built with plain HTML/CSS/JavaScript (ES6 classes, no framework/build step, no
database) so it can be hosted directly on GitHub Pages.

## Project structure

```
index.html              Home: hero, issue, 10 forms, why Uganda, approach,
                        programmes, survivors, impact, resources, partners
about.html              Who we are, mission, vision, who we work with
team.html               Leadership, board and advisors, values
safeguarding.html       Safeguarding commitments, policies, raising a concern
the-issue.html          Definition, the 10 forms, why Uganda, harm
our-work.html           Three pillars, five programme areas, impact
resources.html          Filterable resource library
get-help.html           Emergency card, Malaq support channels, other services,
                        next steps, safe browsing
digital-safety.html     Tabbed safety guides and an interactive safety check
get-involved.html       Five audience paths, partnerships, awareness
news.html               News and stories (placeholders)
contact.html            Contact channels and general enquiry form (Formspree)
privacy.html            Privacy policy with a live table of contents
404.html                Not found page

partials/
  header.html           Shared header, desktop nav and mobile menu
  footer.html           Shared footer

assets/
  css/main.css          Design system and all styles (tokens at the top)
  icons/sprite.svg      Every icon on the site, referenced with <use>
  js/boot.js            Tiny script that enables JS-only styles before paint
  js/main.js            App entry point
  js/classes/           One class per behaviour: PartialLoader, Navigation,
                        Dropdown, QuickExit, RevealOnScroll, CounterGroup,
                        Accordion, Tabs, SafetyChecklist, ScrollSpy, BackToTop,
                        ContactForm, ResourceFilter
  favicon.svg
```

Each page loads `partials/header.html` and `partials/footer.html` at runtime via
`fetch()`, so the header and footer only need to be edited in one place.

## Design system

- **Colours** are CSS variables at the top of `assets/css/main.css`: deep plum
  and purple for identity, teal for safety and action, a warm cream background
  and an apricot highlight used sparingly.
- **Type** pairs Fraunces (display headings) with Manrope (body and interface).
- **Icons** live in `assets/icons/sprite.svg`. To use one:
  `<svg class="icon" aria-hidden="true"><use href="assets/icons/sprite.svg#lock"></use></svg>`.
- **Layout** is mobile first and tested at phone (360px), tablet (768px) and
  desktop (1280px+) widths. The full navigation appears from 1180px; below
  that the menu button opens a full-screen menu.

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

Search the codebase for `TODO` and `Image placeholder` to find every spot
marked for your input. In summary:

1. **Images**: every `.ph` block is a labelled empty slot. Replace the whole
   block with an `<img>` tag (with meaningful `alt` text) once you have real
   photos, for example
   `<img src="assets/images/hero.jpg" alt="Young women at a digital safety workshop" />`.
2. **Contact form endpoint** (`contact.html`): currently points to
   `https://formspree.io/f/YOUR_FORM_ID`. Once you have your domain email
   (e.g. `info@yourdomain.org`):
   1. Create a free account at [formspree.io](https://formspree.io).
   2. Create a new form using that email as the recipient.
   3. Copy the endpoint URL Formspree gives you and paste it into the
      `action="..."` attribute of the `<form data-contact-form>` in
      `contact.html`.
   4. Spam protection is already wired up via Formspree's built-in honeypot
      (the hidden `_gotcha` field), so no extra setup is needed.
3. **Malaq support channels** (`get-help.html`, "How Malaq can help"): phone,
   WhatsApp, email and support hours. Only publish channels that are monitored.
4. **Other support services** (`get-help.html`): national GBV helpline, police,
   legal aid and counselling contacts, plus the emergency number in the red
   card. Verify each with a live source before publishing.
5. **Contact channels** (`contact.html`): get help, general, partnerships and
   media addresses (shown as `+256 XXX XXX XXX` and `...@[yourdomain].org`).
6. **Impact figures shown as XX** (`index.html`, `our-work.html`): Malaq's own
   programme results (people reached, survivors supported, sessions, outputs).
   Replace them only with verified figures. To animate a number, add
   `data-count="68" data-suffix="%"` to its `.stat__num` and remove the
   `stat__num--pending` class.

   The Uganda statistics are already filled in with sourced figures (Pollicy
   2020, DataReportal Digital 2026, GSMA Mobile Gender Gap Report 2026). Review
   them each year and update the number, label and source link together.
7. **Team and governance** (`team.html`): leadership photos, names, roles and
   biographies; board and advisors (remove that section if not applicable).
8. **Safeguarding** (`safeguarding.html`): link each policy PDF once approved,
   and add the safeguarding contact email and phone.
9. **Partner logos** (`index.html`, `get-involved.html`): replace the
   placeholders with confirmed partners only.
10. **Resources** (`resources.html`): replace the "Coming soon" cards with real
    documents. Instructions are in a comment at the top of the library.
11. **Social media links**: placeholder `#` links in `partials/footer.html`.
12. **Donations** (`get-involved.html`, funders card): link to a giving page
    once one exists.
13. **Mission and vision** (`about.html`): confirm the final wording with
    leadership.

## Attaching your custom domain

1. Buy your domain (e.g. from Namecheap, GoDaddy, etc.).
2. In the repo, create a file named `CNAME` (no extension) at the project
   root containing just your domain, e.g.:
   ```
   www.malaqimpact.org
   ```
3. In GitHub, under repo **Settings > Pages**, add the same custom domain and
   enable "Enforce HTTPS" once it's available (GitHub provisions a free TLS
   certificate automatically).
4. At your domain registrar, point the domain at GitHub Pages:
   - For an apex domain (`malaqimpact.org`): add `A` records pointing to
     GitHub's Pages IPs (listed in GitHub's Pages custom-domain docs).
   - For a `www` subdomain: add a `CNAME` record pointing to
     `<your-github-username>.github.io`.

Note: this GitHub account already has an account-wide custom domain
(`allans.engineer`) configured, which auto-redirects Pages sites on this
account. Adding this project's own `CNAME` file will override that redirect
for this repo specifically once you're ready to use the NGO's real domain.

## Security notes

- **Content-Security-Policy** is set via a `<meta>` tag in every page
  (restricts scripts/styles/connections to this site, Google Fonts, and
  Formspree). GitHub Pages doesn't let you set real HTTP response headers, so
  this meta-tag CSP is the strongest option available without moving to a
  platform like Cloudflare Pages or Netlify (which support a `_headers` file
  for additional headers like `X-Frame-Options`).
- No inline `<script>`/`onclick=` handlers anywhere, and no inline `style=`
  attributes either (the CSP has no `unsafe-inline`). All JS is in external
  files using `addEventListener`, and all styling is in CSS classes, which
  reduces XSS risk.
- The contact form is spam-protected with Formspree's honeypot field and
  validated client-side, and Formspree itself enforces its own server-side
  protections and submission limits.
- No analytics/tracking scripts and no database, so there's nothing to be
  breached beyond the static files themselves.
- All external links use `rel="noopener noreferrer"`.

## The "Quick Exit" safety feature

A red **Quick exit** button appears in the header on every page. Clicking it
(or pressing `Escape` three times quickly) hides the page instantly and redirects to
`https://www.google.com` and *replaces* the current history entry, so the
back button won't return to this site. This is standard practice on
GBV-support websites. You can change the destination URL by editing
`QuickExit.DESTINATION` in `assets/js/classes/QuickExit.js`.

## Deploying to GitHub Pages

1. Push this repository to GitHub (public repo, so Pages is free).
2. Go to **Settings > Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save. Your site will be live at
   `https://<username>.github.io/<repo-name>/` within a minute or two.
