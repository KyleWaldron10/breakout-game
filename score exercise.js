//Setup some variables for the canvas
var canvas = document.getElementById("myCanvas");
//the ctx variables sets up the 2nd context so we can paint on it
var ctx = canvas.getContext("2d");
//Setup other variables for the ball size and position
var BallRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
//Now define the paddle
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;
var rightPressed = false;
var leftPressed = false;
var score = 0;

//setup some bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30; 

//Hold the bricks in a two-dimensional array - think of it as rows and columns
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
	bricks[c] = [];
	for(r=0; r<brickRowCount; r++) {
		bricks[c][r] = { x: 0, y: 0, status: 1 };
	}
}

//this function draws the bricks 
function drawBricks() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount; r++) {
			if(bricks[c][r].status == 1) {
			var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
			var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
			bricks[c][r].x = brickX;
			bricks[c][r].y = brickY;
			ctx.beginPath();
			ctx.rect(brickX, brickY, brickWidth, brickHeight);
			ctx.fillStyle = "#0095DD";
			ctx.fill();
			ctx.closePath();
		}
	}
}
}
	

	
//This function draws the ball on the canvas
function drawBall() {
ctx.beginPath();
ctx.arc(x, y, BallRadius, 0, Math.PI*2);
ctx.fillStyle = "#0095DD";
ctx.fill();
ctx.closePath();
}

//This function draws the paddle
function drawPaddle(){ctx.beginPath();
ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
ctx.fillStyle ="#0095DD";
ctx.fill();
ctx.closePath();
}

function draw() {
	//clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//Draw the ball
	drawBall();
	//draw the paddle
	drawPaddle();
	// collisionDetection
	collisionDetection();
	// draw the bricks
	drawBricks();
	// draw the score
	drawScore();
	
	//Bounce the ball off side walls - if it drops off the bottom - Game Over!
	if(x + dx > canvas.width-BallRadius || x + dx < BallRadius) {
				dx = -dx;
	}


	// check if the ball is hitting the paddle
	if(y + dy < BallRadius) {
		  dy = -dy;
	} else if(y + dy > canvas.height-BallRadius) {
    if(x > paddleX && x < paddleX + paddleWidth) {
			dy = -dy;
	}
	else { 
		alert("GAME OVER");
		document.location.reload();
	}
	}	
	
	if(rightPressed && paddleX < canvas.width-paddleWidth){
		paddleX += 7;
	}
	else if(leftPressed && paddleX > 0){
		paddleX -= 7;
	}
	
	x += dx;
	y += dy;
}

//monitor the documents for events that move the paddle
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup" , keyUpHandler, false);

//Define the functions to handle the keyDown or keyUp events
function keyDownHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = true;
	}
	else if(e.keyCode ==37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if(e.keyCode == 39) {
		rightPressed = false;
	}
	else if(e.keyCode == 37) {
		leftPressed = false;
	}
}
function collisionDetection() {
	for(c=0; c<brickColumnCount; c++) {
		for(r=0; r<brickRowCount;r++) {
			var b = bricks[c][r];
			if(b.status == 1) {
			if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
				dy = -dy;
				b.status = 0;
				score++;
				score++;
				score++;
				score++;
				score++;
				score++;
				score++;
				score++;
				score++;
				score++;
			}
		}
	}
 }
}
function drawScore() {
	ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
	ctx.fillText("Score: "+score, 8, 20);
	document.getElementById("gamescore").innerHTML = "score: " + score;
}




setInterval(draw, 10);