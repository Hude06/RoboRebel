import {Rect} from "./RectUtils.js"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let currentKey = new Map();
class Player {
    constructor(){
        this.bounds = new Rect(10,10,10,10)
        this.alive = true;
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
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