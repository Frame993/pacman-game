const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

// Pac-Man position and speed
let x = 50;
let y = 300;
const radius = 25;
let dx = 2;
let dy = 0;

// Handle key press
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
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw Pac-Man
  ctx.beginPath();
  ctx.fillStyle = "yellow";
  ctx.arc(x, y, radius, 0.2 * Math.PI, 1.8 * Math.PI);
  ctx.lineTo(x, y);
  ctx.fill();

  // Update position
  x += dx;
  y += dy;

  requestAnimationFrame(gameLoop);
}

gameLoop();
