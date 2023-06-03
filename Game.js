import {Rect} from "./RectUtils.js"
import {Player} from "./Player.js"
import {bullets} from "./Player.js"
import { Robot } from "./Enemy.js";
import { Tool } from "./Tools.js";
import { ParticleSource } from "./Particals.js";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
export let currentKey = new Map();
export let navKey = new Map();
export let player = new Player();
export let mode = "Menu";
export let gun = new Tool("./Assets/Sprites/Gun1.png",100,100,ctx);
export let SemiAutoGun = new Tool("./Assets/Sprites/Gun2.png",200,200,ctx);
SemiAutoGun.bounds.w = 70
SemiAutoGun.bounds.h = 70

let Music = new Audio();
export let gamePaused = false;
export let particalEngine = new ParticleSource();
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
        if (currentLevel === Home) {
        if (this.walls[0].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[0].bounds)) {
            player.bounds.x = this.walls[0].bounds.x-65;
            currentLevel = Level1;
        }
            if (this.walls[1].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[1].bounds)) {
                player.bounds.x = this.walls[1].bounds.x;
                currentLevel = House;
            }
            if (this.walls[2].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[2].bounds)) {
                player.bounds.y = this.walls[2].bounds.y;
                gamePaused = true;
                openShop();
                if (currentKey.get("p")) {
                    closeShop();
                    player.bounds.y = this.walls[2].bounds.y+40;
                }
            }
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
function openShop(){
document.getElementById("shop").style.visibility = "visible";
document.getElementById("shop").innerHTML = "Parts: " + player.Parts;
document.getElementById("display").style.visibility = "hidden";
}
function closeShop(){
    console.log("Shop Closed")
    gamePaused = false;
    document.getElementById("shop").style.visibility = "hidden";
    document.getElementById("display").style.visibility = "visible";
}
Music.src = "./Assets/Music/Music1.mp3"
let GameInitCalled = false;
let Robot1 = new Robot("./Assets/Sprites/Robots/Robot1.png",1,1,0.5,500,200);
let Robot2 = new Robot("./Assets/Sprites/Robots/Robot2.png",1,1,0.5,200,500);
let Robot3 = new Robot("./Assets/Sprites/Robots/Robot3.png",1,1,0.5,100,100);
let Home = new Level(1,"./Assets/map.png",canvas.width,canvas.height);
let Level1 = new Level(2,"./Assets/Level1.png",canvas.width,canvas.height);
let House = new Level(3,"./Assets/House.png",700,700);
Level1.robots = [Robot1,Robot2,Robot3];
let ExitWall = new Wall(1,1668,110,32,285)
let EdgeWall1 = new Wall(3,250,60,32,750)
let RoomEnterWall = new Wall(2,775,250,150,32);
let ShopWall = new Wall(4,1440,150,175,32);

Home.walls = [ExitWall,RoomEnterWall,ShopWall]
Level1.walls = [EdgeWall1]

let WorldMap = new Image();
WorldMap.src = ""
let currentLevel = Home;
function keyboardLoop() {
    console.log(player.direction,player.speed)
    if (gamePaused === false) {
        if (currentKey.get("w") ) {
            player.direction = "Forward"
            player.bounds.y -= player.speed;
        }
        if (currentKey.get("a")) {
            player.direction = "Left"
            player.bounds.x -= player.speed;
        }
        if (currentKey.get("s")) {
            player.direction = "Back"
            player.bounds.y += player.speed;
        }
        if (currentKey.get("d")) {
            player.direction = "Right"
            player.bounds.x += player.speed;
        }
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
    if (gamePaused === false) {
        if (currentLevel === Level1) {
            Robot1.follow(player);
            Robot1.collison()
            Robot2.follow(player);
            Robot2.collison()
            Robot3.follow(player);
            Robot3.collison();
        }
    }
}
function toolsDraw() {
    if (SemiAutoGun.equipted === false) {
        SemiAutoGun.draw(200,200,ctx);
        console.log("Drawing")
    }
    if (gun.equipted === false) {
        gun.draw(200,500,ctx);
        console.log("Drawing")
    }
}
function playerDraw() {
    player.draw(ctx);

}
function playerUpdate() {
    if (gamePaused === false) {
        player.update(ctx);
        player.collision();
        player.DrawHealth(ctx);
        player.insanityBar(ctx);
    }
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
        gun.visable = false;
        SemiAutoGun.visable = false;

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
        document.getElementById("display").style.visibility = "visible";
        document.getElementById("fullscreen").style.backgroundImage = "url('background.gamebg.jpg')";
        mode = "Game"
}
function Save() {
    // setTimeout(() => {
    //     localStorage.setItem("PlayerDirection", player.direction);
    //     localStorage.setItem("Tool", player.tools);
    //     console.log("Saving")
    //     Save();
    //     console.log("Saved")
    // }, 10000);
}
function Load() {
    // if (localStorage.length > 0) {
    //     player.tools = localStorage.getItem("Tool");
    //     player.direction = localStorage.getItem("PlayerDirection");
    // } else {
    //     player.bounds.x = 10
    //     player.bounds.y = 10
    //     player.direction = "Back";
    // }
}
function Credits() {
    document.getElementById("button1").style.visibility = "hidden";
    document.getElementById("button2").style.visibility = "hidden";
    document.getElementById("button3").style.visibility = "hidden";
    document.getElementById("title").style.visibility = "hidden";
    mode = "Credits"
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
let CreditsScrollSpeed = 1;
function Loop() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    keyboardLoop();
    if (mode === "Credits") {
        CreditsScrollSpeed += 1;
        console.log("Running")
        ctx.font = "40px Impact";
        ctx.textAlign = "center";
        ctx.fillText("Pixel Art Desinger, Eli Ciho, Jude Hill", canvas.width/2, (canvas.height/2-800) + CreditsScrollSpeed);
        ctx.fillText("Back End Code Devoper, Jude Hill", canvas.width/2, (canvas.height/2-700) + CreditsScrollSpeed);
        ctx.fillText("Front End Code Devoper, Eli Ciho", canvas.width/2, (canvas.height/2-600) + CreditsScrollSpeed);
        ctx.fillText("Music, Eli Ciho, Jude Hill", canvas.width/2, (canvas.height/2-500) + CreditsScrollSpeed);
        ctx.fillText("Sound Effects, Eli Ciho, Jude Hill", canvas.width/2, (canvas.height/2-400) + CreditsScrollSpeed);
    }
    if (mode === "Game") {
        GameInit()
        Game();
        particalEngine.draw_particles(ctx,238,134,149)
        particalEngine.update_particles();
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
    document.getElementById("button3").addEventListener("click", Credits);
    document.getElementById("display").innerHTML = "Parts: " + player.Parts;


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