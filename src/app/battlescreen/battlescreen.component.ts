import { Component, OnInit, HostListener } from '@angular/core';
import { cPlayer } from '../shared/cPlayer';
import { cProjectile } from '../shared/cProjectile';
import { AI } from '../services/AI';
// import { setInterval } from 'timers';

@Component({
  selector: 'app-battlescreen',
  templateUrl: './battlescreen.component.html',
  styleUrls: ['./battlescreen.component.css']
})
export class BattlescreenComponent implements OnInit{
  currPos: number = 0;
  player: HTMLElement;
  key: any;
  size: number = 800;
  height: number = 800;
  width: number = 1300;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  public player1: cPlayer;
  public eKnight: Array<cPlayer> = [];
  public attacks: Array<cProjectile> = [];

  constructor(public AI: AI) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    if (!this.player1.active){
        this.key = event.key;
        console.log(this.key)
        if (this.key === ' ') {
            this.attack(this.player1);
        }
        this.move(this.key, this.player1)
    }
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.player1 = new cPlayer(50, 50, 50, "blue", 2, this.ctx, 3);
    this.eKnight[0] = new cPlayer(750,750,50, 'red', 2, this.ctx, 1, this.eKnight.length); 
    this.eKnight[1] = new cPlayer(750,750,50, 'green', 2, this.ctx, 1, this.eKnight.length);
    setInterval(() => {
        this.AI.moveKnights(this.eKnight, this.player1);
    }, 1000)
    this.loop();
  }
  
  loop = () => {
    requestAnimationFrame(this.loop);
    // this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, 1300, 800);
    this.eKnight.forEach((knight) => {
        knight.draw();
    })
    this.player1.draw()
    this.attacks.forEach((atk)=>{
        if (atk.active){
            atk.draw();
        }
    });
    this.createGrid(this.size);
  }


  createGrid = (x) => {
    this.ctx.strokeStyle = 'white';
    for (var i = 0; i <= this.width * 10; i += 100) {
        this.ctx.beginPath();
        this.ctx.moveTo(i, 0);
        this.ctx.lineTo(i, this.width)
        this.ctx.stroke();
    } 
    for (var j = 0; j <= this.height * 10; j += 100 ) {
        this.ctx.beginPath();
        this.ctx.moveTo(0, j);
        this.ctx.lineTo(this.width,j);
        this.ctx.stroke();
    }
  };

  move = (direction, player) => {
    let tempX = player.x;
    let tempY = player.y;
    if (direction === 'w') {
      if (player.y - 100 >= 0){
          player.y -= 100
        }
        player.direction = 'up';
    } else if (direction === 'd') {
      if (player.x + 100 <= this.width){
          player.x += 100
      }
      player.direction = 'right';
      console.log(player)
      //player.position.rotate(Math.PI*0,3)
    } else if (direction === 's') {
      if (player.y + 100 <= this.height){
          player.y += 100
      }
      player.direction = 'down';
    } else if (direction === 'a') {
      if (player.x - 100 >= 0) {
          player.x -= 100
      }
      player.direction = 'left';
    }

    this.eKnight.forEach((knight) => {
        console.log(knight)
        if (knight.health > 0 && knight.x === player.x && knight.y === player.y) {
            player.x = tempX;
            player.y = tempY;
        }
    })
  // this.player = document.getElementById(JSON.stringify(this.currPos))
  // this.player.style.backgroundColor = 'black'
  }

  attack = (player) => {
      player.active = true;
      let atk;
      if (player.direction === 'down') {
        atk = new cProjectile(player.x, player.y + 100, 5, 'blue', 2, this.ctx);
      } else if (player.direction === 'right') {
        atk = new cProjectile(player.x + 100, player.y, 5, 'blue', 2, this.ctx);
      } else if (player.direction === 'up') {
        atk = new cProjectile(player.x, player.y - 100, 5, 'blue', 2, this.ctx);
      } else if (player.direction === 'left') {
        atk = new cProjectile(player.x - 100, player.y, 5, 'blue', 2, this.ctx);
      }
      this.attacks.push(atk);

      this.eKnight.forEach((knight)=> {
          console.log(atk.position, knight.position)
          if(atk.x === knight.x && atk.y === knight.y) {
              knight.health -= 1
              if (knight.health <= 0) {
                  console.log(knight.idx);
                  delete this.eKnight[knight.idx]
              }
          }
          
      })

      setTimeout(() => {
        atk.active = false;
        player.active = false;
      }, 250)
  }


}

//make modular------
// class AI {
//     public knights: Array<cPlayer>;
//     public py: number;
//     public px: number;
//     constructor(knights, player) {
//         this.py = player.y;
//         this.px = player.x
//         this.knights = knights;
//     }

