import {Rect} from "./RectUtils.js"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentKey = new Map();
class Player {
    constructor(){
        this.Sprite = new Image();
        this.Sprite.src = "./Assets/Sprites/Player/Player.png";
        this.bounds = new Rect(10,40,64,64);
        this.direction = "Forward";
        this.speed = 2;
        this.tools = [];
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
        ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);

    }
    update() {
        if (this.direction === "Forward") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerBack.png"
        }
        if (this.direction === "Back") { 
            this.Sprite.src = "./Assets/Sprites/Player/Player.png"
        }
        if (this.direction === "Left") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerLeft.png"
        }
        if (this.direction === "Right") { 
            this.Sprite.src = "./Assets/Sprites/Player/Player.png"
        }
    }
    collision() {
        if (this.bounds.x >= canvas.width - 44) {
            this.bounds.x = canvas.width - 44;
        }
        if (this.bounds.x <= -20) {
            this.bounds.x = -20;
        }
        if (this.bounds.y >= canvas.height - 64){
            this.bounds.y = canvas.height - 64;
        }
        if (this.bounds.y <= -28){
            this.bounds.y = -28;
        }
        if (this.bounds.intersects(picaxe.bounds) || picaxe.bounds.intersects(this.bounds)){ 
            picaxe.visable = false;
        }
    }
}
class Tool {
    constructor(src) {
        this.Sprite = new Image()
        this.Sprite.src = src
        this.bounds = new Rect(10,10,25,25)
        this.visable = true;
    }
    draw() {
        if (this.visable) {
            ctx.imageSmoothingEnabled = false;
            ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
            ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }

    }
}
let picaxe = new Tool("./Assets/Pixax.png")
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
function Loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    keyboardLoop();
    player.draw();
    picaxe.draw();
    player.update();
    player.collision();
    console.log("Running")
    requestAnimationFrame(Loop)
}
function init() {
    keyboardInit();
    Loop();
}
init();