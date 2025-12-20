// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

const hero = document.querySelector(".hero");
const sparksCanvas = document.getElementById("sparks");
const ctx = sparksCanvas.getContext("2d", { alpha: true });

let W = 0, H = 0;
let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

function resize() {
  const r = hero.getBoundingClientRect();
  W = Math.floor(r.width);
  H = Math.floor(r.height);

  sparksCanvas.width = Math.floor(W * dpr);
  sparksCanvas.height = Math.floor(H * dpr);
  sparksCanvas.style.width = W + "px";
  sparksCanvas.style.height = H + "px";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener("resize", resize);
resize();

/**
 * WELD ORIGIN (IMPORTANT)
 * This is set under the truck frame area so it does NOT look like you're welding a tire.
 * If your photo crops differently, tweak these multipliers slightly.
 */
const weld = {
  x: () => W * 0.28, // move right = increase
  y: () => H * 0.73  // move down = increase
};

// Parallax state
let targetPX = 0, targetPY = 0;
let px = 0, py = 0;
let scrollPar = 0;

// Mouse parallax
window.addEventListener("mousemove", (e) => {
  const r = hero.getBoundingClientRect();
  const mx = (e.clientX - r.left) / r.width; // 0..1
  const my = (e.clientY - r.top) / r.height; // 0..1
  targetPX = (mx - 0.5);
  targetPY = (my - 0.5);
}, { passive: true });

// Scroll parallax
window.addEventListener("scroll", () => {
  scrollPar = (window.scrollY || 0) * 0.00008;
}, { passive: true });

// MIG particles
const sparks = [];
let burstTimer = 0;

// MIG: directional bursts (not constant fireworks)
function spawnBurst() {
  const originX = weld.x();
  const originY = weld.y();

  const count = 18 + Math.floor(Math.random() * 18); // 18–36 sparks
  for (let i = 0; i < count; i++) {
    // Sparks fan down-left, with spread
    const angle = (-Math.PI * 0.85) + (Math.random() * 0.55);
    const speed = 6 + Math.random() * 10;

    sparks.push({
      x: originX + (Math.random() * 8 - 4),
      y: originY + (Math.random() * 6 - 3),
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      g: 0.42 + Math.random() * 0.18,
      life: 18 + Math.random() * 22,
      len: 8 + Math.random() * 14,
      hot: 1
    });
  }
}

// Blue-white arc flash
function drawArcFlash(x, y, intensity) {
  const r1 = 22 * intensity;

  const grd = ctx.createRadialGradient(x, y, 0, x, y, r1);
  grd.addColorStop(0, `rgba(235, 250, 255, ${0.90 * intensity})`);
  grd.addColorStop(0.35, `rgba(120, 205, 255, ${0.50 * intensity})`);
  grd.addColorStop(1, `rgba(120, 205, 255, 0)`);

  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(x, y, r1, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = `rgba(255,255,255,${0.9 * intensity})`;
  ctx.beginPath();
  ctx.arc(x, y, 3.0 * intensity, 0, Math.PI * 2);
  ctx.fill();
}

function tick() {
  // Smooth parallax easing
  px += (targetPX - px) * 0.08;
  py += (targetPY - py) * 0.08;

  // Background parallax (slow)
  // move background position slightly with mouse + scroll
  const bgX = 50 + (px * 3.5);
  const bgY = 50 + (py * 3.0) + (scrollPar * 100);
  hero.style.backgroundPosition = `${bgX}% ${bgY}%`;

  // Clear sparks layer
  ctx.clearRect(0, 0, W, H);

  // Sparks parallax (faster = closer depth)
  const sx = px * 18;
  const sy = py * 14 + scrollPar * 220;

  const ox = weld.x() + sx;
  const oy = weld.y() + sy;

  // MIG flicker
  const flicker = 0.25 + Math.random() * 0.35;
  const spike = (Math.random() < 0.14) ? (0.75 + Math.random() * 0.6) : 0;
  const arcIntensity = Math.min(1.0, flicker + spike);

  // Burst cadence
  if (burstTimer <= 0) {
    spawnBurst();
    if (Math.random() < 0.22) setTimeout(spawnBurst, 55); // occasional quick double
    burstTimer = 90 + Math.random() * 180;
  } else {
    burstTimer -= 16.7;
  }

  // Arc flash at the weld point
  drawArcFlash(ox, oy, arcIntensity);

  // Draw sparks (streaks)
  for (let i = sparks.length - 1; i >= 0; i--) {
    const s = sparks[i];

    // Update motion
    s.x += s.vx * 0.9;
    s.y += s.vy * 0.9;
    s.vy += s.g;
    s.vx *= 0.985; // drag
    s.vy *= 0.992;

    s.life -= 1.0;
    s.hot *= 0.965;

    const t = Math.max(0, s.life / 40);
    const alpha = Math.min(1, 0.9 * t);

    // Color: white-hot -> amber -> ember
    const r = 255;
    const g = Math.floor(220 - (1 - t) * 120);
    const b = Math.floor(90 - (1 - t) * 80);

    // Streak opposite velocity
    const mag = Math.max(0.001, Math.hypot(s.vx, s.vy));
    const nx = s.vx / mag;
    const ny = s.vy / mag;

    const x1 = s.x + sx;
    const y1 = s.y + sy;
    const x2 = x1 - nx * s.len;
    const y2 = y1 - ny * s.len;

    ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
    ctx.lineWidth = 2.0;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();

    // Ember dot
    ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.75})`;
    ctx.beginPath();
    ctx.arc(x1, y1, 1.2, 0, Math.PI * 2);
    ctx.fill();

    // Kill old particles
    if (s.life <= 0 || y1 > H + 80 || x1 < -120 || x1 > W + 120) {
      sparks.splice(i, 1);
    }
  }

  requestAnimationFrame(tick);
}

tick();
