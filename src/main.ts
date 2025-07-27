const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Pac-Man position and speed
let x = 50;
let y = 300;

const radius = 25;
let mouthOpen = true;
let mouthAngle = 0.2 * Math.PI; // current offset from straight ahead
const mouthSpeed = 0.02 * Math.PI; // how fast the mouth opens/closes
const mouthMax = 0.25 * Math.PI; // maximum openness
const mouthMin = 0 * Math.PI; // minimum openness

let dx = 2;
let dy = 0;

// Handle key press (WASD + Arrow Keys)
window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case "w":
    case "W":
      dx = 0;
      dy = -2;
      break;
    case "ArrowDown":
    case "s":
    case "S":
      dx = 0;
      dy = 2;
      break;
    case "ArrowLeft":
    case "a":
    case "A":
      dx = -2;
      dy = 0;
      break;
    case "ArrowRight":
    case "d":
    case "D":
      dx = 2;
      dy = 0;
      break;
  }
});

// Game loop
function gameLoop() {
  // Clear
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Animate mouth
  if (mouthOpen) {
    mouthAngle += mouthSpeed;
    if (mouthAngle >= mouthMax) mouthOpen = false;
  } else {
    mouthAngle -= mouthSpeed;
    if (mouthAngle <= mouthMin) mouthOpen = true;
  }

  // Draw Pac-Man
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(x, y, radius, mouthAngle, 2 * Math.PI - mouthAngle);
  ctx.lineTo(x, y);
  ctx.fill();

  // Move
  x += dx;
  y += dy;

  // Boundaries
  if (x - radius < 0) x = radius;
  if (x + radius > canvas.width) x = canvas.width - radius;
  if (y - radius < 0) y = radius;
  if (y + radius > canvas.height) y = canvas.height - radius;

  requestAnimationFrame(gameLoop);
}

gameLoop();
