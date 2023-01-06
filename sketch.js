let res = [400, 400];
let framerate = 60;
let backgroundColor = 220;

class Square {
  constructor(pos, size, vel, squareColor, lineWeight, lineColor) {
    this.prevPos = [...pos];
    this.pos = pos;
    this.size = size;
    this.vel = vel;
    for (let i in this.vel)
      this.vel[i] /= framerate;
    this.squareColor = squareColor;
    this.lineColor = lineColor;
  }
  
  apply_vel() {
    this.prevPos = [...this.pos];
    for (let i in this.pos)
      this.pos[i] += this.vel[i];
  }
  
  collision() {
    for (let i in this.pos) {
      if (this.pos[i] < 0) {
        this.pos[i] = 0;
        this.vel[i] = -this.vel[i];
      }
      else if (this.pos[i] + this.size[i] > res[0]) {
        this.pos[i] = res[0] - this.size[i];
        this.vel[i] = -this.vel[i];
      }
    }
  }
  
  draw() {
    fill(this.squareColor);
    rect(this.pos[0], this.pos[1], this.size[0], this.size[1]);
    beginLayer();
    stroke(this.lineColor);
    line(this.prevPos[0] + this.size[0] / 2, this.prevPos[1] + this.size[1] / 2,
        this.pos[0] + this.size[0] / 2, this.pos[1] + this.size[1] / 2);
    endLayer();
  }
  
  play() {
    this.apply_vel();
    this.collision();
    this.draw();
  }
}

let squares = new LinkedList();

function SpawnSquare() {
  squares.push(new Square([Number(prompt("Enter the x position of the rectangle")),
                           Number(prompt("Enter the y position of the rectangle"))],
                          [Number(prompt("Enter the width of the rectangle")),
                           Number(prompt("Enter the height of the rectangle"))],
                          [Number(prompt("Enter the x velocity of the rectangle")),
                           Number(prompt("Enter the y velocity of the rectangle"))],
                          prompt("Enter the color of the rectangle"),
                          Number(prompt("Enter the weight of the line")),
                          prompt("Enter the color of the line")));
}

function setup() {
  SpawnSquare();
  createCanvas(res[0], res[1]);
  frameRate(framerate);
  background(backgroundColor);
}

function draw() {
  background(backgroundColor);
  beginLayer();
  endLayer();
  if (squares.length != 0)
    for (let i = squares.head; i != null; i = i.next)
      i.data.play();
}

function keyPressed() {
  switch (keyCode) {
    case 83: // s to spawn
      SpawnSquare();
      break;
    case 67: // c to clear rectangles
      if (prompt("Are you sure that you want to clear all rectangles? (yes/no)") == "yes")
        squares.clear();
      break;
    case 80: // p to pause
      prompt("Paused!");
      break;
  }
}