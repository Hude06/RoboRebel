import {Rect} from "./RectUtils.js"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let currentKey = new Map();
let debugMode = false;
let mode = "Menu";
class Player {
    constructor(){
        this.Sprite = new Image();
        this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png";
        this.bounds = new Rect(10,40,64,64);
        this.direction = "Forward";
        this.speed = 2;
        this.tools = [];
    }
    draw() {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
        if (debugMode) { 
            ctx.strokeRect(this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
        }
    }
    update() {
        if (this.direction === "Forward") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerBack.png"
        }
        if (this.direction === "Back") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.direction === "Left") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerLeft.png"
        }
        if (this.direction === "Right") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        console.log(this.tools.length)
        if (this.tools.length > 0) {
            console.log("Drawing")
            for (let i = 0; i < this.tools.length; i++) { 
                this.tools[i].bounds.x = this.bounds.x;
                this.tools[i].bounds.y = this.bounds.y;
                this.tools[i].draw();
                console.log("Drawing")
            }
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
            // this.tools.push(picaxe);
        }
        // if (this.bounds.intersects(gun.bounds) || gun.bounds.intersects(this.bounds) && gun.beingHeld === false) {
        //     gun.visable = false;
        //     this.tools.push(gun);
        //     gun.beingHeld = true;
        //     console.log(gun.beingHeld);
        // }
    }
}
class Tool {
    constructor(src,x,y) {
        this.Sprite = new Image()
        this.Sprite.src = src
        this.bounds = new Rect(x,y,25,25)
        this.visable = true;
        this.beingHeld = false;
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
let picaxe = new Tool("./Assets/Sprites/Pixax.png",10,10);
let gun = new Tool("./Assets/Sprites/Gun1.png",100,100);
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
    player.draw();
    picaxe.draw();
    gun.draw();
    player.update();
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