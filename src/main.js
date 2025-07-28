var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
// Pac-Man position and speed
var spacing = 40; // distancia entre pellets
var x = spacing;
var y = spacing;
var dx = 2;
var dy = 0;
var radius = 25;
var mouthOpen = true;
var directionAngle = 0; // in radians
var mouthAngle = 0.2 * Math.PI; // current offset from straight ahead
var mouthSpeed = 0.02 * Math.PI; // how fast the mouth opens/closes
var mouthMax = 0.25 * Math.PI; // maximum openness
var mouthMin = 0 * Math.PI; // minimum openness
var pellets = [];
// Crear cuadrícula de pellets
for (var row = spacing; row < canvas.height; row += spacing) {
    for (var col = spacing; col < canvas.width; col += spacing) {
        pellets.push({ x: col, y: row, eaten: false });
    }
}
// Handle key press (WASD + Arrow Keys)
window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
            dx = 0;
            dy = -2;
            directionAngle = -0.5 * Math.PI; // up
            break;
        case "ArrowDown":
        case "s":
        case "S":
            dx = 0;
            dy = 2;
            directionAngle = 0.5 * Math.PI; // down
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            dx = -2;
            dy = 0;
            directionAngle = Math.PI; // left
            break;
        case "ArrowRight":
        case "d":
        case "D":
            dx = 2;
            dy = 0;
            directionAngle = 0; // right
            break;
    }
});
// Game loop
function gameLoop() {
    // Clear
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // Debug: draw grid for test
    // for (let i = spacing; i < canvas.width; i += spacing) {
    //   ctx.strokeStyle = "gray";
    //   ctx.beginPath();
    //   ctx.moveTo(i, 0);
    //   ctx.lineTo(i, canvas.height);
    //   ctx.stroke();
    // }
    // for (let i = spacing; i < canvas.height; i += spacing) {
    //   ctx.beginPath();
    //   ctx.moveTo(0, i);
    //   ctx.lineTo(canvas.width, i);
    //   ctx.stroke();
    // }
    // Dibujar pellets
    ctx.fillStyle = "white";
    for (var _i = 0, pellets_1 = pellets; _i < pellets_1.length; _i++) {
        var pellet = pellets_1[_i];
        if (!pellet.eaten) {
            ctx.beginPath();
            ctx.arc(pellet.x, pellet.y, 6, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    // Animate mouth
    if (mouthOpen) {
        mouthAngle += mouthSpeed;
        if (mouthAngle >= mouthMax)
            mouthOpen = false;
    }
    else {
        mouthAngle -= mouthSpeed;
        if (mouthAngle <= mouthMin)
            mouthOpen = true;
    }
    // Draw Pac-Man
    ctx.save(); // Save current drawing state
    ctx.translate(x, y); // Move origin to Pac-Man's center
    ctx.rotate(directionAngle); // Rotate everything that follows
    ctx.beginPath();
    ctx.fillStyle = "yellow";
    ctx.arc(0, 0, radius, mouthAngle, 2 * Math.PI - mouthAngle);
    ctx.lineTo(0, 0);
    ctx.fill();
    ctx.restore(); // Reset the rotation + translation
    // Move
    x += dx;
    y += dy;
    // Boundaries
    if (x - radius < 0)
        x = radius;
    if (x + radius > canvas.width)
        x = canvas.width - radius;
    if (y - radius < 0)
        y = radius;
    if (y + radius > canvas.height)
        y = canvas.height - radius;
    // 2) snap to grid on turns
    if (dy === 0) {
        var row = Math.round(y / spacing);
        y = row * spacing;
    }
    if (dx === 0) {
        var col = Math.round(x / spacing);
        x = col * spacing;
    }
    // 3) boundaries & rest of loop…
    requestAnimationFrame(gameLoop);
}
gameLoop();
