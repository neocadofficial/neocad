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

## Before this goes live — things to fill in

Search the project for `EDIT` to find every spot marked, or just check this list:

- [ ] **Contact info** — `hello@neocadprints.com` and the `@neocad.prints` Instagram/TikTok
      handles are placeholders. They're in the footer of every page, plus the
      order box on `shop.html`. Find-and-replace across all six HTML files.
- [ ] **Fitment years/trims** — `shop.html` currently says "2013–2024 BRZ / FR-S / 86
      (ZC6 / ZN6), manual transmission." Confirm this is right.
- [ ] **Install time & lead time** — placeholder estimates on `shop.html`, marked with
      `EDIT` comments.
- [ ] **Blog bio** — the intro paragraph on `blog.html` is generic on purpose. Swap in
      your own words (name is optional).
- [ ] Swap the eyebrow tag / lede copy anywhere you want a more personal voice —
      everything's plain text in the HTML, no templating to fight.

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
