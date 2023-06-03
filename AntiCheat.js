// anti cheat for the game
function healthAC(){
    if( this.health > 4 ){
        this.health = 3;
        console.log("AntiCheat: blocked health bypass");
    }
}