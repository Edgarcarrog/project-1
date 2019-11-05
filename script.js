window.onload = function() {
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

class catapult{
  constructor(){
    this.x = 100;
    this.y = canvas.height/2;
    this.vel = 0;
    this.width = 130;
    this.height = 110;
    this.reset = 0;
    this.img = new Image();
    this.img.src = './images/catapult.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
   
    if(row === 1){
      ctx.drawImage(this.img, 0 + 130 * sprite, 120, 130, 110, this.x, canvas.height - this.height, this.width, this.height);
      ctx.drawImage(this.img, 270 + 10 * sprite, 300, 20, 20, this.x, canvas.height - this.height, this.width, this.height);
      if(frames%60 === 0){sprite++};
      if(sprite === 5){
        sprite = 0;
        row = 0;
      };
    }else{
      ctx.drawImage(this.img, 0 + 130 * sprite, 0, 130, 110, this.x, canvas.height - this.height, this.width, this.height);
      if(frames%60 === 0){sprite++};
      if(sprite === 5){
        sprite = 0;
        row = 1;
      };
    }
}
}

class bullet{
  constructor(){
    this.x = 100;
    this.y = 600;
    this.velx = 400;
    this.vely = 400;
    this.grav = 300;
    this.width = 20;
    this.height = 20;
    this.reset = 0;
    this.img = new Image();
    this.img.src = './images/bullet.png';
    this.img.onload = () => {
      this.draw();
    };
  }

  draw() {
    this.y= 600 - (this.vely * (frames-this.reset)/60) + 0.5 * this.grav * Math.pow((frames-this.reset)/60, 2);
    this.x = 100 + (this.velx * (frames-this.reset)/60);
    ctx.drawImage(this.img, 0, 0, 20, 20, this.x, this.y, this.width, this.height);
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



const catap = new catapult();
const myBullet = new bullet();
const myBoard = new Board();

function update(){
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  myBoard.draw();
  catap.draw();
  myBullet.draw();
 
}
