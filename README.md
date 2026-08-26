# Crumb & Co. — bakery landing page

A one-page site for a neighborhood bakery. Plain HTML, CSS and JavaScript —
no framework, no build step, no dependencies to install.

**Live:** _(add your Vercel URL here once deployed)_

## Files

| File | What's in it |
| --- | --- |
| `index.html` | Markup, meta/Open Graph tags, and the LocalBusiness JSON-LD block |
| `styles.css` | Design tokens, layout, light + dark themes, motion |
| `config.js` | **All business information** — name, phone, hours, prices, menu items |
| `app.js` | Rendering and behaviour: hours table, open/closed pill, WhatsApp links |

## Running it locally

Open `index.html` in a browser — that's it, no server needed.

If you'd rather serve it over HTTP (closer to production):

```bash
python3 -m http.server 5173
```

Then visit `http://localhost:5173`.

## Changing the business details

Almost everything lives in `config.js`: the name, tagline, phone number,
WhatsApp message templates, Instagram handle, address, parking note, opening
hours, the Fresh Today items, and the four service cards with their prices.
Edit that file and reload — the top bar, hero, chips, cards, hours table,
open/closed pill, directions link and footer all follow.

Two things sit outside `config.js` and need editing by hand in `index.html`:

1. The `<title>`, `meta description` and Open Graph tags.
2. The `application/ld+json` block at the bottom of `<head>` — search
   crawlers don't run JavaScript, so the address and opening hours are
   written out statically there. Keep it in sync with `CONFIG.hours`.

### Pictures

Out of the box every picture is drawn in SVG — the display case in the hero
and one illustration per item in the Fresh Today strip. Nothing is downloaded,
so it all works offline and there is no licensing to worry about.

To use real photographs instead, make an `images/` folder next to
`index.html`, drop the files in, and point each item at one in `config.js`:

```js
{ name: "Sourdough", art: "sourdough", photo: "images/sourdough.jpg", note: "Out at 7am" }
```

Any item with a `photo` renders that photo; any item without one falls back to
the drawing, so you can mix the two. Square-ish crops around 600×450 fit the
card best — keep each file under ~200KB. Alt text is generated from the item
name automatically.

### Opening hours

In `config.js`, `hours` is keyed `0` = Sunday through `6` = Saturday, using
24-hour times. `null` means closed that day:

```js
hours: {
  1: null,                              // Monday — closed
  2: { open: "07:00", close: "19:00" }, // Tuesday
}
```

The open/closed pill judges against the **visitor's** clock by default. Set
`timezone: "Asia/Kolkata"` in `config.js` to judge against the shop's local
time instead, so someone browsing from abroad still sees the truth.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. In Vercel, **Add New → Project** and import the repo.
3. Framework Preset: **Other**. Leave Build Command and Output Directory
   empty — it's a static site, there is nothing to build.
4. Deploy.

Every push to the default branch redeploys automatically. Pull requests get
their own preview URL.

### Deploying elsewhere

- **Netlify:** drag the folder onto [Netlify Drop](https://app.netlify.com/drop),
  or connect the repo with no build command.
- **GitHub Pages:** repo Settings → Pages → Deploy from branch → `main` / root.

## Notes

- The only external request is the Google Fonts stylesheet. If it fails, the
  fallback stacks (Georgia for headings, system sans for body) render fine.
- No images — the hero is a CSS gradient with an inline SVG noise overlay, and
  every icon is inline SVG or an emoji.
- Dark mode follows the operating system via `prefers-color-scheme`.
- Scroll-in animation is disabled automatically under `prefers-reduced-motion`.
