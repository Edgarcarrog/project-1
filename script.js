window.onload = function(){
  document.getElementById("start-button").onclick = function(){
    startGame();
  };

  function startGame(){
    if (interval) return;
    interval = setInterval(update, 1000/60)
    points = 0;
    pointCounter = 0;
    frames = 0;
  }
};

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let interval;
let frames = 0;
let points = 0;
let pointCounter = 0;

class Catapult{
  constructor(source){
    this.width = 100;
    this.height = 80;
    this.x = 0;
    this.y = canvas.height - this.height;
    this.vel = 0;
    this.row = 1;
    this.sprite = 0;
    this.reset = 0;
    this.shooting = false;
    this.img = new Image();
    this.img.src = source;
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    if(this.shooting !== true){
      ctx.drawImage(this.img, 0 , 120, 130, 110, this.x, this.y, this.width, this.height);
    }
  }

  shoot(){
    if(this.shooting){
    if(this.row === 1){
      ctx.drawImage(this.img, 0 + 130 * this.sprite, 120, 130, 110, this.x, this.y, this.width, this.height);
      //ctx.drawImage(this.img, 270 + 10 * this.y, 300, 20, 20, this.x, canvas.height - this.height, this.width, this.height);
      if(frames%10 === 0){this.sprite++};
      if(this.sprite === 5){
        this.sprite = 0;
        this.row = 0;
      };
    }else{
      ctx.drawImage(this.img, 0 + 130 * this.sprite, 0, 130, 110, this.x, this.y, this.width, this.height);
      if(frames%10 === 0){this.sprite++};
      if(this.sprite === 5){
        this.sprite = 0;
        this.row = 1;
        // termina el movimiento de la catapulta, shooting = false para parar su movimiento
        //shootBullet = true para dibujar a la bala
        this.shooting = false;
        bullet1.xrel = this.x;
        bullet1.yrel = this.y;
        bullet1.shootBullet = true;
        bullet1.reset = frames;
      };
    }
  }
  }
}

class Catapult2{
  constructor(source){
    this.width = 100;
    this.height = 80;
    this.x = canvas.width-this.width;
    this.y = canvas.height - this.height;
    this.vel = 0;
    this.row = 1
    this.sprite = 0;
    this.reset = 0;
    this.shooting = false;
    this.img = new Image();
    this.img.src = source;
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    if(this.shooting !== true){
      ctx.drawImage(this.img, 0, 120, 130, 110, this.x, this.y, this.width, this.height);
    }
  }

  shoot(){
    if(this.shooting){
    if(this.row === 1){
      ctx.drawImage(this.img, 0 + 130 * this.sprite, 120, 130, 110, this.x, this.y, this.width, this.height);
      ctx.drawImage(this.img, 270 + 10 * this.sprite, 300, 20, 20, this.x, this.y, this.width, this.height);
      if(frames%10 === 0){this.sprite++};
      if(this.sprite === 5){
        this.sprite = 0;
        this.row = 0;
      };
    }else{
      ctx.drawImage(this.img, 0 + 130 * this.sprite, 0, 130, 110, this.x, this.y, this.width, this.height);
      if(frames%10 === 0){this.sprite++};
      if(this.sprite === 5){
        this.sprite = 0;
        this.row = 1;
        // termina el movimiento de la catapulta, shooting = false para parar su movimiento
        //shootBullet = true para dibujar a la bala
        this.shooting = false;
        bullet2.xrel = this.x +70;
        bullet2.yrel = this.y;
        bullet2.shootBullet = true;
        bullet2.reset = frames;
      };
    }
  }
  }
}

class Bullet{
  constructor(direction){
    this.x = canvas.height;
    this.y = canvas.width;
    this.xrel;
    this.yrel;
    this.velx = 0;
    this.vely = 0;
    this.vel = 500;
    this.deg = 30;
    this.direction = direction;
    this.grav = 300;
    this.width = 25;
    this.height = 25;
    this.reset = 0;
    this.shootBullet = false;
    this.isShooting = true;
    this.img = new Image();
    this.img.src = './images/bullet.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw(){
    if(this.shootBullet){
      //if(this.isShooting == true){
      //  this.deg = direction1;
      //}
      this.isShooting = false;
      this.velx = this.vel*Math.cos(this.deg*Math.PI / 180)
      this.vely = this.vel*Math.sin(this.deg*Math.PI / 180)
      this.y = this.yrel - (this.vely * (frames-this.reset)/60) + 0.5 * this.grav * Math.pow((frames-this.reset)/60, 2);
      this.x = this.xrel + (this.velx * this.direction * (frames-this.reset)/60);
      ctx.drawImage(this.img, 0, 0, 20, 20, this.x, this.y, this.width, this.height);
      if(this.y > canvas.height){
        this.shootBullet = false;
        this.isShooting = true;
      }
    }
  }
}

