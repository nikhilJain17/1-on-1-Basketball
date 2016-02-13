
var myGamePiece;

function startGame() {
    myGameArea.start();
    myGamePiece = new component(30, 30, "red", 10, 120);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 600;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = (e.type == "keydown");
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = (e.type == "keydown"); 
            // accelerate downwards
            accelerate(.4);
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; // what the fork is this shit    
    this.x = x;
    this.y = y;   
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
        }
    }
    this.hitTop = function() {
        var top = 5;
        if (this.y < top)
            this.y = top;
        
    }
}

function accelerate(n) {
    myGamePiece.gravity = n;
}


function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -10; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 10; }
    if (myGameArea.keys && myGameArea.keys[38]) {accelerate(-.8); }
//    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = 10; }
//    // space to jump
//    if (myGameArea.keys && myGameArea.keys[32]) {
//        
//        // accelerate upwards ////////////for .5 seconds, then fall
//        accelerate(-0.2);
////        setTimeout(null, 500);
////        accelerate(0.1);
//    }
    myGamePiece.newPos();    
    myGamePiece.update();
}