import { gridActions } from './gridActions';
import { cProjectile } from '../shared/cProjectile';
import { Injectable } from '@angular/core';
import { cPlayer } from '../shared/cPlayer';

@Injectable()
export class playerAction  {
  public width: number;
  public height: number;
  public attacks: Array<cProjectile> = [];
  public ctx: CanvasRenderingContext2D;

  constructor(
    public grid: gridActions,
  ) {
    console.log(this.grid)
    this.width = grid.width;
    this.height = grid.height;
    this.ctx = grid.ctx;
  }

  init = () => {
    this.ctx = this.grid.ctx;
    this.width = this.grid.width;
    this.height = this.grid.height;
  }
//new cPlayer(50, 50, 50, "blue", 2, this.ctx, 3);
  newPlayer = (x, y, color, hp, characterIdx?) => {
    this.grid.toggleSpace(Math.floor(x / 100), Math.floor(y / 100))
    return new cPlayer(x, y, 50, color, 2, this.grid.ctx, hp, characterIdx)
  }

  move = (direction, player) => {
    console.log('trying to move', player)
    // let tempX = player.x;
    // let tempY = player.y;
    let idxY = Math.floor(player.y / 100)
    let idxX = Math.floor(player.x / 100)
    console.log(this.grid.matrix, idxX, idxY)
    this.grid.toggleSpace(idxX, idxY)
    if (direction === 'w') {
      if (this.grid.matrix[idxY - 1] && this.grid.matrix[idxY - 1][idxX]){
          player.y -= 100
        }
        player.direction = 'up';

    } else if (direction === 'd') {
      if (this.grid.matrix[idxY][idxX + 1]){
          player.x += 100
      }
      player.direction = 'right';
      console.log(player)
      //player.position.rotate(Math.PI*0,3)
    } else if (direction === 's') {

      if (this.grid.matrix[idxY + 1] && this.grid.matrix[idxY + 1][idxX]){
          player.y += 100
      }
      player.direction = 'down';
    } else if (direction === 'a') {
      if (this.grid.matrix[idxY][idxX - 1]) { //needs to be idx +1
          player.x -= 100
      }
      player.direction = 'left';
    }
    this.grid.toggleSpace(Math.floor(player.x / 100), Math.floor(player.y / 100))
    
    // enemies.forEach((knight) => {
    //     console.log(knight)
    //     if (knight.health > 0 && knight.x === player.x && knight.y === player.y) {
    //         player.x = tempX;
    //         player.y = tempY;
    //     }
    // })
  // this.player = document.getElementById(JSON.stringify(this.currPos))
  // this.player.style.backgroundColor = 'black'
  }

  attack = (player, enemies) => {
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

      enemies.forEach((knight)=> {
          console.log(atk.position, knight.position)
          if(atk.x === knight.x && atk.y === knight.y) {
              knight.health -= 1
              if (knight.health <= 0) {
                  console.log(knight.idx);
                  delete enemies[knight.idx]
              }
          }
          
      })

      setTimeout(() => {
        atk.active = false;
        player.active = false;
      }, 250)
  }
}

