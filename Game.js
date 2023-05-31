import {Rect} from "./RectUtils.js"
import {Player} from "./Player.js"
import {bullets} from "./Player.js"
import { Robot } from "./Enemy.js";
import { Tool } from "./Tools.js";
import { LevelManager } from "./LevelManager.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export let currentKey = new Map();
export let navKey = new Map();
export let player = new Player();
export let mode = "Menu";
export let gun = new Tool("./Assets/Sprites/Gun1.png",100,100,ctx);
let Music = new Audio();
class Level {
    constructor(number,map,w,h) {
      this.number = number;
      this.map = map;
      this.walls = [];
      this.robots = [];
      this.w = w
      this.h = h
    }
   draw() {
        drawMap(this.map,this.w,this.h)
        if (this.robots) {
            for (let i = 0; i < this.robots.length; i++) {
                this.robots[i].draw(ctx);
            }
        }
   }
   update() {
    for (let i = 0; i < this.walls.length; i++) {
        if (this.walls[0].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[0].bounds)) {
            player.bounds.x = this.walls[0].bounds.x-65;
            currentLevel = Level1;
        }
        if (this.walls[1].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[1].bounds)) {
            player.bounds.x = this.walls[1].bounds.x;
            currentLevel = House;
        }
        ctx.fillRect(this.walls[i].bounds.x,this.walls[i].bounds.y,this.walls[i].bounds.w,this.walls[i].bounds.h)
    }
   }
    // Level-specific methods
}
class Wall {
    constructor(id,x,y,w,h) {
        this.id = id;
        this.bounds = new Rect(x,y,w,h)
    }
}
Music.src = "./Assets/Music/Music1.mp3"
let SavedTextVisable = false;
let GameInitCalled = false;
let Robot1 = new Robot("./Assets/Sprites/Robots/Robot1.png",1,1,1,200,200);
let Robot2 = new Robot("./Assets/Sprites/Robots/Robot2.png",1,1,1,10,10);
let Robot3 = new Robot("./Assets/Sprites/Robots/Robot3.png",1,1,1,100,100);
let Home = new Level(1,"./Assets/map.png",canvas.width,canvas.height);
let Level1 = new Level(2,"./Assets/Level1.png",canvas.width,canvas.height);
let House = new Level(3,"./Assets/House.png",500,500);
Level1.robots = [Robot1,Robot2,Robot3];
let ExitWall = new Wall(1,1668,110,32,285)
let RoomEnterWall = new Wall(2,775,250,150,32);
Home.walls = [ExitWall,RoomEnterWall]
let WorldMap = new Image();
WorldMap.src = ""
let currentLevel = Home;
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
function RobotUpdate() {
    if (currentLevel === Level1) {
        Robot1.follow(player);
        Robot1.collison()
        Robot2.follow(player);
        Robot2.collison()
        Robot3.follow(player);
        Robot3.collison();
    }
}
function toolsDraw() {
    gun.draw(10,10,ctx);
}
function playerDraw() {
    player.draw(ctx);

}
function playerUpdate() {
    player.update(ctx);
    player.collision();
    player.DrawHealth(ctx);
    player.insanityBar(ctx);
}
function BulletsDrawUpdate() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(ctx);
        bullets[i].update(ctx);
    }
}
function Game() {
    //ALL DRAWING CODE
    currentLevel.draw();
    currentLevel.update();
    if (currentLevel === House) {
        console.log("HOuse")
        gun.visable = false;
    }
    playerDraw();
    toolsDraw();
    //ALL UPDATE CODE
    BulletsDrawUpdate();
    RobotUpdate();
    playerUpdate();

}
function drawMap(map,w,h) {
    WorldMap.src = map;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(WorldMap,canvas.width/2-w/2,canvas.height/2-h/2,w,h)
}
function StartGameFromButton() {
        document.getElementById("button1").style.visibility = "hidden";
        document.getElementById("button2").style.visibility = "hidden";
        document.getElementById("button3").style.visibility = "hidden";
        document.getElementById("title").style.visibility = "hidden";
        mode = "Game"
}
function Save() {
    setTimeout(() => {
        localStorage.setItem("PlayerDirection", player.direction);
        localStorage.setItem("Tool", player.tools);
        console.log("Saving")
        Save();
        console.log("Saved")
        SavedTextVisable = true;
    }, 10000);
}
function Load() {
    if (localStorage.length > 0) {
        player.tools = localStorage.getItem("Tool");
        player.direction = localStorage.getItem("PlayerDirection");
        console.log(typeof localStorage.getItem("PlayerY"))
    } else {
        player.bounds.x = 10
        player.bounds.y = 10
        player.direction = "Back";
    }
}
function Tutorial() {
    ctx.fillStyle = "#639e41";
    document.getElementById("button1").style.visibility = "hidden";
    document.getElementById("button2").style.visibility = "hidden";
    document.getElementById("button3").style.visibility = "hidden";
    document.getElementById("title").style.visibility = "hidden";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.font = "35px Impact";
    ctx.fillStyle = "black";
    ctx.fillText("Gun, Walk over to pick it up",100,200);
    ctx.fillText("Press Space To Shoot",125,250);   

    player.draw(ctx);
    gun.draw(280,100,ctx);
    player.update(ctx);
    player.collision();
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(ctx);
        bullets[i].update(ctx);
    }
}
function HowToPlay() {
    mode = "Tutorial";
}
function Loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    keyboardLoop();
    if (mode === "Game") {
        GameInit()
        Game();
    }
    if (mode === "Tutorial") {
        Tutorial();
    }
    navKey.clear();
    requestAnimationFrame(Loop)
}
function init() {
    // Music.play();
    document.getElementById("button1").addEventListener("click", StartGameFromButton);
    document.getElementById("button2").addEventListener("click", HowToPlay);

    // document.getElementById("button4").addEventListener("click", ClearLocalStorage);
    keyboardInit();
    Loop();
}
function GameInit() {
    if (GameInitCalled === false) {
        Load();
        Save();
        GameInitCalled = true;
    }
}
init();