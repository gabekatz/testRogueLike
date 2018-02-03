import { Injectable } from "@angular/core";
import { cPlayer } from "../shared/cPlayer";
import { playerAction } from "./playerActions";
import { gridActions } from './gridActions';

@Injectable()
export class AI {
  constructor(
    public playerAction: playerAction,
    public grid: gridActions 
  ) { 

  }

  moveKnights(knights, player) {
    let matrix = this.grid.matrix;
    knights.forEach((knight) => {
      if (knight.health > 0) {
      let x = knight.x;
      let y = knight.y;
      let col = Math.floor(x / 100);
      let row = Math.floor(y / 100);
      let px = player.x;
      let py = player.y;
      let distX = Math.abs(px - x);
      let distY = Math.abs(py - y);
      let flip = Math.floor(Math.random() * 2);
      if ((distX === 100 && distY === 0) || (distX === 0 && distY === 100)) {
        this.attack(knight, player);
      } else {
        if (px < x && py < y) {
          //move up or left
          if (flip && matrix[row][col - 1]) {
            this.playerAction.move('a', knight);
            // knight.x -= 100;
            // knight.direction = 'left';
          } else if (matrix[row - 1][col]){
            // knight.y -= 100;
            // knight.direction = 'up';
            this.playerAction.move('w', knight);
          }
        } else if (px > x && py < y) {
          //move up or right
          if (flip && matrix[row][col + 1]) {
            // knight.x += 100;
            // knight.direction = 'right';
            this.playerAction.move('d', knight);
          } else if (matrix[row - 1][col]){
            // knight.y -= 100;
            // knight.direction = 'up';
            this.playerAction.move('w', knight);
          }
        } else if (px < x && py > y) {
          //move down or left
          if (flip && matrix[row][col - 1]) {
            // knight.x -= 100;
            // knight.direction  = 'left';
            this.playerAction.move('a', knight);
          } else if (matrix[row + 1][col]){
            // knight.y += 100;
            // knight.direction = 'down';
            this.playerAction.move('s', knight);
          }
        } else if (px > x && py > y) {
          //move down or right
          if (flip && matrix[row][col + 1]) {
            // knight.x += 100;
            // knight.direction = 'right';
            this.playerAction.move('d', knight);
          } else if (matrix[row + 1][col]){
            // knight.y += 100;
            // knight.direction = 'down';
            this.playerAction.move('s', knight);
          }
        } else if (px === x) {
          if (py > y && matrix[row + 1][col]) {
            // knight.y += 100;
            // knight.direction = 'down';
            this.playerAction.move('s', knight);
          } else if (matrix[row - 1][col]){
            // knight.y -= 100;
            // knight.direction = 'up';
            this.playerAction.move('w', knight);
          }
        } else if (py === y) {
          if (px > x && matrix[row][col + 1]) {
            // knight.x += 100;
            // knight.direction = 'right';
            this.playerAction.move('d', knight);
          } else if (matrix[row][col - 1]){
            // knight.x -= 100;
            // knight.direction = 'left';
            this.playerAction.move('a', knight);
          }
        }
      }
    }
    })
  }

  attack(enemy, player) {
    console.log('hit')
    player.health -= 1
  }

}