import { Component, OnInit, HostListener } from '@angular/core';


@Component({
  selector: 'app-battlescreen',
  templateUrl: './battlescreen.component.html',
  styleUrls: ['./battlescreen.component.css']
})
export class BattlescreenComponent implements OnInit {
  currPos: number = 0;
  player: HTMLElement;
  key: any;
  size: number = 800;
  height: number = 720;
  width: number = 1280;
  facing: string = 'down';
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  public player1: cPlayer;

  constructor() { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(this.key)
    this.move(this.key, this.player1)
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.player1 = new cPlayer(50, 50, 50, "blue", 2, this.ctx)
    console.log(this.player1)
    this.loop();
    // this.createGrid(this.size)


    // this.createGrid(this.size);
    // let contCheck = document.getElementById('container');
    // console.log(contCheck)
    // this.player = document.getElementById(JSON.stringify(this.currPos))
    // this.player.style.backgroundColor = 'black';
  }
  
  loop = () => {
    requestAnimationFrame(this.loop);
    // this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, 1280, 720);
    this.player1.draw()
    this.createGrid(this.size);
  }

    // drawGrid = function(w, h, id) {
    // var canvas = document.getElementById(id);
    // var ctx = canvas.getContext('2d');
    // ctx.canvas.width  = w;
    // ctx.canvas.height = h;


    // for (x=0;x<=w;x+=20) {
    //     for (y=0;y<=h;y+=20) {
    //         ctx.moveTo(x, 0);
    //         ctx.lineTo(x, h);
    //         ctx.stroke();
    //         ctx.moveTo(0, y);
    //         ctx.lineTo(w, y);
    //         ctx.stroke();
    //     }
    // }

    // };



  createGrid = (x) => {
    //   console.log('from inside creategrid', this.ctx)
    this.ctx.strokeStyle = 'white';
    for (var i = 0; i <= this.width*10; i+=100) {
        this.ctx.beginPath();
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, this.width)
        this.ctx.stroke();
    } 
    for (var j = 0; j <=this.height*10; j+= 100 ) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, j);
        this.ctx.lineTo(this.width,j);
        this.ctx.stroke();
    }
  };

    // let container = document.getElementById('container');
    // let grid = document.createElement('div')
    // let count = 0
    // grid.style.width = JSON.stringify(960/x) + 'px'
    // grid.style.height = JSON.stringify(960/x) + 'px'
    // // grid.style.outline = '1px solid black';
    // grid.className += 'grid';
    // for (var rows = 0; rows < x; rows++) {
    //     for (var columns = 0; columns < x; columns++) {
    //         // $("#container").append("<div class='grid'></div>");
    //         grid.id = JSON.stringify(count);
    //         count++;
    //         let newBlock = grid.cloneNode();

    //         container.appendChild(newBlock);

    //     };
    // };
      // document.getElementsByClassName('grid').style.width('width', JSON.stringify(960/x));
      // // $(".grid").height(960/x);
      // document.getElementById('grid')..setAttribute('height', JSON.stringify(960/x));
//   };

  move = (direction, player) => {
    // let currPos = document.getElementById('selected');
    // this.player.style.backgroundColor = '';
    if (direction === 'w') {
      // if (!(this.currPos - this.size < 0)){
      //   this.currPos -= this.size;
      // }
      player.y -= 100
    } else if (direction === 'd') {
      // if ((this.currPos + 1) % this.size !== 0){
      //   this.currPos += 1;
      // }
      player.x += 100
    } else if (direction === 's') {
      // if (!(this.currPos + this.size >= this.size**2)){
      //   this.currPos += this.size;
      // }
      player.y += 100
    } else if (direction === 'a') {
      // if (this.currPos % this.size !== 0){
      //   this.currPos -= 1;
      // }
      player.x -= 100
    }

  // this.player = document.getElementById(JSON.stringify(this.currPos))
  // this.player.style.backgroundColor = 'black'
  }
}

//make modular------
// const player1 = new cPlayer;


//make modular------
interface iPlayer {
    draw(): void;
    x: number;
    y: number;
    color: string;
    lineWidth: number;
}

//make modular ----

