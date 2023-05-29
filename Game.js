import {Rect} from "./RectUtils.js"
import {Player} from "./Player.js"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentKey = new Map();
let debugMode = false;
let mode = "Menu";

class Tool {
    constructor(src,x,y) {
        this.Sprite = new Image()
        this.Sprite.src = src
        this.bounds = new Rect(x,y,25,25)
        this.visable = true;
    }
    draw() {
        if (this.visable) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
            if (debugMode) {
                ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
            }
        }

    }
}
export let picaxe = new Tool("./Assets/Sprites/Pixax.png",10,10);
export let gun = new Tool("./Assets/Sprites/Gun1.png",100,100);
let player = new Player();
function keyboardLoop() {
    if (currentKey.get("w")) {
        player.bounds.y -= player.speed;
        player.direction = "Forward"
    }
    if (currentKey.get("a")) {
        player.bounds.x -= player.speed;
        player.direction = "Left"

    }
    if (currentKey.get("s")) {
        player.bounds.y += player.speed;
        player.direction = "Back"

    }
    if (currentKey.get("d")) {
        player.bounds.x += player.speed;
        player.direction = "Right"

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
function Game() {
    player.draw(ctx);
    picaxe.draw(ctx);
    gun.draw(ctx);
    player.update(ctx);
    player.collision();
}
function Menu() {
    ctx.font = "40px Inter-Light";
    ctx.fillText("Click Enter to Start", canvas.width/2-120, 50);
    if (currentKey.get("Enter")) {
        mode = "Game"
    }
}
function Loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    keyboardLoop();
    if (mode === "Game") {
        Game();
    }
    if (mode === "Menu") {
        Menu();
    }
    requestAnimationFrame(Loop)
}
function init() {
    keyboardInit();
    Loop();
}
init();