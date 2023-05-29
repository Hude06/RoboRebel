import {Rect} from "./RectUtils.js"
import {Player} from "./Player.js"
import {bullets} from "./Player.js"
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export let currentKey = new Map();
export let navKey = new Map();
let Music = new Audio();
Music.src = "./Assets/Music/Music1.mp3"

let debugMode = false;
let mode = "Menu";
class Tool {
    constructor(src,x,y) {
        this.Sprite = new Image()
        this.Sprite.src = src
        this.bounds = new Rect(x,y,25,25)
        this.visable = true;
        this.BulletSpeed = 2.5;
        this.direction = player.direction;
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
export let player = new Player();
export let picaxe = new Tool("./Assets/Sprites/Pixax.png",10,10);
export let gun = new Tool("./Assets/Sprites/Gun1.png",100,100);

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
        navKey.set(event.key, true);
    });
    window.addEventListener("keyup", function (event) {
        currentKey.set(event.key, false);
        navKey.set(event.key, false);
    });
}
function Game() {
    drawWorld();
    player.draw(ctx);
    picaxe.draw(ctx);
    gun.draw(ctx);
    player.update(ctx);
    player.collision();
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(ctx);
        bullets[i].update(ctx);
    }

}
let WorldImage = new Image();
WorldImage.src = "./Assets/map.png"
function drawWorld() {
    ctx.drawImage(WorldImage, 0, 0,canvas.width,canvas.height)
}
function Start() {
        console.log("Run")
        document.getElementById("button1").style.visibility = "hidden";
        document.getElementById("button2").style.visibility = "hidden";
        document.getElementById("button3").style.visibility = "hidden";
        document.getElementById("line1").style.visibility = "hidden";
        document.getElementById("title").style.visibility = "hidden";
        mode = "Game"
}
function Save() {
    setTimeout(() => {
        localStorage.setItem("PlayerX", player.bounds.x);
        localStorage.setItem("PlayerY", player.bounds.y);
        Save();
    }, 10000);
}
function Load() {
    player.bounds.x = parseInt(localStorage.getItem("PlayerX"));
    player.bounds.y = parseInt(localStorage.getItem("PlayerY"));
    console.log(typeof localStorage.getItem("PlayerY"))

}
function Loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    keyboardLoop();
    if (mode === "Game") {
        Game();
    }
    navKey.clear();
    requestAnimationFrame(Loop)
}
function init() {
    // Music.play();
    document.getElementById("button1").addEventListener("click", Start);
    keyboardInit();
    Load();
    Save();
    Loop();
}
init();