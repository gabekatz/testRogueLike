// import { grid } from '../shared/grid'
import { Injectable } from '@angular/core';


@Injectable()
export class gridActions{
  public width: number;
  public height: number;
  public ctx: CanvasRenderingContext2D;

  constructor(
  ){

  }
  
  defineCtx = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }

  createGrid = () => {
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

  
}