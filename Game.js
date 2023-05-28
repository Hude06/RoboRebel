const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentKey = new Map();
class Player {
    constructor(){
        this.x = 10
        this.y = 10
        this.w = 10
        this.h = 10
        this.alive = true;
    }
    draw() {
        ctx.fillRect(this.x,this.y,this.w,this.h);
    }
}
let player = new Player();
function keyboardLoop() {
    if (currentKey.get("w") === true) {
        enemy.x += 10;
    }
}
function keyboardInit() {
    window.addEventListener("keydown", function (event) {
        currentKey.set(event.key, true);

    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
    });
}
function Loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    keyboardLoop();
    player.draw();
    requestAnimationFrame(Loop)
}
function init() {
    keyboardInit();
    Loop();
}
init();