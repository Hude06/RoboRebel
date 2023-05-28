class Player {

}
class Enemy {
    constructor(){
        this.x = 10
        this.y = 10
        this.alive = true;
    }
    draw() {
                
    }
}
function Loop() {

    requestAnimationFrame(Loop)
}
function init() {
    Loop();
}
init();