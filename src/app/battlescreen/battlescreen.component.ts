import { Component, OnInit, HostListener } from '@angular/core';
import { cPlayer } from '../shared/cPlayer';
import { cProjectile } from '../shared/cProjectile';

import { AI } from '../services/AI';
import { gridActions } from '../services/gridActions';
import { PlayerAction } from '../services/playerActions';

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
  public enemyCount: number = 0

  constructor(public AI: AI, public grid: gridActions, public playerAction: PlayerAction) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    if (!this.player1.active){
        this.key = event.key;
        console.log(this.key)
        if (this.key === ' ') {
            this.playerAction.attack(this.player1, this.eKnight);
        }
        this.playerAction.move(this.key, this.player1, this.eKnight);
    }
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.grid.defineCtx(this.ctx, this.width, this.height);
    this.playerAction.init();
    this.player1 = new cPlayer(50, 50, 50, "blue", 2, this.ctx, 3);
    this.eKnight[0] = new cPlayer(750,750,50, 'red', 2, this.ctx, 1, this.enemyCount); 
    this.enemyCount++;
    this.eKnight[1] = new cPlayer(750,750,50, 'green', 2, this.ctx, 1, this.enemyCount);
    this.enemyCount++;
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
    this.playerAction.attacks.forEach((atk)=>{
        if (atk.active){
            atk.draw();
        }
    });
    this.grid.createGrid();
  }


}
