import { Rect } from "./RectUtils.js";
import {gun, picaxe} from "./Game.js"
export class Player {
    constructor(){
        this.Sprite = new Image();
        this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png";
        this.bounds = new Rect(10,40,64,64);
        this.direction = "Forward";
        this.speed = 2;
        this.tools = "";
        this.toolDirectionOffset = 100;
    }
    draw(ctx) {
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h);
    }
    update(ctx) {
        if (this.direction === "Forward") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerBack.png"
        }
        if (this.direction === "Back") { 
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.direction === "Left") { 
            gun.Sprite.src = "./Assets/Sprites/Gun1Flipped.png"
            this.toolDirectionOffset = -50
            this.Sprite.src = "./Assets/Sprites/Player/PlayerLeft.png"
        }
        if (this.direction === "Right") { 
            gun.Sprite.src = "./Assets/Sprites/Gun1.png"
            this.toolDirectionOffset = 100
            this.Sprite.src = "./Assets/Sprites/Player/PlayerRight.png"
        }
        if (this.tools === "Gun") {
            gun.bounds.x = this.bounds.x + this.toolDirectionOffset;
            gun.bounds.y = this.bounds.y + 25;
            gun.visable = true;
            gun.draw();
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