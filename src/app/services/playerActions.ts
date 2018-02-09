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
  public eArray: Array<cPlayer> = [];
  public enemyCount: number = 0;
  public pArray: Array<cPlayer> = [];

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

  newPlayer = (x, y, color, hp, enemy) => {
    this.grid.toggleSpace(Math.floor(x / 100), Math.floor(y / 100));
    let player = new cPlayer(x, y, 50, color, 2, this.grid.ctx, hp, this.enemyCount);
    if (enemy){ 
      this.enemyCount++;
      this.eArray.push(player);
    } else {
      this.pArray.push(player);
    }
    return player;
  }

  move = (direction, player) => {
    let idxY = Math.floor(player.y / 100);
    let idxX = Math.floor(player.x / 100);
    let lowerCase = direction === direction.toLowerCase();
    direction = direction.toLowerCase();
    this.grid.toggleSpace(idxX, idxY);
    if (direction === 'w' || direction === 'ArrowUp') {
      if (this.grid.matrix[idxY - 1] && this.grid.matrix[idxY - 1][idxX] === 1 && lowerCase){
          player.y -= 100
        }
        player.direction = 'up';

    } else if (direction === 'd' || direction === 'ArrowRight') {
      if (this.grid.matrix[idxY][idxX + 1] === 1&& lowerCase){
          player.x += 100
      }
      player.direction = 'right';

    } else if (direction === 's' || direction === 'ArrowDown') {
      if (this.grid.matrix[idxY + 1] && this.grid.matrix[idxY + 1][idxX] === 1 && lowerCase){
          player.y += 100
      }
      player.direction = 'down';

    } else if (direction === 'a' || direction === 'ArrowLeft') {
      if (this.grid.matrix[idxY][idxX - 1] === 1 && lowerCase) {
          player.x -= 100
      }
      player.direction = 'left';
    }
    this.grid.toggleSpace(Math.floor(player.x / 100), Math.floor(player.y / 100))
  }

  attack = (player, enemy: boolean) => {
    console.log(this.eArray, this.enemyCount)
      player.active = true;
      let atk;
      if (player.direction === 'down') {
        atk = new cProjectile(player.x, player.y + 100, 5, player.color, 2, this.ctx);
      } else if (player.direction === 'right') {
        atk = new cProjectile(player.x + 100, player.y, 5, player.color, 2, this.ctx);
      } else if (player.direction === 'up') {
        atk = new cProjectile(player.x, player.y - 100, 5, player.color, 2, this.ctx);
      } else if (player.direction === 'left') {
        atk = new cProjectile(player.x - 100, player.y, 5, player.color, 2, this.ctx);
      }
      this.attacks.push(atk);

      if (!enemy){
        this.eArray.forEach((knight)=> {
            console.log(atk.position, knight.position)
            if(atk.x === knight.x && atk.y === knight.y) {
                knight.health -= 1;
                if (knight.health <= 0) {
                  this.death(knight);
                  this.grid.toggleSpace(Math.floor(knight.x / 100), Math.floor(knight.y / 100));
                  delete this.eArray[knight.idx];
                }
            }  
        })
      } 

      setTimeout(() => {
        atk.active = false;
        player.active = false;
      }, 250)
  }

  death = (player) => {

  }

  spawn = (numberOfEnemies: number) => {
    let spawnPointers = [];
    for (let i = 0; i < numberOfEnemies; i++){
      let spawn = Math.floor(Math.random() * 5)
      if (!spawnPointers.includes(spawn)) {
        spawnPointers.push(spawn);
      } else {
        i--;
      }
    }
    spawnPointers.forEach((spawn: number) => {
      this.newPlayer(this.grid.spawnPoints[spawn][0] + 50, this.grid.spawnPoints[spawn][1] + 50, 'green', 1, true);
    })
  }
}

