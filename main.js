let canvas = document.getElementById("canvas")
let context = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
canvas.style = "border: 1px solid red";

let ball = {
    x: canvas.width/2,
    y: canvas.height/2,
    r: 10,
    vx: 5,
    vy: 5,
    color: "red",
    draw: function (){
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.r, 0, 2*Math.PI);
        context.fill();
    }
}

let rect = {
    x: (canvas.width/2)-(120/2),
    y: (canvas.height-20)-20,
    width: 120,
    height: 20,
    vx: 20,
    color: "purple",
    draw: function (){
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = this.color;
        context.fill();
    },
    move: function(key) {
        //left move
        if(key == 'A' || key == 'a'){
            rect.x -= rect.vx;
        }

        //right move
        if(key == 'D' || key == 'd'){
            rect.x += rect.vx;
        }
    }
}

function setup(){
    main();
}

function update(){
    ball.x += ball.vx;
    ball.y += ball.vy;

    //Collisions

    //up
    if((ball.y - ball.r) <= 0){
        ball.vy *= -1;
    }

    //walls
    if((ball.x - ball.r) <= 0 || (ball.x + ball.r) >= canvas.width){
        ball.vx *= -1;
    }

    //down
    if((ball.y + ball.r) >= canvas.height){
        // window.alert("game over");
        ball.vy *= -1;
    }

    //in the rectangle up
    if((ball.x - ball.r) >= rect.x && 
       (ball.x + ball.r) <= (rect.x + rect.width) &&
       (ball.y + ball.r) >= rect.y){
           ball.vy *= -1;
    }

    // window.onkeydown = rect.move(event);
    window.onkeydown = () => {rect.move(event.key)}
    draw();
}

function draw(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw the ball
    ball.draw();

    // Draw the rect
    rect.draw();
}

function main(){
    window.requestAnimationFrame(main, canvas);
    update();
}