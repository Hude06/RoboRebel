import {Rect} from "./RectUtils.js"
import {Player} from "./Player.js"
import {bullets} from "./Player.js"
import { Robot } from "./Enemy.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export let currentKey = new Map();
export let navKey = new Map();
let Music = new Audio();
Music.src = "./Assets/Music/Music1.mp3"
let debugMode = false;
export let mode = "Menu";
let SavedTextVisable = false;
class Tool {
    constructor(src,x,y) {
        this.Sprite = new Image()
        this.Sprite.src = src
        this.bounds = new Rect(x,y,25,25)
        this.visable = true;
        this.BulletSpeed = 6;
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
export let gun = new Tool("./Assets/Sprites/Gun1.png",100,100);
let Robot1 = new Robot("./Assets/Sprites/Robots/Robot1.png",5,1,1);

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
    gun.draw(ctx);
    Robot1.draw(ctx);
    Robot1.follow(player);
    Robot1.collison()
    player.update(ctx);
    player.collision();
    player.DrawHealth(ctx);
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(ctx);
        bullets[i].update(ctx);
    }
    if (SavedTextVisable) {
        ctx.font = "40px Impact";
        ctx.lineWidth = 6;
        ctx.strokeRect(10, canvas.height-65,120,60)
        ctx.fillText("Saved", 20, canvas.height-20)
        setTimeout(() => {
            SavedTextVisable = false;
          }, 5000);  
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
        localStorage.setItem("PlayerDirection", player.direction);
        localStorage.setItem("Tool", player.tools);
        console.log("Saving")
        Save();
        console.log("Saved")
        SavedTextVisable = true;
    }, 10000);
}
function Load() {
    console.log(localStorage)
    if (localStorage.length > 0) {
        player.bounds.x = parseInt(localStorage.getItem("PlayerX"));
        player.bounds.y = parseInt(localStorage.getItem("PlayerY"));
        player.tools = localStorage.getItem("Tool");
        player.direction = localStorage.getItem("PlayerDirection");
        console.log(typeof localStorage.getItem("PlayerY"))
    } else {
        player.bounds.x = 10
        player.bounds.y = 10
        player.direction = "Back";
    }
}
function ClearLocalStorage() {
    localStorage.clear();
    console.log("Cleared")
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
    document.getElementById("button4").addEventListener("click", ClearLocalStorage);
    keyboardInit();
    Load();
    Save();
    Loop();
}
init();