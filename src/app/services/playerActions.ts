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

  newPlayer = (x, y, color, hp, enemy, speed?:number) => {
    this.grid.toggleSpace(Math.floor(x / 100), Math.floor(y / 100));
    if (!speed) {
      speed = enemy ? 1 : 2
    }
    let player = new cPlayer(x, y, 50, color, 2, this.grid.ctx, hp, this.enemyCount, speed);
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
    let newPos: Array<number> = [player.x, player.y];
    if (direction === 'w' || direction === 'ArrowUp') {
      if (this.grid.matrix[idxY - 1] && this.grid.matrix[idxY - 1][idxX] === 1 && lowerCase){
          // player.y -= 100
          newPos[1] = player.y - 100;
          this.moveCrawl(player, newPos[1], 'up', 'y', newPos);
        }
        player.direction = 'up';

    } else if (direction === 'd' || direction === 'ArrowRight') {
      if (this.grid.matrix[idxY][idxX + 1] === 1&& lowerCase){
          // player.x += 100
          newPos[0] = player.x + 100;
          this.moveCrawl(player, newPos[0], 'right', 'x', newPos);
      }
      player.direction = 'right';

    } else if (direction === 's' || direction === 'ArrowDown') {
      if (this.grid.matrix[idxY + 1] && this.grid.matrix[idxY + 1][idxX] === 1 && lowerCase){
          // player.y += 100
          newPos[1] = player.y + 100;
          this.moveCrawl(player, newPos[1], 'down', 'y', newPos);

      }
      player.direction = 'down';

    } else if (direction === 'a' || direction === 'ArrowLeft') {
      if (this.grid.matrix[idxY][idxX - 1] === 1 && lowerCase) {
          // player.x -= 100
          newPos[0] = player.x - 100;
          this.moveCrawl(player, newPos[0], 'left', 'x', newPos);
      }
      player.direction = 'left';
    }
    player.gridX = Math.floor(newPos[0] / 100);
    player.gridY = Math.floor(newPos[1] / 100);
    this.grid.toggleSpace(player.gridX, player.gridY);
  }

  attack = (player, enemy: boolean) => {
      player.atkActive = true;
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
            console.log('attack vector:', atk.x, atk.y, 'knight vector:', knight.x, knight.y)
            if(Math.abs(atk.x - knight.x) < knight.radius && Math.abs(atk.y - knight.y) < knight.radius) {
                knight.health -= 1;
                if (knight.health <= 0) {
                  this.death(knight);
                  // this.grid.toggleSpace(Math.floor(knight.x / 100), Math.floor(knight.y / 100));
                  // this.grid.toggleSpace(Math.floor(atk.x / 100), Math.floor(atk.y / 100));
                  // delete this.eArray[knight.idx];
                }
            }  
        })
      } 

      setTimeout(() => {
        atk.active = false;
        player.atkActive = false;
      }, 250)
  }

  death = (player) => {
    this.grid.matrix[player.gridY][player.gridX] = 1;
    delete this.eArray[player.idx];
  }

  moveCrawl = (player:cPlayer, endPos:number, dir:string, axis:string, position:Array<number>) => {
    player.moveActive = true;
    const crawl = setInterval(() => {
      if (dir === 'down'){
        player.y += 1
      } else if (dir === 'up') {
        player.y -= 1
      } else if (dir === 'left') {
        player.x -= 1;
      } else if (dir === 'right') {
        player.x += 1
      }
      this.attacks.forEach((atk) => {
        if (atk.active) {
          if (Math.abs(player.x - atk.x) <= player.radius && Math.abs(player.y - atk.y) <= player.radius){
            atk.active = false;
            player.health -= 1;
            if (player.health <= 0) {
              // this.grid.toggleSpace(Math.floor(position[0] / 100), Math.floor(position[1] / 100));
              // delete this.eArray[player.idx];
              this.death(player);
            }
          }
        }
      })

      if (player[axis]  === endPos) {
        clearInterval(crawl)
        player.moveActive = false;
      }
    }, 9/ player.speed);
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

