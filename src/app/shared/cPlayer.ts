import { cVector } from './cVector';

export class cPlayer implements iPlayer {
  public x: number = 0;
  public y: number = 0;
  public radius: number = 10;
  public lineWidth: number = 2;
  public color: string = 'red';
  public position: cVector = new cVector(this.x, this.y);
  ctx: CanvasRenderingContext2D;
  public health: number
  public down: Array<number> = [Math.PI * 0.65, Math.PI * 0.35];
  public right: Array<number> = [Math.PI * 0.15, Math.PI * -0.15];
  public left: Array<number> = [Math.PI * 1.15, Math.PI * 0.85];
  public up: Array<number> = [Math.PI * 1.65, Math.PI * 1.35];
  public direction: string = 'down';
  constructor(
    x: number,
    y: number,
    radius: number,
    color: string = "red",
    line_width: number = 2,
    ctx: any,
    health: number
    // direction: number = 
    
  ) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.ctx = ctx;
    this.lineWidth = line_width;
    this.health = health;
  }

  public draw = (): void => {
    if (this.health > 0) {
      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      this.ctx.stroke();
      this.ctx.beginPath();
      this.ctx.moveTo(this.x, this.y);
      this.ctx.arc(this.x, this.y, this.radius, this[this.direction][0], this[this.direction][1]);
      this.ctx.lineTo(this.x, this.y);
      this.ctx.stroke();
      this.ctx.restore();
    }
  }
}

interface iPlayer {
  draw(): void;
  x: number;
  y: number;
  color: string;
  lineWidth: number;
}