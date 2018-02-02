import { cVector } from "./cVector";
import { iShape } from './iShape'

export class cProjectile implements iShape {
  public active: boolean = true;
  public x: number;
  public y: number;
  public position: cVector = new cVector(this.x, this.y)
  public lineWidth: number = 5
  public radius: number = 2;
  public size: number = 0;
  public color: string = 'blue';
  public ctx: CanvasRenderingContext2D;

  constructor(
    x: number,
    y: number,
    radius: number,
    color: string = 'blue',
    lineWidth: number = 2,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;

  }

  public draw = (): void => {
    console.log('drawing..')
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.stroke();
      this.ctx.restore();
  }
}