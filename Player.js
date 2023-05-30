import { Rect } from "./RectUtils.js";
import {gun, picaxe, navKey,player} from "./Game.js";
export let bullets = []
class Bullet {
    constructor(gun) {
        this.bounds = new Rect(gun.bounds.x, gun.bounds.y,10,10)
        this.speed = gun.BulletSpeed;
        this.direction = player.direction;
    }
    draw(ctx) {
        ctx.fillRect(this.bounds.x, this.bounds.y,this.bounds.w,this.bounds.h)
    }
    update() {
        if (this.direction === "Left") {
            this.bounds.x -= this.speed;
        }
        if (this.direction === "Right") {
            this.bounds.x += this.speed;
        }
        if (this.direction === "Forward") {
            this.bounds.y -= this.speed;
        }
        if (this.direction === "Back") {
            this.bounds.y += this.speed;
        }
    }
}
export class Player {
    constructor(){
        this.Sprite = new Image();
        this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png";
        this.bounds = new Rect(localStorage.getItem("PlayerX"),localStorage.getItem("PlayerY"),64,64);
        this.direction = "Forward";
        this.speed = 2;
        this.tools = "";
        this.toolDirectionOffsetX = 100;
        this.toolDirectionOffsetY = 25;
        this.Parts = 0;

    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
    }
    update(ctx) {
        if (this.direction === "Forward") { 
            if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1Up.png"
                this.toolDirectionOffsetX = 20
                this.toolDirectionOffsetY = -50
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerBack.png"
        }
        if (this.direction === "Back") { 
            if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1Down.png"
                this.toolDirectionOffsetX = 20
                this.toolDirectionOffsetY = 100
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.direction === "Left") { 
            if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1Flipped.png"
                this.toolDirectionOffsetY = 10
                this.toolDirectionOffsetX = -50
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerLeft.png"
        }
        if (this.direction === "Right") { 
                if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1.png"
                this.toolDirectionOffsetY = 10
                this.toolDirectionOffsetX = 100
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.tools === "Gun") {
            gun.bounds.x = this.bounds.x + this.toolDirectionOffsetX;
            gun.bounds.y = this.bounds.y + this.toolDirectionOffsetY;
            gun.visable = true;
            gun.draw();
            if (navKey.get(" ")) {
                bullets.push(new Bullet(gun));
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
        }
        if (this.bounds.intersects(gun.bounds) || gun.bounds.intersects(this.bounds) ) {
            gun.visable = false;
            this.tools = "Gun"
        }
    }
} 