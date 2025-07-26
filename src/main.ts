const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Canvas not supported");
}

// Set canvas background color (for testing)
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

// Draw Pac-Man
ctx.beginPath();
ctx.fillStyle = "yellow";
ctx.arc(300, 300, 25, 0.2 * Math.PI, 1.8 * Math.PI); // mouth open
ctx.lineTo(300, 300); // connect back to center
ctx.fill();
