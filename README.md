# ☕ CafeArt — *Where Every Cup Is a Masterpiece*

A cinematic, single-page website for an artisan coffee roastery. Built with
**vanilla HTML, CSS, and JavaScript** — no build step, no framework — fronted by
a full-bleed **looping video hero** of roasting coffee.

![CafeArt](assets/favicon.svg)

---

## ✨ Highlights

- **Cinematic video hero** — full-screen, auto-playing, muted loop of roasting
  beans with a slow Ken-Burns drift, a warm colour grade, and a left-weighted
  scrim that keeps the headline crisp over the footage.
  - 🖼️ A **poster frame** loads instantly and stands in if the video is still
    buffering, autoplay is blocked, or the file can't be fetched — the hero is
    never blank.
  - 🎬 Honours `prefers-reduced-motion`: the loop holds a still frame instead.
- **Rich motion throughout** — animated loader, scroll-reveal sections,
  count-up statistics, an infinite flavour marquee, and a custom cursor.
- **3D-tilt menu** — nine drinks rendered as cards that tilt in 3D (CSS
  transforms) under the cursor with a moving specular glow, plus live category
  filtering.
- **More sections** — brand story with parallax imagery, a four-step "craft"
  process, a tilting gallery, an auto-rotating testimonial carousel, and a
  validated reservation form.
- **Considerate by default** — fully responsive, keyboard-reachable,
  `prefers-reduced-motion` aware, and touch-friendly (custom cursor and tilt
  effects disable themselves on touch / no-hover devices).

---

## 🚀 Running it

There's no build step. Serve the folder over HTTP (autoplay and relative asset
paths behave most reliably that way):

```bash
# from the project root, pick any static server:
python3 -m http.server 8000
#   or
npx serve .
```

Then open <http://localhost:8000>.

### Deploying

It's a static site — drop the whole folder onto **GitHub Pages**, **Netlify**,
**Vercel**, **Cloudflare Pages**, or any static host. No configuration needed.

---

## 🗂️ Project structure

```
CafeArt/
├── index.html                 # markup for every section
├── css/
│   └── style.css              # design tokens, layout, all CSS animations
├── js/
│   └── main.js                # UI: loader, cursor, nav, reveals, menu, form…
└── assets/
    ├── hero.mp4               # looping hero footage (H.264, web-optimised)
    ├── hero-poster.jpg        # first-frame poster / fallback
    └── favicon.svg
```

---

## 🎨 Design notes

- **Palette** — espresso, mocha, caramel, latte, and gold, defined as CSS custom
  properties in `:root` so the whole theme is tunable from one place.
- **Type** — *Playfair Display* (display serif), *Poppins* (body), and *Caveat*
  (handwritten accents), loaded from Google Fonts with full system-font
  fallbacks so the site still reads well if fonts are blocked.
- **The hero video** is encoded as a web-optimised H.264 MP4 with `+faststart`
  (so playback can begin before the whole file downloads), audio stripped, and a
  matching JPG poster. The `<video>` is `muted`/`playsinline` so mobile browsers
  autoplay it. A CSS scrim + vignette sit between the footage and the text.

---

## 🔧 Customising

| Want to change… | Where |
| --- | --- |
| Colours / fonts / radii | CSS variables at the top of `css/style.css` |
| Hero footage | replace `assets/hero.mp4` + `assets/hero-poster.jpg` |
| Scrim / colour grade | `.hero__scrim` / `.hero__video` in `css/style.css` |
| Menu items & prices | the `MENU` array in `js/main.js` |
| Testimonials | the `.quote` blocks in `index.html` |
| Hours / address / contact | the `.visit__details` list in `index.html` |

### Swapping the hero video

Any landscape clip works. To match the optimised encode used here:

```bash
# compress for web (no audio, fast-start, ~CRF 27)
ffmpeg -i your-clip.mp4 -map 0:v:0 -c:v libx264 -profile:v high \
  -crf 27 -preset slow -pix_fmt yuv420p -movflags +faststart assets/hero.mp4

# grab a poster frame (~2s in)
ffmpeg -ss 2 -i your-clip.mp4 -frames:v 1 -q:v 3 assets/hero-poster.jpg
```

---

## 📦 Third-party

- **Hero footage** — a looping clip of roasting coffee beans, encoded with
  `ffmpeg`. Swap in your own (see above).
- **Google Fonts** — loaded at runtime; the site degrades gracefully without them.

The rest of the imagery is rendered with CSS gradients and emoji placeholders so
the project ships with (almost) zero binary assets — swap in your own photography
by setting `background-image` on the `.story__img` and `.gallery__item` rules.

---

*Brewed with ☕.*
