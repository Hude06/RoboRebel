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
gun.bounds.x = 200;
gun.bounds.y = 200;
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
      this.guns = []
      this.offsetX = 0;
      this.pastPlayerDirection;
      this.PlayerDirectionSet = false;
      this.ComputerDirectionSet = false;

    }
   draw() {
        if (this.guns) {
            for (let i = 0; i < this.guns.length; i++) {
                if (this.guns[i].equipted === false) {
                    if (this.guns[i] === gun) {
                        this.guns[i].draw(200,200,ctx)
                    }
                    if (this.guns[i] === SemiAutoGun) {
                        this.guns[i].draw(400,200,ctx)
                    }
                }
            }
        }
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
        if (this.walls[3].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[3].bounds)) {
            player.bounds.x = this.walls[3].bounds.x+20;
        }
        if (this.walls[4].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[4].bounds)) {
            player.bounds.y = this.walls[4].bounds.y+20;
        }
        if (this.walls[5].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[5].bounds)) {
            player.bounds.y = this.walls[5].bounds.y-20;
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
        if (currentLevel === Level1) {
            for (let i = 0; i < this.guns.length; i++) {
                this.guns[i].visable = true
            }
            if (this.walls[0].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[0].bounds)) {
                player.bounds.x = this.walls[0].bounds.x+20;
            }
            if (this.walls[1].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[1].bounds)) {
                player.bounds.y = this.walls[1].bounds.y+20;
            }
            if (this.walls[2].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[2].bounds)) {
                player.bounds.y = this.walls[2].bounds.y-55;
            }
            if (this.walls[3].bounds.intersects(player.bounds) || player.bounds.intersects(this.walls[3].bounds)) {
                if (this.PlayerDirectionSet === false) {
                    this.pastPlayerDirection = player.direction;
                    this.PlayerDirectionSet = true;
                }
                if (this.pastPlayerDirection === "Left") {
                    console.log("Hit Going Left")
                    player.bounds.x = this.walls[3].bounds.x + 400
                }
                if (this.pastPlayerDirection === "Forward") {
                    console.log("Hit Going Left")
                    player.bounds.y = this.walls[3].bounds.y + 400
                }
                if (this.pastPlayerDirection === "Back") {
                    console.log("Hit Going Left")
                    player.bounds.y = this.walls[3].bounds.y - 55
                }
            } else {
                this.PlayerDirectionSet = false;
            }

            for (let i = 0; i < Level1.robots.length; i++) {
                if (Level1.robots[i].bounds.intersects(this.walls[3].bounds) || this.walls[3].bounds.intersects(Level1.robots[i].bounds)) {
                    if (this.ComputerDirectionSet === false) {
                        Level1.robots[i].pastComputerDirection = Level1.robots[i].direction;
                        this.ComputerDirectionSet = true;
                    }
                    if (Level1.robots[i].pastComputerDirection === "Down") {
                        Level1.robots[i].bounds.y = this.walls[3].bounds.y - 70;
                    }
                    if (Level1.robots[i].pastComputerDirection === "Up") {
                        Level1.robots[i].bounds.y = this.walls[3].bounds.y + 70;
                    }
                    if (Level1.robots[i].pastComputerDirection === "Right") {
                        Level1.robots[i].bounds.x = this.walls[3].bounds.x - 70;
                    }
                    if (Level1.robots[i].pastComputerDirection === "Left") {
                        Level1.robots[i].bounds.x = this.walls[3].bounds.x + 70;
                    }
                } else {
                    this.ComputerDirectionSet = false;
                }

            }
        }
        ctx.fillRect(this.walls[i].bounds.x,this.walls[i].bounds.y,this.walls[i].bounds.w,this.walls[i].bounds.h)
    }
   }
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
Home.guns = [gun,SemiAutoGun];
let ExitWall = new Wall(1,1668,110,32,285)
let RoomEnterWall = new Wall(2,775,250,150,32);
let ShopWall = new Wall(4,1440,150,175,32);
let LeftBoundrie = new Wall(5,0,0,18,900)
let TopBoundire = new Wall(6,0,0,1900,18)
let BottomBoundire = new Wall(7,0,830,1900,18)
let Level1Obstical = new Wall(8,565,225,400,400)
Home.walls = [ExitWall,RoomEnterWall,ShopWall,LeftBoundrie,TopBoundire,BottomBoundire]
Level1.walls = [LeftBoundrie,TopBoundire,BottomBoundire,Level1Obstical]
let WorldMap = new Image();
WorldMap.src = ""
let currentLevel = Level1;
function keyboardLoop() {
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
    }
    if (gun.equipted === false) {
        gun.draw(200,500,ctx);
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
    if (currentLevel === Level1) {
        if (player.tools === "Gun") {
            SemiAutoGun.visable = false;
        }
        if (player.tools === "Semi") {
            gun.visable = false;
        }
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
    //     Save();
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