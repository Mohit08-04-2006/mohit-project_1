var END = 0;
var PLAY = 1;
var gameState = PLAY;
var bheem, bheem_running, bheem_collided;
var ground, backgroundImg;
var background2;
var enemies, enemy1, enemy2;
var ladoo, ladooImg;
var gameover, gameoverImg;
var restart, restartImg;
var enemiesGroup;
var ladoosGroup;
var score;
var life;

function preload(){
  //loading images and animations
 bheem_running = loadAnimation("bheem(1).png","bheem(2).png","bheem(3).png","bheem(4).png");
  bheem_collided = loadAnimation("bheem_fall.png");
  backgroundImg = loadImage("backgroundImage.jpeg");
  ladooImg = loadImage("ladoo.png");
  enemy1 = loadImage("enemy1.png");
  enemy2 = loadImage("enemy.png");
  enemy3 = loadImage("enemy3.png");
  gameoverImg = loadImage("gameover.png");
  restartImg = loadImage("restart.png");
  
}

function setup(){
  // creating canvas
  createCanvas(windowWidth,windowHeight);
  // Creating sprites
  background2 = createSprite(width/2,height/2,600,400);
  background2.addImage(backgroundImg);
  background2.scale = 3;
  
   gameover = createSprite(width/2,140,20,20);
  gameover.addImage(gameoverImg);
  
  restart = createSprite(width-290,190,20,20);
  restart.addImage(restartImg);
  restart.scale = 0.15;
  
   ground = createSprite(width/2,height-100,600,20);
   ground.visible = false;
  
  bheem = createSprite(120,height-120,30,40);
  bheem.addAnimation("running", bheem_running);
  bheem.addAnimation("collided", bheem_collided);
  bheem.scale = 0.2;
  
  // Creating Groups
  enemiesGroup = new Group();
  ladoosGroup = new Group();
  
  // Setting Collider
  bheem.setCollider("circle",-290,-80,59);
  
  score = 0;
  life = 0;
  
}

function draw(){
  background(backgroundImg);
  //giving velocity to background
  background2.velocityX = -6
  
  // Infinite background
  if (background2.x<0){
    background2.x = background2.width/2;
  }
  
  // Adding Scores
  fill("red");
  textSize(20);
  text("score = "+score,150,12);
  text("life = "+life,width-100,12);
  
  // Adding Game states
  if (gameState == PLAY){
    bheem.changeAnimation("running", bheem_running);
    
  // Jumping Bheem
  if (keyDown("space") && bheem.collide(ground)){
    bheem.velocityY = -12;
  }
    
     // giving gravity
     bheem.velocityY = bheem.velocityY + 0.5;
     bheem.collide(ground);
    
     spawnEnemies();
     spawnLadoos();
    
    gameover.visible = false;
    restart.visible = false;
    
    if (ladoosGroup.isTouching(bheem)){
      score = score + 1;
      ladoosGroup.destroyEach();
    }
    
    if (enemiesGroup.isTouching(bheem)){
      life = life + 1;
      gameState = END;
    }
    
  }
  else if (gameState == END){
    bheem.collide(ground);
    bheem.x = 50;
    bheem.y = 260;
    bheem.changeAnimation("collided",  bheem_collided);
    
    background2.velocityX = 0;
    enemiesGroup.setVelocityXEach(0);
    ladoosGroup.setVelocityXEach(0);
    enemiesGroup.setLifetimeEach(-1);
    ladoosGroup.setLifetimeEach(-1);
    
    gameover.visible = true;
    restart.visible = true;
    
    if (mousePressedOver(restart)){
      bheem.x = bheem.x+50;
      enemiesGroup.setLifetimeEach(0);
      ladoosGroup.setLifetimeEach(0);
      score = 0;
      gameState = PLAY;
    }
    
  }
  
  drawSprites();
}

function spawnEnemies(){
  // Creating enemies
  if (frameCount% 100 == 0){
    enemies = createSprite(width-50,height-150,30,40);
    enemies.velocityX =-(6+score/6);
    enemies.lifetime = 100;
    enemiesGroup.add(enemies);
    
    var r = Math.round(random(1,3))
    switch (r){
      case 1: enemies.addImage(enemy1);
    enemies.scale = 0.06;
        enemies.y = height-130;
        break;
        
        case 2: enemies.addImage(enemy2);
        enemies.scale = 0.045;
        enemies.y = height-140;
        break;
        
        case 3: enemies.addImage(enemy3);
        enemies.scale = 0.2;
        enemies.y = height-150;
        enemies.setCollider("circle",200,50,250);
        break;
    }
  }
}

function spawnLadoos(){
  if(frameCount% 80 == 0){
  var s = Math.round(random(150,190));
  ladoo = createSprite(width-50,s,20,20);
  ladoo.addImage(ladooImg);
  ladoo.scale = 0.06;
  ladoo.velocityX =-(6+score/6);
  ladoo.lifetime = 100;
  ladoosGroup.add(ladoo);
  }
}

