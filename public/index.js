const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const playerNameInput = document.getElementById("playerName");
const startButton = document.getElementById("startButton");
const restartButton = document.getElementById("restartButton");

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;
let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;
let appleX = 5;
let appleY = 5;
let inputsXVelocity = 0;
let inputsYVelocity = 0;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let playerName = '';

const gulpSound = new Audio("zvuk.mp3");

startButton.addEventListener("click", () => {
    playerName = playerNameInput.value.trim();
    if (playerName) {
        startButton.classList.add("hidden");
        playerNameInput.classList.add("hidden");
        canvas.classList.remove("hidden");
        restartButton.classList.remove("hidden");
        drawGame();
    } else {
        alert("Zadejte prosím své jméno");
    }
});

function drawGame() {
    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    changeSnakePosition();
    let result = isGameOver();
    if (result) {
        return;
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();

    if (score > 5) {
        speed = 9;
    }
    if (score > 10) {
        speed = 11;
    }

    setTimeout(drawGame, 1000 / speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    if (headX < 0 || headX >= tileCount || headY < 0 || headY >= tileCount) {
        gameOver = true;
    }

    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if (gameOver) {
        saveScore(score);
        alert("Game Over! Your score was " + score);
    }

    return gameOver;
}

async function saveScore(score) {
    try {
        const response = await fetch('http://localhost:3000/api/scores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: playerName, score }) // Přidáváme jméno hráče
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Jablicek " + score, canvas.width - 60, 10);
}

function clearScreen() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        snakeParts.shift();
    }

    ctx.fillStyle = "orange";
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = "red";
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

function checkAppleCollision() {
    if (appleX === headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        tailLength++;
        score++;
        gulpSound.play();
    }
}

function keyDown(event) {
    if (event.keyCode == 38 || event.keyCode == 87) {
        if (inputsYVelocity == 1) return;
        inputsYVelocity = -1;
        inputsXVelocity = 0;
    }

    if (event.keyCode == 40 || event.keyCode == 83) {
        if (inputsYVelocity == -1) return;
        inputsYVelocity = 1;
        inputsXVelocity = 0;
    }

    if (event.keyCode == 37 || event.keyCode == 65) {
        if (inputsXVelocity == 1) return;
        inputsYVelocity = 0;
        inputsXVelocity = -1;
    }

    if (event.keyCode == 39 || event.keyCode == 68) {
        if (inputsXVelocity == -1) return;
        inputsYVelocity = 0;
        inputsXVelocity = 1;
    }

}
loadHighScores();
async function loadHighScores() {
    try {
        const response = await fetch('http://localhost:3000/api/scores');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const highScores = await response.json();
        const highScoreList = document.getElementById("highScoreList");
        highScoreList.innerHTML = highScores.map(score => `<tr><td>${score.name}</td><td>${score.score}</td></tr>`).join('');
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}

function restartGame() {
    speed = 7;
    tileCount = 20;
    tileSize = canvas.width / tileCount - 2;
    headX = 10;
    headY = 10;
    snakeParts.length = 0;
    tailLength = 2;
    appleX = 5;
    appleY = 5;
    inputsXVelocity = 0;
    inputsYVelocity = 0;
    xVelocity = 0;
    yVelocity = 0;
    score = 0;

    clearScreen();
    drawGame();
}
console.log('Sending score:', { name: 'Player', score });

document.body.addEventListener("keydown", keyDown);
restartButton.addEventListener("click", restartGame);
