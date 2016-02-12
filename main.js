var player1;


function startGame() {
    console.log("1 ON 1 BASKETBALL!!!!!!!!!!!!!");
    myGameArea.start();
    player1 = new component(40, 40, "blue", 40, 40);
}


function component(width, height, color, x, y) {
 
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    
}

var myGameArea = {
    canvas : document.createElement("canvas"),   
    
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 666;
        this.context = this.canvas.getContext("2d");
        
        this.canvas.textContent = "sankwroot";
        document.body.insertBefore(this.canvas, document.body.childNodes[0]); // wtf does this line do
    }

}

