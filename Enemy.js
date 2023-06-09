import { Rect } from "./RectUtils.js";
import { bullets } from "./Player.js";
import { player } from "./Game.js";
export class Robot {
    constructor(src,health,damage,speed,x,y) {
        this.bounds = new Rect(x,y,64,64);
        this.health = health;
        this.damage = damage;
        this.speed = speed;
        this.image = new Image()
        this.image.src = src;
        this.direction = ""
        this.ComputerDirectionSet = false;
        this.pastComputerDirection;

    }
    draw(ctx) {
        if (this.health >= 0) {
            ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w,this.bounds.h);
        }
    }
    collison() {
        if (this.health >= 0) {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].bounds.intersects(this.bounds) || this.bounds.intersects(bullets[i].bounds)) {
                bullets.splice(i,1);
                this.health -= 1;
                if( this.health < 1 ){
                    player.Parts++;
                    document.getElementById("display").innerHTML = "Parts: " + player.Parts;
                }
            };
        };
        if (this.bounds.intersects(player.bounds) || player.bounds.intersects(this.bounds)) {
            player.health -= 0.01;

            }
        }
    };
    follow(player) {
        if ((player.bounds.x) > this.bounds.x){
            this.bounds.x += this.speed
            this.direction = "Right"
        }
        if ((player.bounds.x) < this.bounds.x){
            this.bounds.x -= this.speed
            this.direction = "Left"
        }
        if ((player.bounds.y) > this.bounds.y){
            this.bounds.y += this.speed
            this.direction = "Down"
        }
        if ((player.bounds.y) < this.bounds.y){
            this.bounds.y -= this.speed
            this.direction = "Up"
        }
     }
    
};