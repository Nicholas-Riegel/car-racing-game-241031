import * as Road from './road.js';

// CREATE CANVAS
const canvas = document.getElementById('canvas'); 
const ctx = canvas.getContext('2d'); 
const canvasCenterX = canvas.width / 2;

// GAME STATUS
let isGameOver = false;



// DRAW CAR
const carWidth = 30; 
const carHeight = 50; 
let carX = canvasCenterX - carWidth / 2;
let carY = canvas.height - carHeight - 20; 

function drawCar() {
    ctx.fillStyle = 'blue'; 
    ctx.fillRect(carX, carY, carWidth, carHeight); 
}

// MOVE CAR
let speed = 4; 
const keysPressed = {}; 

document.addEventListener('keydown', e => keysPressed[e.key] = true);
document.addEventListener('keyup', e => keysPressed[e.key] = false);

function updateCarPosition() {
    if (isGameOver) return; // Prevent car movement if the game is over

    if (keysPressed['ArrowUp'] && carY > 0) {
        carY -= speed;
    }
    if (keysPressed['ArrowDown'] && carY < canvas.height - carHeight) { 
        carY += speed;
    }
    if (keysPressed['ArrowLeft'] && carX > canvasCenterX - roadWidth / 2) { 
        carX -= speed;
    }
    if (keysPressed['ArrowRight'] && carX < canvasCenterX + roadWidth / 2 - carWidth) {
        carX += speed;
    }
}

// DISPLAY GAME OVER MESSAGE
function displayGameOver() {
    const newHeading = document.createElement('h2');
    newHeading.textContent = 'Game Over! Press Space to Restart';
    const firstHeading = document.getElementsByTagName('h1')[0];
    firstHeading.insertAdjacentElement('afterend', newHeading);
}

// RESTART GAME
function resetGame() {
    const newHeading = document.getElementsByTagName('h2')[0];
    if (newHeading) newHeading.remove();
    carX = canvasCenterX - carWidth / 2;
    carY = canvas.height - carHeight - 20;
    enemyCars = [];
    isGameOver = false;
    updateGame(); // Restart the game loop
}

document.addEventListener('keydown', e => {
    if (e.key === ' ' && isGameOver) {
        resetGame();
    }
});

// ENEMY CARS
const enemyWidth = 30;
const enemyHeight = 50;
let enemySpeed = 2;
let enemyCars = [];

function addEnemyCar() {
    const x = canvasCenterX - roadWidth / 2 + Math.random() * (roadWidth - enemyWidth);
    const y = -enemyHeight;
    enemyCars.push({ x, y });
}

function updateEnemyCars() {
    if (isGameOver) return; // Prevent car movement if the game is over
    for (let i = enemyCars.length - 1; i >= 0; i--) {
        enemyCars[i].y += enemySpeed;

        if (enemyCars[i].y > canvas.height) {
            enemyCars.splice(i, 1);
        }
    }
}

// COLLISION DETECTION
function checkCollisions() {
    for (let i = 0; i < enemyCars.length; i++) {
        if (
            carX < enemyCars[i].x + enemyWidth &&  
            carX + carWidth > enemyCars[i].x &&    
            carY < enemyCars[i].y + enemyHeight && 
            carY + carHeight > enemyCars[i].y      
        ) {
            isGameOver = true; // Set the game over flag
        }
    }
}

// LOOP GAME
function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the entire canvas to prepare for redrawing.

    Road.drawRoad();
    drawCar(); 
    updateCarPosition(); 
    updateEnemyCars();
    checkCollisions();

    
    // Add new enemy cars at intervals
    if (Math.random() < 0.02) {
        addEnemyCar();
    }
    
    // Draw enemy cars
    for (let i = 0; i < enemyCars.length; i++) {
        ctx.fillStyle = 'red';
        ctx.fillRect(enemyCars[i].x, enemyCars[i].y, enemyWidth, enemyHeight);
    }
    
    lineOffset -= 5; // Move the dashed line to simulate road movement
    
    // If game is over, display the message and freeze everything
    if (isGameOver) {
        displayGameOver();
        return; // Stop the game loop without clearing canvas
    }
    
    requestAnimationFrame(updateGame); 
}

// START GAME
updateGame();
