export class Robot {
    constructor() {
        this.bounds = new Rect(config.x, config.y, config.w,config.h);
        this.health = 1;
        this.damage = 1;
        this.speed = 1;
        this.image = new Image()
        this.image.src = "./Assets";
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.bounds.x, this.bounds.y, this.bounds.w,this.bounds.h);
    }
    update() {

    }
    
}