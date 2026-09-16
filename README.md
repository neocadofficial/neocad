# NeoCAD site

Plain HTML, CSS, and JavaScript — no build step, no framework, no dependencies.
Every page works by just opening the `.html` file, and the whole thing is
ready to push straight into a GitHub repo for GitHub Pages hosting.

## Structure

```
index.html          Home
shop.html            Product page — the bushing set
pricing.html         Rate tables + the live quote estimator
equipment.html       Printer fleet + scanner + materials
blog.html            Blog index
blog/first-drop.html First blog post (the release story)
assets/css/style.css All styling
assets/js/main.js    Nav, search, gallery, and the pricing estimator
assets/img/          Logo + product photos
```

## September 2026 update — install into the existing repository

Copy this folder into the matching locations in your existing repository.
Merge folders and keep your existing `assets/js/main.js`, which was not supplied.
The six HTML pages, stylesheet, supplied images, and new pricing script are included.
This is a drop-in update, not a complete standalone site archive.

The index footer is now shared across the six pages, with working
email and Instagram links. Header logos now include bold NeoCAD text.
Equipment illustrations are generic inline SVGs, not model-specific photos.

Material rates round upward to whole cents per gram. The estimator uses the
same rates and a $10 minimum before shipping and tax. It has separate element
IDs so the original main.js estimator does not initialize on this page.
Formula: material + 5% material markup + machine time, then 5% production
contingency on that sum, plus hands-on labor; apply $10 minimum, add shipping.
Dryer time and tax remain part of the confirmed quote, not this estimator.

Before publishing, confirm the existing fitment years/chassis labels and
3–5 business day lead time on shop.html. The blog post now shares the updated header and footer with correct relative links.
Preview with the repository's original main.js before deploying to check
navigation, search, gallery behavior, and pricing integration.

## Adding a new blog post later

1. Copy `blog/first-drop.html` to `blog/your-slug.html` and edit the content.
2. Add a card for it on `blog.html`.
3. Add a line to the `SEARCH_INDEX` array near the top of `assets/js/main.js` so
   it shows up in search.

## Adding a new product later

Same idea — duplicate `shop.html`, add a nav/footer link if it should be
in the main nav, add it to `SEARCH_INDEX`.

## Previewing locally

No build step needed — just open `index.html` in a browser. If a browser
blocks local file access for the search overlay or gallery script, run a
tiny local server instead:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Deploying to GitHub Pages

1. Create a new **public** GitHub repository (GitHub Pages on a free personal
   account requires the repo to be public — private repo Pages needs GitHub Pro).
2. Push this folder's contents to the `main` branch.
3. In the repo, go to **Settings → Pages**, set **Source** to "Deploy from a
   branch," branch `main`, folder `/ (root)`.
4. The site publishes at `https://<username>.github.io/<repo-name>/`.
5. Optional: add a custom domain under **Settings → Pages → Custom domain** —
   free on every GitHub plan, including the free tier.

All the links in this project use relative paths, so it works the same
whether it's served from a domain root or from a `/repo-name/` subpath —
no changes needed either way.
