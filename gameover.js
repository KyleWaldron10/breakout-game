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

	//Bounce the ball off side walls - if it drops off the bottom - Game Over!
	if(x + dx > canvas.width-BallRadius || x + dx < BallRadius) {
				dx = -dx;
	}


	// check if the ball is hitting the paddle
	if(y + dy < BallRadius) {
		  dy = -dy;
	} else if(y + dy > canvas.height-BallRadius) {
		alert("GAME OVER");
		document.location.reload();
	}

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
setInterval(draw, 10);