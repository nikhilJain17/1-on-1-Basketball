
var myGamePiece; // player 1 aka the shaqtus
//var shaq; // img to hold the shaqtus

var ball;
var ballImg;

function startGame() {
    myGameArea.start();
    myGamePiece = new player(30, 30, "shaqtus", 10, 120);
    
//    shaq = document.getElementById("shaqtus");
    ballImg = document.getElementById("balldontlie");
    
    ball = new ball(200, 200);
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
            accelerateP1(.4);
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function ball(x, y) {
    
    this.gamearea = myGameArea;
    this.width = 20;
    this.height = 20;
    this.speedX = 0; 
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    
    this.bounce = 0.6;

      this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(ballImg, this.x, this.y);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
        this.hitBottom();
        this.hitTop();
//        console.log(this.x + ", " + this.y);
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - 3 * this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
        
    }
    this.hitTop = function() {
        var top = 5;
        if (this.y < top) {
            this.y = top;
        }
    }
    
}

function accelerateBall(n) {
    ball.gravity = n;
}

function player(width, height, name, x, y) {
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0; // what the fork is this shit    
    this.x = x;
    this.y = y;   
    this.gravity = 0.05;
    this.gravitySpeed = 0;
    
    var img = document.getElementById(name);
    
    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(img, this.x, this.y);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed; 
        this.hitBottom();
        this.hitTop();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - 2 * this.height;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = 0;
        }
        
    }
    this.hitTop = function() {
        var top = 5;
        if (this.y < top) {
            this.y = top;
        }
    }
}

function accelerateP1(n) {
    myGamePiece.gravity = n;
}


function updateGameArea() {
    myGameArea.clear();
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;    
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -10; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = 10; }
    if (myGameArea.keys && myGameArea.keys[38]) {accelerateP1(-.8); }

    myGamePiece.newPos();    
    myGamePiece.update();
    
    ball.newPos();
    ball.update();
}