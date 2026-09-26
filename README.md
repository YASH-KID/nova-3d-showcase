# NOVA — Interactive 3D Sneaker Showcase

A concept product page built to demonstrate real-time 3D on the web: a
cursor-reactive, scroll-driven sneaker with a live material configurator,
a Rust/WebAssembly particle background, and a Go serverless API — all on
one static-friendly stack deployed to Vercel.

**[Live demo →](#)** _(add your Vercel URL here after deploying)_

## What's actually real here

NOVA isn't a shoe you can buy — it's a portfolio piece. But nothing on it
is faked for show:

- The 3D shoe is a genuine glTF asset (see **Credits** below), not a static
  image — it's lit, shaded, and rotated in real time by Three.js.
- The three colorways are baked into the model via the `KHR_materials_variants`
  glTF extension and swapped live on the GPU — no reload, no separate models.
- The starfield behind the hero text is computed frame-by-frame in Rust,
  compiled to a 21KB WebAssembly module, and drawn to a `<canvas>` — not a
  CSS animation or a GIF.
- The "Notify Me" form posts to a real Go serverless function
  (`api/subscribe.go`) that validates the email server-side. Nothing is
  persisted — this is a concept project — but the round trip is real.

## Stack

| Layer | Tech | Why |
|---|---|---|
| UI | React 19 + TypeScript + Vite | Fast dev loop, typed components |
| 3D | Three.js via `@react-three/fiber` + `@react-three/drei` | Standard for real-time 3D in React |
| Motion | GSAP + ScrollTrigger | Scroll-linked camera/rotation choreography |
| Styling | Tailwind CSS v4 | Utility-first, no build-step config needed |
| Background FX | Rust → WebAssembly (no wasm-bindgen) | A genuinely perf-sensitive piece, kept dependency-free |
| API | Go (Vercel serverless function) | Real server-side validation for the signup form |
| Hosting | Vercel | Zero-config static + serverless deploys from GitHub |

## Project structure

```
nova-3d-showcase/
├─ src/
│  ├─ components/       → React components (Hero, Colorways, FAQ, etc.)
│  ├─ lib/               → small shared helpers (variant color map)
│  ├─ App.tsx            → page assembly + shared colorway state
│  └─ index.css          → Tailwind + design tokens (colors, fonts)
├─ public/
│  ├─ models/shoe.glb    → the 3D sneaker asset (see Credits)
│  └─ wasm/starfield.wasm→ compiled output of rust-starfield/
├─ rust-starfield/       → Rust source for the WASM particle background
├─ api/subscribe.go      → Go serverless function for the signup form
└─ go.mod
```

## Running it locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` (or the next free port). The `/api/subscribe`
endpoint only runs once deployed to Vercel — locally the form will show a
"could not reach the server" message, which is expected.

### Rebuilding the Rust starfield

Only needed if you edit `rust-starfield/src/lib.rs`:

```bash
cd rust-starfield
rustup target add wasm32-unknown-unknown   # once
cargo build --release --target wasm32-unknown-unknown
cp target/wasm32-unknown-unknown/release/rust_starfield.wasm ../public/wasm/starfield.wasm
```

## Deploying

The Vercel CLI is already a dev dependency here — just log in once:

```bash
npx vercel login        # once, opens a browser
npx vercel              # deploy a preview
npx vercel --prod       # deploy to production
```

Vercel auto-detects the Vite frontend and the Go function under `api/` with
no extra configuration.

## Credits

3D model: **"Materials Variants Shoe"**, © 2020 Shopify, Inc., licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), via the
[Khronos glTF Sample Assets](https://github.com/KhronosGroup/glTF-Sample-Models).

Built by [Yash Malhotra](https://github.com/YASH-KID).
