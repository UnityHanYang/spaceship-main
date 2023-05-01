let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 700;
document.body.appendChild(canvas);

let background, spaceship, bullet, enemy, gameover, enemybullet;
let gameOver = false;
let score = 0;
let spaceshipX = canvas.width / 2 - 33;
let spaceshipY = canvas.height - 64;

let bulletList = [];
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        this.x = spaceshipX + 20;
        this.y = spaceshipY;
        this.alive = true;
        bulletList.push(this);
    };
    this.update = function () {
        this.y -= 7;
    };
    this.checkHit = function () {
        for (let i = 0; i < enemyList.length; i++) {
            if (this.y <= enemyList[i].y && this.x >= enemyList[i].x && this.x <= enemyList[i].x + 60) {
                score += 1;
                this.alive = false;
                enemyList.splice(i, 1);
            }
        }
    };
}

function generateRandomValue(min, max) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
}

let enemyList = [];

function Enemy() {
    this.x = 0;
    this.y = 0;
    this.enemycount = function (speed1, speed2) {
        
    }
    this.init = function () {
        this.y = 0;
        this.x = generateRandomValue(0, canvas.width - 60);
        enemyList.push(this);
    };
    this.update = function () {
        this.y += 3;
        let intervalId = setInterval(function () {
            
        }, 2000);
        if (this.y > canvas.height-66) {
            gameOver = true;
        }
    };
}

function LoadImage() {
    background = new Image();
    background.src = "img/background.jpg";

    spaceship = new Image();
    spaceship.src = "img/spaceship.png";

    bullet = new Image();
    bullet.src = "img/Bullet.png";

    enemy = new Image();
    enemy.src = "img/UFO.png";

    enemybullet = new Image();
    enemybullet.src = "img/bullet2.png";

    gameover = new Image();
    gameover.src = "img/gameover.jpg";
}

let keysDown = {};
function setupKeyboardListener() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.key] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.key];

        if (event.key == "j" || event.key == "J") {
            createBullet();
        }
    });
}

function createBullet() {
    let b = new Bullet();
    b.init();
}


function createEnemy() {
    const interval = setInterval(function () {
        let e = new Enemy();
        e.init();
    }, 1000);
}

function update() {
    if ("d" in keysDown || "D" in keysDown) {
        spaceshipX += 5;
    }
    if ("a" in keysDown || "A" in keysDown) {
        spaceshipX -= 5;
    }
    if ("w" in keysDown || "W" in keysDown) {
        spaceshipY -= 5;
    }
    if ("s" in keysDown || "S" in keysDown) {
        spaceshipY += 5;
    }
    if (spaceshipX <= 0) {
        spaceshipX = 0;
    }
    if (spaceshipX >= canvas.width - 66) {
        spaceshipX = canvas.width - 66;
    }
    if (spaceshipY <= 0) {
        spaceshipY = 0;
    }
    if (spaceshipY >= canvas.height - 66) {
        spaceshipY = canvas.height - 66;
    }
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            bulletList[i].update();
            bulletList[i].checkHit();
        }
    }
    for (let i = 0; i < enemyList.length; i++) {
        enemyList[i].update();
    }
}

function render() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(spaceship, spaceshipX, spaceshipY);
    ctx.fillText(`Score: ${score}`, 20, 30);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    for (let i = 0; i < bulletList.length; i++) {
        if (bulletList[i].alive) {
            ctx.drawImage(bullet, bulletList[i].x, bulletList[i].y);

        }
    }
    for (let i = 0; i < enemyList.length; i++) {
        ctx.drawImage(enemy, enemyList[i].x, enemyList[i].y);
    }
}
function main() {
    if (!gameOver) {
        update();
        render();
        requestAnimationFrame(main);
    } else {
        ctx.drawImage(gameover, 60, 170, 380, 380);
    }
}

LoadImage();
setupKeyboardListener();
createEnemy();
main();