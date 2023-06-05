import { Rect } from "./RectUtils.js";
import {gun, navKey,player,mode,particalEngine, SemiAutoGun, currentKey} from "./Game.js";
export let bullets = []
class Bullet {
    constructor(gun) {
        this.bounds = new Rect(gun.bounds.x+player.bulletDirectionOffsetX, gun.bounds.y+player.bulletDirectionOffsetY,10,10)
        this.speed = gun.BulletSpeed;
        this.direction = player.direction;
        this.alive = true;
        this.gun = gun
    }

    draw(ctx) {
        if (this.alive && this.gun.equipted) {
            console.log("ShootingWorking")
            ctx.fillStyle = "black";
            ctx.fillRect(this.bounds.x, this.bounds.y,this.bounds.w,this.bounds.h);
        }
    }
    update() {
        console.log(gun.equipted)
        if (this.alive && this.gun.equipted) {
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
}
export class Player {
    constructor(){
        this.Sprite = new Image();
        this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png";
        this.HeathSprite = new Image();
        this.HeathSprite.src = "./Assets/Sprites/Heart.png";
        this.bounds = new Rect(1500,500,55,55);
        this.direction = "Back";
        this.speed = 2;
        this.tools = "";
        this.toolDirectionOffsetX = 100;
        this.toolDirectionOffsetY = 25;
        this.bulletDirectionOffsetX = 10
        this.bulletDirectionOffsetY = 10
        this.dash = false;
        this.Parts = 0;
        this.health = 3;
        this.Insanity = 2;
        this.dashCooldown = 10;
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
    }
    insanityBar(ctx) {
        ctx.fillStyle = "red";
        ctx.lineWidth = 5;
        ctx.strokeRect(200,10,125,30)
        ctx.fillRect(200,10,this.Insanity*12.5,30)
    }
    update(ctx) {
        this.dashCooldown -= 0.1
        if (currentKey.get("Shift") && this.dashCooldown <= 0) {
            this.dash = true;
            setTimeout(() => {
                this.dash = false;
                this.dashCooldown = 10;
            }, 200);
        }
        if (this.dash === true) {
            this.speed = 5
        } else {
            this.speed = 2;
        }
        if (this.tools === "Gun") {
            gun.equipted = true;
        }
        if (this.tools === "Semi") {
            SemiAutoGun.equipted = true;
        }
        if (this.direction === "Forward") { 
            if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1Up.png"
                this.toolDirectionOffsetX = 20
                this.toolDirectionOffsetY = -30
            }
            if (this.tools === "Semi") {
                SemiAutoGun.Sprite.src = "./Assets/Sprites/SemiAutoUp.png"
                this.toolDirectionOffsetX = -10
                this.toolDirectionOffsetY = -80
                this.bulletDirectionOffsetY = 0;
                this.bulletDirectionOffsetX = 40
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerBack.png"
        }
        if (this.direction === "Back") { 
            if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1Down.png"
                this.toolDirectionOffsetX = 20
                this.toolDirectionOffsetY = 65
            }
            if (this.tools === "Semi") {
                SemiAutoGun.Sprite.src = "./Assets/Sprites/SemiAutoDown.png"
                this.toolDirectionOffsetX = 0
                this.toolDirectionOffsetY = 65
                this.bulletDirectionOffsetY = 10;
                this.bulletDirectionOffsetX = 20
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.direction === "Left") { 
            if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1Flipped.png"
                this.toolDirectionOffsetY = 10
                this.toolDirectionOffsetX = -30
            }
            if (this.tools === "Semi") {
                SemiAutoGun.Sprite.src = "./Assets/Sprites/SemiAutoFlipped.png"
                this.toolDirectionOffsetY = 0
                this.toolDirectionOffsetX = -70
                this.bulletDirectionOffsetY = 20;
                this.bulletDirectionOffsetX = 0
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerLeft.png"
        }
        if (this.direction === "Right") { 
                if (this.tools === "Gun") {
                gun.Sprite.src = "./Assets/Sprites/Gun1.png"
                this.toolDirectionOffsetY = 10
                this.toolDirectionOffsetX = 60
            }
            if (this.tools === "Semi") {
                SemiAutoGun.Sprite.src = "./Assets/Sprites/Gun2.png"
                this.toolDirectionOffsetY = 0
                this.toolDirectionOffsetX = 60
                this.bulletDirectionOffsetY = 20;
                this.bulletDirectionOffsetX = 20
            }
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.tools === "Gun") {
            gun.bounds.x = this.bounds.x + this.toolDirectionOffsetX;
            gun.bounds.y = this.bounds.y + this.toolDirectionOffsetY;
            gun.visable = true;
            gun.equipted = true;
            SemiAutoGun.visable = true;
            gun.draw();
            if (navKey.get(" ")) {
                bullets.push(new Bullet(gun));
            }
        }
        if (this.tools === "Semi") {
            SemiAutoGun.bounds.x = this.bounds.x + this.toolDirectionOffsetX;
            SemiAutoGun.bounds.y = this.bounds.y + this.toolDirectionOffsetY;
            SemiAutoGun.visable = true;
            SemiAutoGun.equipted = true;
            gun.visable = true

            SemiAutoGun.draw();
            if (navKey.get(" ")) {
                console.log('Shooting')
                bullets.push(new Bullet(SemiAutoGun));
            }
        }
        if (this.health <= 0) {
            alert("You Died!")
            location.reload()
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
        if (this.bounds.intersects(gun.bounds) || gun.bounds.intersects(this.bounds) ) {
            gun.visable = false;
            this.tools = "Gun"
        }
        if (this.bounds.intersects(SemiAutoGun.bounds) || SemiAutoGun.bounds.intersects(this.bounds) ) {
            SemiAutoGun.visable = false;
            this.tools = "Semi"
        }
    }
    DrawHealth(ctx) {
        for (let i = 0; i < this.health;i ++) {
            ctx.drawImage(this.HeathSprite, -10 + i*60,-40,100,100)
        }
    }
} 