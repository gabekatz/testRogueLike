import { Component, OnInit, HostListener } from '@angular/core';
import { cPlayer } from '../shared/cPlayer';
import { cProjectile } from '../shared/cProjectile';

import { AI } from '../services/AI';
import { gridActions } from '../services/gridActions';
import { playerAction } from '../services/playerActions';

@Component({
  selector: 'app-battlescreen',
  templateUrl: './battlescreen.component.html',
  styleUrls: ['./battlescreen.component.css']
})
export class BattlescreenComponent implements OnInit{
  currPos: number = 0;
  size: number = 800;
  height: number = 800;
  width: number = 1300;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  public player1: cPlayer;
  public eKnight: Array<cPlayer> = [];
  public enemyCount: number = 0

  constructor(public AI: AI, public grid: gridActions, public playerAction: playerAction) { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    event.preventDefault();
    if (!this.player1.active){
        let key = event.key;
        console.log(key)
        if (key === ' ') {
            this.playerAction.attack(this.player1, this.eKnight);
        }
        this.playerAction.move(key, this.player1);
    }
  }

  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.grid.defineCtx(this.ctx, this.width, this.height);
    this.playerAction.init();
    this.player1 = this.playerAction.newPlayer(50, 50, "blue",  3);
    this.eKnight[0] = this.playerAction.newPlayer(750,750, 'red',1, this.enemyCount); 
    this.enemyCount++;
    this.eKnight[1] = this.playerAction.newPlayer(850,750, 'green', 1, this.enemyCount);
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
