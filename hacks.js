// jude this is for testing

function partsHack(amt){ // sets parts to what ever
    this.Parts = amt;
    document.getElementById("display").innerHTML = "Parts: " + this.Parts;
    console.log("Game: set parts to " + amt);
}

function speedHack(amt){ // sets speed to what ever
    this.Speed = amt;
    console.log("Game: set speed to " + amt);
}

function healthHack(amt){ // sets health to what ever
    this.Health = amt;
    console.log("Game: set health to " + amt);
}
function help(){
    console.log("Command List");
    console.log("partsHack(amount)");
    console.log("speedHack(amount)");
    console.log("healthHack(amount)");
}