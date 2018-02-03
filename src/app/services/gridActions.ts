// import { grid } from '../shared/grid'
import { Injectable } from '@angular/core';


@Injectable()
export class gridActions{
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;
  public matrix: Array<Array<number>> = [];

  constructor(
  ){

  }
  
  defineCtx = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    this.ctx = ctx;
    this.width = width;
    this.height = height;    
    let colLength = Math.floor(this.width / 100);
    let rowLength = Math.floor(this.height / 100);
    for (let i = 0; i < rowLength; i++) {
      this.matrix.push(new Array(colLength).fill(1))
    }
  }

  createGrid = () => {
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
  }

  // unOccupySpace = (x, y) => {
  //   this.matrix[Math.floor(y/100)][Math.floor(x/100)] = 1;
  //   console.log(this.matrix);
  // }
  
}