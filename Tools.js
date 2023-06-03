import {Rect} from "./RectUtils.js"
import {player} from "./Game.js"
export class Tool {
    constructor(src,x,y,ctx) {
        this.Sprite = new Image()
        this.Sprite.src = src
        this.bounds = new Rect(x,y,25,25)
        this.visable = true;
        this.BulletSpeed = 6;
        this.direction = player.direction;
        this.set = false;
        this.ctx = ctx;
        this.equipted = false;
    }
    draw(x,y) {
        if(x && y && this.set === false) {
            this.bounds.x = x;
            this.bounds.y = y;
            this.set = true;
        }
        if (this.visable) {
            this.ctx.imageSmoothingEnabled = false;
            this.ctx.drawImage(this.Sprite,this.bounds.x,this.bounds.y,this.bounds.w,this.bounds.h)
        }
    }
}