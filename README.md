# ☕ CafeArt — *Where Every Cup Is a Masterpiece*

A 3D-animated, single-page website for an artisan coffee roastery. Built with
**vanilla HTML, CSS, and JavaScript** plus a real-time **three.js** hero scene —
no build step and no framework.

![CafeArt](assets/favicon.svg)

---

## ✨ Highlights

- **Interactive 3D hero** — a procedurally-modelled ceramic coffee cup with
  rising GPU-particle steam, a latte-art heart, floating coffee beans, soft
  studio reflections, and drifting dust motes. Built entirely from three.js
  primitives (no external 3D model files).
  - 🖱️ **Drag to spin** the cup, with momentum.
  - 🎯 Mouse **parallax** on the camera and beans.
  - 📜 The cup **tilts as you scroll**, revealing the latte art on top.
- **Graceful fallback** — if WebGL is unavailable, an animated **pure-CSS cup**
  with steam takes its place automatically. The page never shows a blank hero.
- **Rich motion throughout** — animated loader, scroll-reveal sections,
  count-up statistics, an infinite flavour marquee, and a custom cursor.
- **3D tilt menu** — nine drinks rendered as cards that tilt in 3D under the
  cursor with a moving specular glow, plus live category filtering.
- **More sections** — brand story with parallax imagery, a four-step "craft"
  process, a tilting gallery, an auto-rotating testimonial carousel, and a
  validated reservation form.
- **Considerate by default** — fully responsive, keyboard-reachable,
  `prefers-reduced-motion` aware, and touch-friendly (custom cursor and tilt
  effects disable themselves on touch / no-hover devices).

---

## 🚀 Running it

There's no build step. Because the site uses **ES modules** (`<script type="module">`)
and an **import map**, it must be served over HTTP — opening `index.html`
directly from the filesystem (`file://`) will not load the 3D module.

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
│   ├── scene.js               # three.js hero scene (ES module)
│   └── main.js                # UI: loader, cursor, nav, reveals, menu, form…
└── assets/
    └── favicon.svg
```

---

## 🎨 Design notes

- **Palette** — espresso, mocha, caramel, latte, and gold, defined as CSS custom
  properties in `:root` so the whole theme is tunable from one place.
- **Type** — *Playfair Display* (display serif), *Poppins* (body), and *Caveat*
  (handwritten accents), loaded from Google Fonts with full system-font
  fallbacks so the site still reads well if fonts are blocked.
- **The 3D scene** uses `ACESFilmic` tone mapping and a generated
  `RoomEnvironment` for physically-pleasant reflections without shipping any
  HDR files. Rendering pauses automatically when the hero scrolls out of view.

---

## 🔧 Customising

| Want to change… | Where |
| --- | --- |
| Colours / fonts / radii | CSS variables at the top of `css/style.css` |
| Menu items & prices | the `MENU` array in `js/main.js` |
| Testimonials | the `.quote` blocks in `index.html` |
| Hours / address / contact | the `.visit__details` list in `index.html` |
| Cup shape, steam, lighting | constants near the top of `js/scene.js` |

---

## 📦 Third-party

- **[three.js](https://threejs.org) r160** — MIT License. Loaded at runtime from
  the jsDelivr CDN via an ES-module import map. If the CDN is ever blocked, the
  hero falls back to an animated pure-CSS cup, so the page is never broken. To
  ship it fully offline, download `three.module.js` and
  `examples/jsm/environments/RoomEnvironment.js` into a local `js/vendor/`
  folder and point the import map there.
- **Google Fonts** — loaded at runtime; the site degrades gracefully without them.

Imagery in the demo is rendered with CSS gradients and emoji placeholders so the
project ships with zero binary photo assets — swap in your own photography by
setting `background-image` on the `.story__img` and `.gallery__item` rules.

---

*Brewed with ☕ and three.js.*
