var canvas = document.getElementById("canvas")
var ctx = canvas.getContext('2d')
var width = canvas.width
var height = canvas.height
const thingyatmiddlewidth = 4;
const thingyatmiddleheight = canvas.height;

const SmackyBatthingwidth = 10;
const SmackyBatthingheight = 100;
var upArrowPressed = false;
var downArrowPressed = false;
ctx.fillStyle = "black";
/*class middleThingy {
    constructor(){
        this.x = width /2 - thingyatmiddlewidth /2
        this.y = 0
        this.width = thingyatmiddlewidth
        this.height = thingyatmiddleheight        
        this.colour = "#FFF"
    }
}*/
//this.x = 10
//this.y = height / 2 - SmackyBatthingheight / 2,
class Paddle {
  constructor(x, y, scoreLocation) {
    this.isMovingUp = false
    this.isMovingDown = false
    this.x = x
    this.y = y
    this.width = SmackyBatthingwidth,
    this.height = SmackyBatthingheight,
    this.color = '#FFF',
    this.score = 0
    this.yVelocity = 6
    this.scoreLocation = scoreLocation
  }
  Draw() {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.width, this.height)
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText(this.score, this.scoreLocation, 20);
  }
  updateScore(){
    this.score += 1
    console.log(this.score)
  }
  moveCheck(){
    if(this.isMovingUp == true){
      this.moveUp()
    }
    if(this.isMovingDown == true){
      this.moveDown()
    }
  }
  collide(ballX, ballY, ballRadius) {
    var top = this.y;
    var right = this.x + this.width;
    var bottom = this.y + this.height;
    var left = this.x;

    var balltop = ballY - ballRadius;
    var ballright = ballX + ballRadius;
    var ballbottom = ballY + ballRadius;
    var ballleft = ballX - ballRadius;
    if ((ballleft> left && ballleft < right) || (ballright > left && ballleft < right)) {
      console.log("top: " + (balltop.toString()));
      console.log("left: " + (left.toString()));
      console.log("right: " + (right.toString()));
      if ((ballbottom > top && ballbottom < bottom) && !(balltop > top && balltop < bottom)) {
        console.log('yes')
        return 'negY';

      }
      if ((balltop > top && balltop < bottom) && !(ballbottom > top && ballbottom < bottom)) {
        console.log('yes')
        return 'negY';
        
      }
    }

    return ballleft < right && balltop < bottom && ballright > left && ballbottom > top;

  }
  computerMove(ballY){
    this.y = ballY -50
  }
  moveUp() {
    if (this.y > 5) {

      this.y -= this.yVelocity
      console.log('UPPPPIF')
      console.log(this.y)
      console.log(height)
    }
    console.log('RUNN')
  }
  moveDown() {
    if (this.y < 296) {
      this.y += this.yVelocity
    }

  }
}
ctx.fillRect(0, 0, width, height);
class Ball {
  constructor() {
    this.x = width / 2
    this.y = height / 2
    this.radius = 7
    this.velY = 5
    this.velX = 5
    this.color = '#FFFFFF'
  }
  move() {
    /*if (this.x == 0) {
      this.velX = this.velX * -1
    }
    if (this.x == width) {
      this.velX = this.velX * -1
    }*/
    if (this.y == 0) {
      this.velY = this.velY * -1
    }
    if (this.y == height) {
      this.velY = this.velY * -1
    }
    if(this.x==0){
      this.x = width/2
      this.y = height/2
      Computer.updateScore()
    }
    if(this.x==width){
      
      this.x = width/2
      this.y = height/2
      paddle.updateScore()
    }
    this.x += this.velX;
    this.y += this.velY;
  }
  Bounce(collisionPoint) {
    if (collisionPoint == 'negY') {
      this.velY = this.velY * -1
      this.velX = this.velX *-1
    } else {
      this.velX = this.velX * -1
    }

  }
  ballReset(){
    this.x = width/2
    this.y = height/2
  }
  getX() {
    return this.x
  }
  getY() {
    return this.y
  }
  getRadius() {
    return this.radius
  }

  Draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)
    ctx.fillStyle = this.color;
    ctx.fill()
    return "done"
  }
}
var paddle = new Paddle(10, height / 2 - SmackyBatthingheight / 2, (width/2)-20)
var Computer = new Paddle(width - (SmackyBatthingwidth + 10), height / 2 - SmackyBatthingheight / 2, (width/2)+20)
// 38, 40 (38 is up 40 is down)
window.addEventListener('keydown', e => {
  if (e.keyCode == 38) {
    paddle.isMovingUp = true;
  }
  if (e.keyCode == 40) {
    paddle.isMovingDown = true
  }
})
window.addEventListener('keyup', e => {
  if (e.keyCode == 38) {
    paddle.isMovingUp = false;
  }
  if (e.keyCode == 40) {
    paddle.isMovingDown = false;
  }
})
var balls = [];
var squares = [];
const ballNum = 1;
while (balls.length < ballNum) {  
  var ball = new Ball();

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0, 0, width, height);

  for (var i = 0; i < balls.length; i++) {
    balls[i].Draw()

    if (paddle.collide(ball.getX(), ball.getY(), ball.getRadius())) {
      console.log('hit')
      var collisionPoint = paddle.collide(ball.getX(), ball.getY(), ball.getRadius())
      ball.Bounce(collisionPoint)
    }
    if (Computer.collide(ball.getX(), ball.getY(), ball.getRadius())) {
      console.log('hit')
      var collisionPoint = Computer.collide(ball.getX(), ball.getY(), ball.getRadius())
      ball.Bounce(collisionPoint)
    }
    balls[i].move()
    paddle.Draw()
    Computer.Draw()
    Computer.computerMove(balls[i].getY())
    paddle.moveCheck()
  }
  if(paddle.score < 7 && Computer.score < 7){
  requestAnimationFrame(loop);
  } else {
    restart()
  }
}
function restart(){
  balls[0].ballReset()
  balls[0].Draw()
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
loop();