class cPlayer implements iPlayer {
  public x: number = 0;
  public y: number = 0;
  public radius: number = 10;
  public lineWidth: number = 2;
  public color: string = 'red';
  public position: cVector = new cVector(this.x, this.y);
  ctx: CanvasRenderingContext2D;

  constructor(
    x: number, 
    y: number, 
    radius: number, 
    color: string = "red", 
    line_width: number = 2,
    ctx: any
  )
  {
     this.x = x;
     this.y = y;
     this.radius = radius;
     this.color = color;
     this.ctx = ctx;
     this.lineWidth = line_width;
  }

  public draw = (): void =>{
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.stroke();
    this.ctx.restore();
  }
}

//modulize
enum COLLIDER {
  CIRCLE,
  RECTANGLE,
  ROTRECTANGLE,
  LINE,
  POLYGON,
  COMPOUND
}

//modulize
interface iCollider {
  collisionTest(obj: iCollider): boolean;
  colliderType: COLLIDER;
  position: cVector;
}


//modulize
class cVector {
  public x: number = 0;
  public y: number = 0;

  constructor(x: number = 0, y: number = 0) {
      this.x = x;
      this.y = y;
  }

  public magnitude = (): number => {
      return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  public magSq = (): number => {
      return this.x * this.x + this.y * this.y;
  }

  public normalize = (magnitude: number = 1): cVector => {
      var len: number = Math.sqrt(this.x * this.x + this.y * this.y);
      this.x /= len;
      this.y /= len;
      return this;
  }

  public zero = (): void => {
      this.x = 0;
      this.y = 0;
  }

  public copy = (point: cVector): void => {
      this.x = point.x;
      this.y = point.y;
  }

  public duplicate = (): cVector => {
      var dup: cVector = new cVector(this.x, this.y);
      return dup;
  }

  public rotate = (radians: number): void => {
      var cos: number = Math.cos(radians);
      var sin: number = Math.sin(radians);
      var x: number = (cos * this.x) + (sin * this.y);
      var y: number = (cos * this.y) - (sin * this.x);
      this.x = x;
      this.y = y;
  }

  public rotate90 = (): void => {
      var x: number = -this.y;
      var y: number = this.x;
      this.x = x;
      this.y = y;
  }

  public getAngle = (): number => {
      return Math.atan2(this.x, this.y);
  }

  public multiply = (value: number): void => {
      this.x *= value;
      this.y *= value;
  }

  public add = (value: cVector): void => {
      this.x += value.x;
      this.y += value.y;
  }

  public subtract = (value: cVector): void => {
      this.x -= value.x;
      this.y -= value.y;
  }

  public dot = (vec: cVector): number => {
      return this.x * vec.x + this.y * vec.y;
  }

  public project = (onto: cVector): cVector => {
      var proj: cVector = new cVector(this.x, this.y);
      var d: number = onto.dot(onto);

      if (d != 0) {
          var mult: cVector = new cVector(onto.x, onto.y);
          mult.multiply(proj.dot(onto) / d);
          return mult;
      }
      return onto;
  }

}


// class Collision {
//     public static CircleCircle(a: cCircleCollider, b: cCircleCollider): boolean {
//        var temp_vector: cVector = a.position.duplicate();
//        _tempVector.subtract(b.position);
 
//        if (_tempVector.magSq() <= (a.radius + b.radius) * (a.radius + b.radius)) {
//           return true;
//        }
//        return false;
//     }
//  }

class cCircleCollider implements iCollider {
  public position: cVector = new cVector();
  public radius: number = 1;
  public colliderType: COLLIDER = COLLIDER.CIRCLE;
  public collisionTest(obj: iCollider): boolean {
    // if (obj.colliderType === CIRCLE){
    //     return Collision.CircleCircle(<cCircleCollider>obj, this);
    // }
    return false
  }

}

//modulize

class Collision {
    public static CircleCircle (a: cCircleCollider, b: cPlayer): boolean {
        let tempVector: cVector = new cVector();
        tempVector.copy(a.position);
        tempVector.subtract(b.position);
        if (tempVector.magSq() <= Math.pow(a.radius + b.radius, 2)) {
            return true;
        }
        return false;
    }
}

