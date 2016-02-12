var player1;


function startGame() {
    console.log("1 ON 1 BASKETBALL!!!!!!!!!!!!!");
    myGameArea.start();
    player1 = new component("player1", 40, 40, "blue", 40, 40);
}


function component(name, width, height, color, x, y) {
 
    this.name = name;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
     this.update = function(){
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
//        if (this.x
//        console.log(name + ": " + this.x + ", " + this.y);
    }
    
}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 666;
        this.canvas.height = 666;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        // to move the things with keys
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
        })
    
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


function updateGameArea() {
    myGameArea.clear();
//    player1.x;
    
    if (myGameArea.keys && myGameArea.keys[37]) {player1.x += -10; }
    if (myGameArea.keys && myGameArea.keys[39]) {player1.x += 10; }
    if (myGameArea.keys && myGameArea.keys[38]) {player1.y += -10; }
    if (myGameArea.keys && myGameArea.keys[40]) {player1.y += 10; }
    
    
    player1.update();
}
 

