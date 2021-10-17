var PLAY = 1
var END = 0
var gameState = PLAY

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstacle, o1, o2, o3, o4, o5, o6

var gameOver, gameOverimg

var restart, restartimg

var score = 0
var newImage;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png")
  o2 = loadImage("obstacle2.png")
  o3 = loadImage("obstacle3.png")
  o4 = loadImage("obstacle4.png")
  o5 = loadImage("obstacle5.png")
  o6 = loadImage("obstacle6.png")
  gameOverimg = loadImage("gameOver.png")
  restartimg = loadImage("restart.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  trex = createSprite(50, height - 70, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  invisibleGround = createSprite(width / 2, height - 10, width, 125);
  invisibleGround.visible = false;

  obstaclesGroup =  new Group()
  cloudsGroup = new Group()

  gameOver = createSprite (300,100)
  gameOver.addImage ("go1",gameOverimg)
  gameOver.scale = 0.5

  restart = createSprite (300, 140)
  restart.addImage ("rs1", restartimg)
  restart.scale = 0.5

}

function draw() {
  background(180);
  
  gameOver.visible = false
  restart.visible = false
  text("SCORE: " + score, 500, 50) 
  if(gameState === PLAY){
  ground.velocityX = -4
  score = score + Math.round(frameCount/60)
  if((touches.length>0||keyDown("space")) && trex.y>=100) {
    trex.velocityY = -10;
    touches = []
  }
  trex.velocityY = trex.velocityY + 0.8

  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  spawnClouds();
  spawnObstacles();

 if(obstaclesGroup.isTouching(trex)) {
   gameState = END
 }

  }

  else if(gameState === END){
  ground.velocityX = 0
  obstaclesGroup.setVelocityXEach(0)
  cloudsGroup.setVelocityXEach(0)
  trex.changeAnimation("collided",trex_collided)
  obstaclesGroup.setLifetimeEach(-1)
  cloudsGroup.setLifetimeEach (-1)
  gameOver.visible = true
  restart.visible = true
  if (mousePressedOver(restart)){
    reset()
  }

  }

  

  
  
  trex.collide(invisibleGround);
  
  //spawn the clouds
  drawSprites();
}
function reset(){
  gameState = PLAY
  cloudsGroup.destroyEach()
  obstaclesGroup.destroyEach()
  score = 0
  trex.changeAnimation("running", trex_running)
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.7;
    cloud.velocityX = -3;
    
    //adjust the depth
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloud.lifetime=200
    cloudsGroup.add(cloud)
    }
}

function spawnObstacles() {
  if (frameCount % 60 === 0) {
    obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -6
    var rand = Math.round(random(1,6))
    switch(rand){
      case 1: obstacle.addImage("obs",o1)
      break;
      case 2: obstacle.addImage("obs",o2)
      break;
      case 3: obstacle.addImage("obs",o3)
      break;
      case 4: obstacle.addImage("obs",o4)
      break;
      case 5: obstacle.addImage("obs",o5)
      break;
      case 6: obstacle.addImage("obs",o6)
      break;
      default: break

    }
    obstacle.scale = 0.5
    obstacle.lifetime = 100 
    obstaclesGroup.add(obstacle)
  }
}




