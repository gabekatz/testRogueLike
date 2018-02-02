import { gridActions } from './gridActions';
import { cProjectile } from '../shared/cProjectile';
import { Injectable } from '@angular/core';

@Injectable()
export class PlayerAction  {
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

  move = (direction, player, enemies) => {
    console.log('trying to move', player)
    let tempX = player.x;
    let tempY = player.y;
    if (direction === 'w') {
      if (player.y - 100 >= 0){
          player.y -= 100
        }
        player.direction = 'up';
    } else if (direction === 'd') {
      if (player.x + 100 <= this.width){
          player.x += 100
      }
      player.direction = 'right';
      console.log(player)
      //player.position.rotate(Math.PI*0,3)
    } else if (direction === 's') {
      if (player.y + 100 <= this.height){
          player.y += 100
      }
      player.direction = 'down';
    } else if (direction === 'a') {
      if (player.x - 100 >= 0) {
          player.x -= 100
      }
      player.direction = 'left';
    }

    enemies.forEach((knight) => {
        console.log(knight)
        if (knight.health > 0 && knight.x === player.x && knight.y === player.y) {
            player.x = tempX;
            player.y = tempY;
        }
    })
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
