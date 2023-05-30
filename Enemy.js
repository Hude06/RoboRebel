import { Rect } from "./RectUtils.js";
import { bullets } from "./Player.js";
export class Robot {
    constructor(src,health,damage,speed) {
        this.bounds = new Rect(200,10,64,64);
        this.health = health;
        this.damage = damage;
        this.speed = speed;
        this.image = new Image()
        this.image.src = src;
    }
    draw(ctx) {
        console.log(this.health)
        if (this.health > 0) {
            ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w,this.bounds.h);

        }
    }
    collison() {
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].bounds.intersects(this.bounds) || this.bounds.intersects(bullets[i].bounds)) {
                //Need to Fix Temerary, Bandane
                bullets[i].alive = false;
            };
        };
    };
    follow(player) {
        if (player.bounds.x > this.bounds.x){
            this.bounds.x += this.speed
        }
        if (player.bounds.x < this.bounds.x){
            this.bounds.x -= this.speed
        }
        if (player.bounds.y > this.bounds.y){
            this.bounds.y += this.speed
        }
        if (player.bounds.y < this.bounds.y){
            this.bounds.y -= this.speed
        }
     }
    
}