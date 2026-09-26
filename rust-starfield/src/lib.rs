//! Minimal WASM starfield: a fixed-capacity particle buffer updated per
//! frame in Rust, read directly out of linear memory by the JS canvas
//! renderer. No wasm-bindgen — a handful of `extern "C"` exports and a
//! raw f32 buffer is all this needs.

const MAX_STARS: usize = 320;

struct Star {
    x: f32,
    y: f32,
    speed: f32,
    size: f32,
    phase: f32,
}

struct State {
    stars: Vec<Star>,
    /// Interleaved [x, y, size, twinkle] per star, read from JS.
    positions: Vec<f32>,
    width: f32,
    height: f32,
}

static mut STATE: Option<State> = None;

fn xorshift(seed: &mut u32) -> u32 {
    let mut x = *seed;
    x ^= x << 13;
    x ^= x >> 17;
    x ^= x << 5;
    *seed = x;
    x
}

fn rand_f32(seed: &mut u32) -> f32 {
    (xorshift(seed) as f32) / (u32::MAX as f32)
}

/// Allocates `count` stars (capped at MAX_STARS) scattered across
/// `width` x `height`, and returns a pointer to the positions buffer.
#[unsafe(no_mangle)]
pub extern "C" fn init(count: u32, width: f32, height: f32, seed: u32) -> *const f32 {
    let n = (count as usize).min(MAX_STARS);
    let mut s = seed.max(1);

    let mut stars = Vec::with_capacity(n);
    for _ in 0..n {
        stars.push(Star {
            x: rand_f32(&mut s) * width,
            y: rand_f32(&mut s) * height,
            speed: 6.0 + rand_f32(&mut s) * 18.0,
            size: 0.6 + rand_f32(&mut s) * 1.8,
            phase: rand_f32(&mut s) * 6.283,
        });
    }

    let positions = vec![0.0f32; n * 4];
    let ptr = positions.as_ptr();

    unsafe {
        STATE = Some(State { stars, positions, width, height });
    }
    ptr
}

/// Advances every star by `dt` seconds and refreshes the positions buffer.
#[unsafe(no_mangle)]
pub extern "C" fn tick(dt: f32, elapsed: f32) {
    let state_opt: &mut Option<State> = unsafe { &mut *(&raw mut STATE) };
    let Some(state) = state_opt.as_mut() else {
        return;
    };
    let h = state.height;
    for (i, star) in state.stars.iter_mut().enumerate() {
        star.y += star.speed * dt;
        if star.y > h + 4.0 {
            star.y = -4.0;
        }
        let twinkle = 0.5 + 0.5 * libm_sin(elapsed * 1.6 + star.phase);
        let base = i * 4;
        state.positions[base] = star.x;
        state.positions[base + 1] = star.y;
        state.positions[base + 2] = star.size;
        state.positions[base + 3] = twinkle;
    }
}

/// Updates the viewport bounds stars wrap against, on window resize.
#[unsafe(no_mangle)]
pub extern "C" fn resize(width: f32, height: f32) {
    let state_opt: &mut Option<State> = unsafe { &mut *(&raw mut STATE) };
    if let Some(state) = state_opt.as_mut() {
        state.width = width;
        state.height = height;
    }
}

// A tiny sine approximation (Bhaskara I) so this crate stays dependency-free —
// good enough for a twinkle effect, not for anything precision-sensitive.
fn libm_sin(x: f32) -> f32 {
    let pi = core::f32::consts::PI;
    let mut x = x % (2.0 * pi);
    if x < 0.0 {
        x += 2.0 * pi;
    }
    let (x, sign) = if x > pi { (x - pi, -1.0) } else { (x, 1.0) };
    sign * (16.0 * x * (pi - x)) / (5.0 * pi * pi - 4.0 * x * (pi - x))
}