//     moveKnights() {
//         this.knights.forEach((knight) => {
//             let x  = knight.x;
//             let y = knight.y;
//             let px = this.px;
//             let py = this.py;
//             let flip = Math.floor(Math.random()*2);
//             if (px < x && py < y) {
//                 //move up or left
//                 if (flip) {
//                     knight.x -= 100;
//                 } else {
//                     knight.y -= 100;
//                 }
//             } else if (px > x && py < x) {
//                 //move up or right
//                 if (flip) {
//                     knight.x += 100;
//                 } else {
//                     knight.y -= 100;
//                 }
//             } else if (px < x && py > x) {
//                 //move down or left
//                 if (flip) {
//                     knight.x -= 100;
//                 } else {
//                     knight.y += 100;
//                 }
//             } else if (px > x && py > y) {
//                 //move down or right
//                 if (flip) {
//                     knight.x += 100;
//                 } else {
//                     knight.y += 100;
//                 }
//             } else if (px === x) {
//                 if (py > y) {
//                     knight.y += 100;
//                 } else {
//                     knight.y -= 100;
//                 }
//             } else if (py === y) {
//                 if (px > x) {
//                     knight.x += 100;
//                 } else {
//                     knight.x -= 100;
//                 }
//             }
//             knight.draw();
//         })
//     }
// }

//make modular------


//make modular ---

// class eKnight implements iPlayer {
//     public x: number = 0;
//     p
// }

//make modular ----

// class cPlayer implements iPlayer {
//   public x: number = 0;
//   public y: number = 0;
//   public radius: number = 10;
//   public lineWidth: number = 2;
//   public color: string = 'red';
//   public position: cVector = new cVector(this.x, this.y);
//   ctx: CanvasRenderingContext2D;

//   constructor(
//     x: number, 
//     y: number, 
//     radius: number, 
//     color: string = "red", 
//     line_width: number = 2,
//     ctx: any
//   )
//   {
//      this.x = x;
//      this.y = y;
//      this.radius = radius;
//      this.color = color;
//      this.ctx = ctx;
//      this.lineWidth = line_width;
//   }

//   public draw = (): void =>{
//     this.ctx.save();
//     this.ctx.beginPath();
//     this.ctx.strokeStyle = this.color;
//     this.ctx.lineWidth = this.lineWidth;
//     this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
//     this.ctx.stroke();
//     this.ctx.restore();
//   }
// }

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
// interface iCollider {
//   collisionTest(obj: iCollider): boolean;
//   colliderType: COLLIDER;
//   position: cVector;
// }


//modulize
// class cVector {
//   public x: number = 0;
//   public y: number = 0;

//   constructor(x: number = 0, y: number = 0) {
//       this.x = x;
//       this.y = y;
//   }

//   public magnitude = (): number => {
//       return Math.sqrt(this.x * this.x + this.y * this.y);
//   }

//   public magSq = (): number => {
//       return this.x * this.x + this.y * this.y;
//   }

//   public normalize = (magnitude: number = 1): cVector => {
//       var len: number = Math.sqrt(this.x * this.x + this.y * this.y);
//       this.x /= len;
//       this.y /= len;
//       return this;
//   }

//   public zero = (): void => {
//       this.x = 0;
//       this.y = 0;
//   }

//   public copy = (point: cVector): void => {
//       this.x = point.x;
//       this.y = point.y;
//   }

//   public duplicate = (): cVector => {
//       var dup: cVector = new cVector(this.x, this.y);
//       return dup;
//   }

//   public rotate = (radians: number): void => {
//       var cos: number = Math.cos(radians);
//       var sin: number = Math.sin(radians);
//       var x: number = (cos * this.x) + (sin * this.y);
//       var y: number = (cos * this.y) - (sin * this.x);
//       this.x = x;
//       this.y = y;
//   }

//   public rotate90 = (): void => {
//       var x: number = -this.y;
//       var y: number = this.x;
//       this.x = x;
//       this.y = y;
//   }

//   public getAngle = (): number => {
//       return Math.atan2(this.x, this.y);
//   }

//   public multiply = (value: number): void => {
//       this.x *= value;
//       this.y *= value;
//   }

//   public add = (value: cVector): void => {
//       this.x += value.x;
//       this.y += value.y;
//   }

//   public subtract = (value: cVector): void => {
//       this.x -= value.x;
//       this.y -= value.y;
//   }

//   public dot = (vec: cVector): number => {
//       return this.x * vec.x + this.y * vec.y;
//   }

//   public project = (onto: cVector): cVector => {
//       var proj: cVector = new cVector(this.x, this.y);
//       var d: number = onto.dot(onto);

//       if (d != 0) {
//           var mult: cVector = new cVector(onto.x, onto.y);
//           mult.multiply(proj.dot(onto) / d);
//           return mult;
//       }
//       return onto;
//   }

// }


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

// class cCircleCollider implements iCollider {
//   public position: cVector = new cVector();
//   public radius: number = 1;
//   public colliderType: COLLIDER = COLLIDER.CIRCLE;
//   public collisionTest(obj: iCollider): boolean {
//     // if (obj.colliderType === CIRCLE){
//     //     return Collision.CircleCircle(<cCircleCollider>obj, this);
//     // }
//     return false
//   }

// }

// //modulize

// class Collision {
//     public static CircleCircle (a: cCircleCollider, b: cPlayer): boolean {
//         let tempVector: cVector = new cVector();
//         tempVector.copy(a.position);
//         tempVector.subtract(b.position);
//         if (tempVector.magSq() <= Math.pow(a.radius + b.radius, 2)) {
//             return true;
//         }
//         return false;
//     }
// }

