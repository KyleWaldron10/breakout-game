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
function drawBall() {
ctx.beginPath();
ctx.arc(x, y, BallRadius, 0, Math.PI*2);
ctx.fillStyle = "OO95DD";
ctx.fill();
ctx.closePath();
}
function draw() {
//clear the canvas
ctx.clearRect(0, 0, canvas.width, canvas.height);
//Draw the ball
drawBall();
//Bounce off the walls
if(x + dx > canvas.width || x + dx < 0) {
dx = -dx;
}
if(y +dy > canvas.height || y + dy < 0) {
dy =-dy;
}
x += dx;
y += dy;
}
setInterval(draw, 10);