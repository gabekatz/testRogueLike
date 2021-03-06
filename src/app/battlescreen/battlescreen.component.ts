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
  public heart: HTMLImageElement;
  healthArr: Array<HTMLImageElement>;
  public player1: cPlayer;

  constructor(public AI: AI, public grid: gridActions, public playerAction: playerAction) {
  }

  @HostListener('window:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
      event.preventDefault();
    if (!this.player1.moveActive && !this.player1.atkActive){
        let key = event.key;
        if (key === ' ') {
            this.playerAction.attack(this.player1, false);
        }   
        this.playerAction.move(key, this.player1);
    }
  }

  ngOnInit() {
    this.heart = <HTMLImageElement>document.getElementById('heart');
    this.canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext("2d");
    this.grid.defineCtx(this.ctx, this.width, this.height);
    this.playerAction.init();
    this.player1 = this.playerAction.newPlayer(150, 150, "blue",  3, false);
    this.playerAction.newPlayer(this.grid.bottomRnd * 100 + 50, this.height - 50, 'red', 1, true); 
    this.playerAction.newPlayer(this.grid.bottomRnd * 200 + 50, this.height - 50, 'green', 1, true);
    setInterval(() => {
        this.AI.moveKnights(this.playerAction.pArray);
    }, 1000)

    setInterval(() => {
        this.playerAction.spawn(2);
    }, 5000)

    this.loop();
  }
  
  loop = () => {
    requestAnimationFrame(this.loop);
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, 1300, 800);
    this.grid.createGrid();
    this.playerAction.eArray.forEach((enemy) => {
        enemy.draw();
    })
    this.player1.draw()
    this.playerAction.attacks.forEach((atk) => {
        if (atk.active) {
            atk.draw();
        }
    });
    this.renderHearts();
  }

  renderHearts = () => {
      let health = this.playerAction.pArray[0].health
      for (let i = 0; i < health; i++) {
        this.ctx.drawImage(this.heart, 100 * i, 0, 100, 100)
      }
  }

}
