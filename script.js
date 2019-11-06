window.onload = function(){
  document.getElementById("start-button").onclick = function() {
    startGame();
  };

  function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000/60)
    obstaclesArray.splice(0);
    points = 0;
    pointCounter = 0;
    frames = 0;
    sprite = 0;
    row = 1
  }
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
const obstaclesArray = [];
let points = 0;
let pointCounter = 0;
let pointFlag = true;
let sprite = 0;
let row;

class Catapult{
  constructor(){
    this.x = 100;
    this.y = canvas.height/2;
    this.vel = 0;
    this.width = 100;
    this.height = 80;
    this.reset = 0;
    this.shooting = false;
    this.img = new Image();
    this.img.src = './images/catapult.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    if(this.shooting !== true){
      ctx.drawImage(this.img, 0 , 120, 130, 110, this.x, canvas.height - this.height, this.width, this.height);
    }
  }

  shoot(){
    if(this.shooting){
    if(row === 1){
      ctx.drawImage(this.img, 0 + 130 * sprite, 120, 130, 110, this.x, canvas.height - this.height, this.width, this.height);
      ctx.drawImage(this.img, 270 + 10 * sprite, 300, 20, 20, this.x, canvas.height - this.height, this.width, this.height);
      if(frames%20 === 0){sprite++};
      if(sprite === 5){
        sprite = 0;
        row = 0;
      };
    }else{
      ctx.drawImage(this.img, 0 + 130 * sprite, 0, 130, 110, this.x, canvas.height - this.height, this.width, this.height);
      if(frames%10 === 0){sprite++};
      if(sprite === 5){
        sprite = 0;
        row = 1;
        // termina el movimiento de la catapulta, shooting = false para parar su movimiento
        //shootBullet = true para dibujar a la bala
        this.shooting = false;
        myBullet.xrel = this.x;
        myBullet.yrel = this.y;
        myBullet.shootBullet = true;
        myBullet.reset = frames;
      };
    }
  }
  }
}

class Bullet{
  constructor(){
    this.x = 100;
    this.y = 600;
    this.xrel = 100;
    this.yrel = 600;
    this.velx;
    this.vely;
    this.arrayVel = [[600, 300], [447, 447], [300, 600]]
    this.grav = 400;
    this.width = 20;
    this.height = 20;
    this.reset = 0;
    this.shootBullet=false;
    this.img = new Image();
    this.img.src = './images/bullet.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    if(this.shootBullet){
      this.velx = this.arrayVel[bulletDirection.direction][0];
      this.vely = this.arrayVel[bulletDirection.direction][1];
    this.y= this.yrel + 100 - (this.vely * (frames-this.reset)/60) + 0.5 * this.grav * Math.pow((frames-this.reset)/60, 2);
    this.x = this.xrel + 85 + (this.velx * (frames-this.reset)/60);
    ctx.drawImage(this.img, 0, 0, 20, 20, this.x, this.y, this.width, this.height);
    if(this.y == canvas.height){this.shootBullet = false}
    }
  }
}

class Direction{
  constructor(){
    this.x = 100;
    this.y = 100;
    this.arrayDirection = [[184,-76], [141, -141], [76, -184]];
    this.direction = 0;
    this.width = this.arrayDirection[0][0];
    this.height = this.arrayDirection[0][1];
  }

  draw(){
    this.width = this.arrayDirection[this.direction][0];
    this.height = this.arrayDirection[this.direction][1];
    ctx.lineWidth = '3';
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);
    ctx.stroke();
    ctx.closePath();
  } 
}

class Board{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = './images/backg.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
}

class Castle{
  constructor(x, y, wid, hei, sW, sH,source){
    this.x = x;
    this.y = y;
    this.width = wid;
    this.height = hei;
    this.sW = sW;
    this.sH = sH;
    this.health = 3;
    //this.reset = 0;
    //this.shootBullet=false;
    this.img = new Image();
    this.img.src = source; //'./images/castle.png';
    this.img.onload = () => {
      this.draw();
    };
  }
  draw(){
    //this.width = this.arrayDirection[direction][0];
    //this.height = this.arrayDirection[direction][1];
    ctx.drawImage(this.img, 0 , 0, this.sW, this.sH, this.x, this.y, this.width, this.height);
  }
  collision(){
    if((myBullet.x+myBullet.width>this.x) && (myBullet.x<this.x+this.width) && (myBullet.y+myBullet.height>this.y)){
      this.health--;
    }
  }
}


const catap = new Catapult();
const myBullet = new Bullet();
const myBoard = new Board();
//const myCastle = new Castle();
let arrayCastle2 = [new Castle(979, 425, 71, 115, 143, 230, './images/castle3.png'),
                    new Castle(898, 406, 81, 134, 163, 268, './images/castle2.png'),
                    new Castle(824, 442, 74, 98, 148, 197, './images/castle1.png')]
const bulletDirection = new Direction();

function update(){
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myBoard.draw();
  catap.draw();
  catap.shoot();
  myBullet.draw();
  //myCastle.draw();
  arrayCastle2.forEach((element) => {
    element.draw();
  });
  arrayCastle2.forEach((element, index) => {
    element.collision();
    if(element.health = 0){
      arrayCastle2.splice(index, 1);
    }
  });
  bulletDirection.draw();
}

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 38:
      catap.shooting = true;

    break;
    case 37:
      catap.x -= 5;
    break;
    case 39:
      catap.x += 5;
    break;
    case 107:
      if(bulletDirection.direction === 2){
        bulletDirection.direction = 0;
      }else{
        bulletDirection.direction++;
      }
    break;
    case 109:
        if(bulletDirection.direction === 0){
          bulletDirection.direction = 2;
        }else{
          bulletDirection.direction--;
        }
    break;
  }
};