class Direction{
  constructor(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.long = 200;
    this.deg = 30
    this.width = 200
    this.height = 0
    this.value = 0;
}
  draw(){
    this.value++;
    if(this.value === 102){this.value=0}
    this.width = this.long*Math.cos(this.deg*Math.PI/180)
    this.height = -this.long*Math.sin(this.deg*Math.PI/180)
    ctx.lineWidth = '3';
    ctx.lineStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x + this.direction * this.width, this.y + this.height);
    ctx.stroke();
    ctx.closePath();
    ctx.font = '40px Courier';
    ctx.fillText(this.value, this.x, this.y-200);
  } 
}

class Board{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = './images/back.jpg';
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
    this.health = 5;
    this.img = new Image();
    this.img.src = source;
    this.img.onload = () => {
      this.draw();
    };
  }
  draw(){
    ctx.drawImage(this.img, 0 , 0, this.sW, this.sH, this.x, this.y, this.width, this.height);
  }
  collision(bullet, index){
    return (bullet.x+bullet.width>this.x) && (bullet.x<this.x+this.width) 
    && (bullet.y+bullet.height>this.y) && (bullet.y<this.y+this.height);
  }
}

function isTouching(array, bullet){
  array.forEach((element, index) => {
    if(element.collision(bullet, index)){
      bullet.shootBullet=false;
      bullet.isShooting = true;
      bullet.y = canvas.height;
      element.health--;
      if(element.health === 0){
        array.splice(index, 1)
      }
    }
  });
}

const catap1 = new Catapult('./images/catapult.png');
const catap2 = new Catapult2('./images/catapultbis.png');
const bullet1 = new Bullet(1);
const bullet2 = new Bullet(-1);
const myBoard = new Board();
const bulletDirection1 = new Direction(100, 400, 1);
const bulletDirection2 = new Direction(canvas.width-100, 400, -1);
const arrayCastle2 = [new Castle(1029, 425, 71, 115, 143, 230, './images/castle3.png'),
                    new Castle(948, 406, 81, 134, 163, 268, './images/castle2.png'),
                    new Castle(874, 442, 74, 98, 148, 197, './images/castle1.png')]
const arrayCastle1 = [new Castle(100, 425, 71, 115, 143, 230, './images/castle4.png'),
                    new Castle(171, 406, 81, 134, 163, 268, './images/castle5.png'),
                    new Castle(252, 442, 74, 98, 148, 197, './images/castle6.png')]
let direction1 = 30;
let direction2 = 30;

function update(){
  if(arrayCastle1.length == 0 || arrayCastle2.length == 0){
    clearInterval(interval);
  }
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myBoard.draw();
  catap1.draw();
  catap1.shoot();
  catap2.draw();
  catap2.shoot();
  bullet1.draw();
  bullet2.draw();
  arrayCastle2.forEach((element) => {
    element.draw();
  });
  arrayCastle1.forEach((element) => {
    element.draw();
  });
  isTouching(arrayCastle1, bullet2)
  isTouching(arrayCastle2, bullet1)
  bulletDirection1.draw();
  bulletDirection2.draw();
}

document.onkeydown = (e) => {
  switch (e.keyCode) {
    case 83:
      catap1.shooting = true;
      if(bullet1.isShooting == true){
        bullet1.vel = 400 + bulletDirection1.value*4;
        bullet1.deg = bulletDirection1.deg;
      }
    break;
    case 40:
      catap2.shooting = true;
      if(bullet2.isShooting == true){
        bullet2.vel = 400 + bulletDirection2.value*4;
        bullet2.deg = bulletDirection2.deg;
      }
    break;
    case 65:
      if(bulletDirection1.deg == 70){
        bulletDirection1.deg = 30;
      }else{
        bulletDirection1.deg+=10;
      }
    break;
    case 68:
      if(bulletDirection1.deg == 30){
        bulletDirection1.deg = 70;
      }else{
        bulletDirection1.deg-=10;
      }
    break;
    case 39:
      if(bulletDirection2.deg == 70){
        bulletDirection2.deg = 30;
      }else{
        bulletDirection2.deg+=10;
      }
    break;
    case 37:
      if(bulletDirection2.deg == 30){
        bulletDirection2.deg = 70;
      }else{
        bulletDirection2.deg-=10;
      }
    break;
  }
};
