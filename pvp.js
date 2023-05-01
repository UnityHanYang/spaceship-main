let canvas;
let ctx;

canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 450;
document.body.appendChild(canvas);

let background, Player1, bullet1, bullet2, Player2;
let gameOver = false;
let spaceshipX1 = 0;
let spaceshipY1 = canvas.height / 2 - 32;
let spaceshipX2 = canvas.width - 64;
let spaceshipY2 = canvas.height / 2 - 32;
let playerwin = "";

let bulletList1 = [];
let bulletList2 = [];
let count1 = 3;
let count2 = 3;
let isbullet1 = false;
let isbullet2 = false;
function Bullet1() {
    this.x = 0;
    this.y = 0;
    this.init = function (e) {
        if (bulletList1.length < 5) {
            this.x = spaceshipX1 + 40;
            this.y = spaceshipY1 + 18;
            this.alive = true;
            bulletList1.push(this);
        }
    };
    this.load = function () {
        isbullet1 = true;
        let intervalId = setInterval(function () {
            count1--;
            if (count1 == 0) {
                bulletList1 = [];
                count1 = 3;
                isdraw1 = false;
                isbullet1 = false;
                clearInterval(intervalId);
            }
        }, 1000);
    }
    this.update = function () {
        if (this.x >= canvas.width) {
            this.alive = false;
        }
        this.x += 7;
    };
    this.checkHit = function () {
        if (this.x >= spaceshipX2 && this.y >= spaceshipY2 - 10 && this.y <= spaceshipY2 + 50) {
            this.alive = false;
            playerwin = "Player1";
            gameOver = true;
        }
    };
}

function Bullet2() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
        if (bulletList2.length < 5) {
            this.x = spaceshipX2 - 3;
            this.y = spaceshipY2 + 14;
            this.alive = true;
            bulletList2.push(this);
        }
    };
    this.load = function () {
        isbullet2 = true;
        let intervalId = setInterval(function () {
            count2--;
            if (count2 == 0) {
                bulletList2 = [];
                count2 = 3;
                isdraw2 = false;
                isbullet2 = false;
                clearInterval(intervalId);
            }
        }, 1000);
    }
    this.update = function () {
        if (this.x <= 0) {
            this.alive = false;
        }
        this.x -= 7;
    };
    this.checkHit = function () {
        if (this.x <= spaceshipX1 + 28 && this.y >= spaceshipY1 - 10 && this.y <= spaceshipY1 + 50) {
            this.alive = false;
            playerwin = "Player2";
            gameOver = true;
        }
    };
}
const urlParam = new URLSearchParams(window.location.search);
const player1 = urlParam.get('player1');
const player2 = urlParam.get('player2');
function LoadImage() {
    background = new Image();
    background.src = "img/background.jpg";

    Player1 = new Image();
    let str1 = player1.split("/");
    let fir = "";
    if (str1[9][0] == '전') {
        fir = "그림03.png";
    } else if (str1[9][0] == '파') {
        fir = "파랑오른쪽.png";
    } else if (str1[9][0] == '황') {
        fir = "황색오른쪽.png";
    } else if (str1[9][0] == '빨') {
        fir = "빨강오른쪽.png";
    }
    let result1 = str1[8] + "/" + fir;
    Player1.src = result1;

    Player2 = new Image();
    let str2 = player2.split("/");
    let sec = "";
    if (str2[9][0] == '전') {
        sec = "그림02.png";
    } else if (str2[9][0] == '파') {
        sec = "파랑왼쪽.png";
    } else if (str2[9][0] == '황') {
        sec = "황색왼쪽.png";
    } else if (str2[9][0] == '빨') {
        sec = "빨강왼쪽.png";
    }
    let result2 = str2[8] + "/" + sec;
    Player2.src = result2;

    bullet1 = new Image();
    bullet1.src = "img/총알오른쪽.png";

    bullet2 = new Image();
    bullet2.src = "img/총알왼쪽.png";
}

function drawText1(text) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`${text}`, 40, 80, 130);
}

let keysDown = {};
let isdraw1 = false;
function setupKeyboardListener1() {
    document.addEventListener("keydown", function (event) {
        keysDown[event.key] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown[event.key];
        if (!isbullet1) {
            if (event.key == "t" || event.key == "T") {
                createBullet1();
            }
        }
        if (event.key == "r" || event.key == "R") {
            loadBullet1();
            isdraw1 = true;
        }
    });
}

