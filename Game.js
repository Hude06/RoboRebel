import {Rect} from "./RectUtils.js"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentKey = new Map();
class Player {
    constructor(){
        this.bounds = new Rect(10,10,10,10)
        this.speed = 1;
    }
    draw() {
        ctx.fillRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
    }
}
let player = new Player();
function keyboardLoop() {
    if (currentKey.get("w")) {
        player.bounds.y -= player.speed;
    }
    if (currentKey.get("a")) {
        player.bounds.x -= player.speed;
    }
    if (currentKey.get("s")) {
        player.bounds.y += player.speed;
    }
    if (currentKey.get("d")) {
        player.bounds.x += player.speed;
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
    ctx.clearRect(0,0,canvas.width,canvas.height);
    keyboardLoop();
    player.draw();
    console.log("Running")
    requestAnimationFrame(Loop)
}
function init() {
    keyboardInit();
    Loop();
}
init();