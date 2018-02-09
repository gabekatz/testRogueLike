// import { grid } from '../shared/grid'
import { Injectable } from '@angular/core';


@Injectable()
export class gridActions{
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;
  public matrix: Array<Array<number>> = [];
  public borders: Array<Object> = [];
  public topRnd: number;
  public leftRnd: number; 
  public rightRnd: number;
  public bottomRnd: number;
  public spawnPoints: Array<Array<number>> = [];
  public waterSquares: Array<Array<number>> = [];
  constructor(
  ){


  };
  
  defineCtx = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    this.ctx = ctx;
    this.width = width;
    this.height = height;    
    let colLength = Math.floor(this.width / 100);
    let rowLength = Math.floor(this.height / 100);
    for (let i = 0; i < rowLength; i++) {
      if (i === 0 || i === this.height / 100 - 1) {
        this.matrix.push(new Array(colLength).fill(2));
      } else{
        this.matrix.push(new Array(colLength).fill(1));
        this.matrix[i][0] = 2;
        this.matrix[i][colLength - 1] = 2;
      }
    }
    this.topRnd =  Math.floor(Math.random() * (colLength - 6)) + 3;
    this.bottomRnd = Math.floor(Math.random() * (Math.floor(colLength / 2) - 2)) + 1;
    this.rightRnd =  Math.floor(Math.random() * (rowLength - 4)) + 3;
    this.leftRnd = Math.floor(Math.random() * (rowLength - 4)) + 3;

    this.toggleSpace(this.topRnd, 0);
    this.toggleSpace(this.bottomRnd, rowLength - 1);
    this.toggleSpace(this.bottomRnd * 2, rowLength - 1);
    this.toggleSpace(0, this.leftRnd);
    this.toggleSpace(colLength - 1, this.rightRnd);
    this.spawnPoints.push([this.topRnd * 100, 0], 
      [this.bottomRnd * 200, this.height - 100], 
      [this.bottomRnd * 100, this.height - 100], 
      [0, this.leftRnd * 100], 
      [this.width - 100, this.rightRnd * 100]);
    this.defineWaterSquare();
  };

  createGrid = () => {
    this.borderSquares();
    this.drawWater();
    this.ctx.strokeStyle = 'white';
    for (let i = 0; i <= this.width * 10; i += 100) {
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

  toggleSpace = (x, y) => {
    let space = this.matrix[y][x];
    this.matrix[y][x] = space === 1 ? 0 : 1
  };
  
  borderSquares = () => {
    this.ctx.fillStyle = 'gray';
    this.ctx.fillRect(0, 0, 300, 100);
    this.ctx.fillRect(0, 0, 100, 300);
    this.ctx.fillRect(this.width - 100, 0, 100, 300);
    this.ctx.fillRect(this.width, 0, -300, 100);
    this.ctx.fillRect(0, this.height - 100, 100, 100);
    this.ctx.fillRect(this.width - 100, this.height - 100, 100, 100);

    for (let i = 1; i < this.width / 100; i++) {
      if (i !== this.topRnd) {
        this.ctx.fillRect(i * 100, 0, 100, 100);
      }
      if (i !== this.bottomRnd && i !== this.bottomRnd * 2) {
        this.ctx.fillRect(i * 100, this.height - 100, 100, 100);
      }
    }

    for (let i = 3; i < this.height / 100 - 1; i++) {
      if (i !== this.leftRnd) {
        this.ctx.fillRect(0, i * 100, 100, 100);
      }
      if (i !== this.rightRnd) {
        this.ctx.fillRect(this.width - 100, i * 100, 100, 100);
      }
    }

  };

  defineWaterSquare = () => {
    for (let row = 1; row < this.height / 100; row++) {
      for (let col = 1; col < this.width / 100; col++) {
        if (this.matrix[row - 1][col] === 1 && this.matrix[row - 1][col - 1] === 1 && this.matrix[row][col - 1] === 1) {
          if (Math.floor(Math.random() * 2)) {
            this.matrix[row][col] = 2;
            this.waterSquares.push([col, row]);
          }
        }
      }
    }
  };

  drawWater = () => {
    this.ctx.fillStyle = 'blue';
    this.waterSquares.forEach((block) => {
      this.ctx.fillRect(block[0] * 100, block[1] * 100, 100, 100)
    });
  }
}