function createBullet1() {
    let b = new Bullet1();
    b.init();
}
function loadBullet1() {
    let b = new Bullet1();
    b.load();
}

function drawText2(text) {
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`${text}`, 745, 80, 130);
}

let keysDown2 = {};
let isdraw2 = false;
function setupKeyboardListener2() {
    document.addEventListener("keydown", function (event) {
        keysDown2[event.key] = true;
    });
    document.addEventListener("keyup", function (event) {
        delete keysDown2[event.key];
        if (!isbullet2) {
            if (event.key == "[" || event.key == "{") {
                createBullet2();
            }
        }
        if (event.key == "]" || event.key == "}") {
            loadBullet2();
            isdraw2 = true;
        }
    });
}

function createBullet2() {
    let b = new Bullet2();
    b.init();
}
function loadBullet2() {
    let b = new Bullet2();
    b.load();
}

function update1() {
    if ("d" in keysDown || "D" in keysDown) {
        spaceshipX1 += 5;
    }
    if ("a" in keysDown || "A" in keysDown) {
        spaceshipX1 -= 5;
    }
    if ("w" in keysDown || "W" in keysDown) {
        spaceshipY1 -= 5;
    }
    if ("s" in keysDown || "S" in keysDown) {
        spaceshipY1 += 5;
    }
    if (spaceshipX1 <= 0) {
        spaceshipX1 = 0;
    }
    if (spaceshipX1 >= canvas.width / 2 - 64) {
        spaceshipX1 = canvas.width / 2 - 64;
    }
    if (spaceshipY1 <= 0) {
        spaceshipY1 = 0;
    }
    if (spaceshipY1 >= canvas.height - 66) {
        spaceshipY1 = canvas.height - 66;
    }
    for (let i = 0; i < bulletList1.length; i++) {
        if (bulletList1[i].alive) {
            bulletList1[i].update();
            bulletList1[i].checkHit();
        }
    }
}
function update2() {
    if ("ArrowRight" in keysDown) {
        spaceshipX2 += 5;
    }
    if ("ArrowLeft" in keysDown) {
        spaceshipX2 -= 5;
    }
    if ("ArrowUp" in keysDown) {
        spaceshipY2 -= 5;
    }
    if ("ArrowDown" in keysDown) {
        spaceshipY2 += 5;
    }
    if (spaceshipX2 <= canvas.width / 2) {
        spaceshipX2 = canvas.width / 2;
    }
    if (spaceshipX2 >= canvas.width - 64) {
        spaceshipX2 = canvas.width - 64;
    }
    if (spaceshipY2 <= 0) {
        spaceshipY2 = 0;
    }
    if (spaceshipY2 >= canvas.height - 66) {
        spaceshipY2 = canvas.height - 66;
    }
    for (let i = 0; i < bulletList2.length; i++) {
        if (bulletList2[i].alive) {
            bulletList2[i].update();
            bulletList2[i].checkHit();
        }
    }
}
function render() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(Player1, spaceshipX1, spaceshipY1);
    ctx.drawImage(Player2, spaceshipX2, spaceshipY2);
    ctx.fillText("Player1", 10, 20, 200);
    ctx.fillText(`총알 수: ${5 - bulletList1.length}`, 10, 50, 130);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText("Player2", 725, 20, 200);
    ctx.fillText(`총알 수: ${5 - bulletList2.length}`, 705, 50, 130);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    for (let i = 0; i < bulletList1.length; i++) {
        if (bulletList1[i].alive) {
            ctx.drawImage(bullet1, bulletList1[i].x, bulletList1[i].y);

        }
    }
    for (let i = 0; i < bulletList2.length; i++) {
        if (bulletList2[i].alive) {
            ctx.drawImage(bullet2, bulletList2[i].x, bulletList2[i].y);

        }
    }
}
function main() {
    if (!gameOver) {
        update1();
        update2();
        render();
        if (isdraw1) {
            drawText1(count1);
        }
        if (isdraw2) {

            drawText2(count2);
        }
        requestAnimationFrame(main);
    } else {
        ctx.font = "40px Arial";
        ctx.fillText(`${playerwin} 승리`, 290, 220, 300);
    }
}

LoadImage();
setupKeyboardListener1();
setupKeyboardListener2();
main();