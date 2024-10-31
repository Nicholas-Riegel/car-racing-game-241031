// CREATE ROAD
const roadWidth = 300; 
const lineHeight = 20; 
const lineGap = 30; 

let lineOffset = 0; // Offset for the dashed line animation

function drawRoad() {
    ctx.fillStyle = '#000'; 
    ctx.fillRect(canvasCenterX - roadWidth / 2, 0, roadWidth, canvas.height);
    ctx.strokeStyle = '#FFF'; // Set the stroke color to white for the dashed line.
    ctx.lineWidth = 5; 
    ctx.setLineDash([lineHeight, lineGap]); 
    ctx.lineDashOffset = lineOffset; // Set the dash offset for animation
    ctx.beginPath(); // Begin a new path for the dashed line.
    ctx.moveTo(canvasCenterX, 0); // Start the line at the top center of the canvas.
    ctx.lineTo(canvasCenterX, canvas.height); // Draw the line down to the bottom of the canvas.
    ctx.stroke(); // Render the dashed line on the canvas.
}