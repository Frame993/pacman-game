const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!; // <-- 👈 non-null assertion here

if (!ctx) {
  throw new Error("Canvas not supported");
}

// Pac-Man position
let x = 50;
let y = 300;
const radius = 25;
const speed = 2;

// Animation loop
function gameLoop() {
  // Clear canvas
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Pac-Man
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(x, y, radius, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(x, y);
  ctx.fill();

  // Update position
  x += speed;

  // Loop the animation
  requestAnimationFrame(gameLoop);
}

// Start the loop
gameLoop();
