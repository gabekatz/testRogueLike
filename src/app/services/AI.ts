import { Injectable } from "@angular/core";
import { cPlayer } from "../shared/cPlayer";
import { playerAction } from "./playerActions";
import { gridActions } from './gridActions';

@Injectable()
export class AI {
  public path: Array<Array<string>>
  constructor(
    public playerAction: playerAction,
    public grid: gridActions 
  ) { 

  }

  moveKnights(players) {
    let matrix = this.grid.matrix;
    this.smartPath(players);
    let player = players[0]
    this.playerAction.eArray.forEach((knight) => {
      if (knight.health > 0) {
      let x = knight.x;
      let y = knight.y;
      let col = Math.floor(x / 100);
      let row = Math.floor(y / 100);
      let px = player.x;
      let py = player.y;
      let distX = Math.abs(px - x);
      let distY = Math.abs(py - y);
      console.log(px, py, x, y)
      // let flip = Math.floor(Math.random() * 2);
      if ((distX <= 100 && distY === 0) || (distX === 0 && distY <=  100)) {
        console.log('should attack')
        if (px - x > 0){
          knight.direction = 'right';
        } else if (px - x < 0){
          knight.direction = 'left';
        } else if (py - y > 0) {
          knight.direction = 'down';
        } else {
          knight.direction = 'up';
        }
        this.playerAction.attack(knight, true);
        this.attack(knight, player);
      } 
      //else {
      //   if (px < x && py < y) {
      //     //move up or left
      //     if (flip && matrix[row][col - 1]) {
      //       this.playerAction.move('a', knight);
      //     } else if (matrix[row - 1][col]){
      //       this.playerAction.move('w', knight);
      //     }
      //   } else if (px > x && py < y) {
      //     //move up or right
      //     if (flip && matrix[row][col + 1]) {
      //       this.playerAction.move('d', knight);
      //     } else if (matrix[row - 1][col]){
      //       this.playerAction.move('w', knight);
      //     }
      //   } else if (px < x && py > y) {
      //     //move down or left
      //     if (flip && matrix[row][col - 1]) {
      //       this.playerAction.move('a', knight);
      //     } else if (matrix[row + 1][col]){
      //       this.playerAction.move('s', knight);
      //     }
      //   } else if (px > x && py > y) {
      //     //move down or right
      //     if (flip && matrix[row][col + 1]) {
      //       this.playerAction.move('d', knight);
      //     } else if (matrix[row + 1][col]){
      //       this.playerAction.move('s', knight);
      //     }
      //   } else if (px === x) {
      //     if (py > y && matrix[row + 1][col]) {
      //       this.playerAction.move('s', knight);
      //     } else if (matrix[row - 1][col]){
      //       this.playerAction.move('w', knight);
      //     }
      //   } else if (py === y) {
      //     if (px > x && matrix[row][col + 1]) {
      //       this.playerAction.move('d', knight);
      //     } else if (matrix[row][col - 1]){
      //       this.playerAction.move('a', knight);
      //     }
        // }
      // }
      let currentPath: string = this.path[row][col];
      currentPath = currentPath.slice(1, currentPath.length - 1);
      let choice: string = currentPath[Math.floor(Math.random() * currentPath.length)]
      this.playerAction.move(choice, knight)
    }
    })
  }

  attack(enemy, player) {
    console.log('hit')
    player.health -= 1
  }

  smartPath(pArray: Array<cPlayer>) {
    let moveMap: Array<Array<string>>= this.grid.matrix.map((row)=> {return row.map((num) => {return String(num)})});
    let q = pArray.map((player) => [Math.floor(player.x / 100), Math.floor(player.y / 100), 0]);
    let unlocked: Array<Array<number>> = [];

    const lock = () => {
      while (unlocked.length > 0){
        let loc = unlocked.shift();
        if (!locked(moveMap[loc[1]][loc[0]])){
          moveMap[loc[1]][loc[0]] += '*'
        }
      }
    }

    const locked  = (point) => {
      return point[point.length - 1] === '*';
    }

    let prevDepth = 0;
    while (q.length !== 0) {
      let current: Array<number> = q.shift();
      if (prevDepth <  current[2]) {
        prevDepth++
        lock();
      }
      let x: number = current[0];
      let y: number = current[1];
      let right: string = moveMap[y][x + 1];
      let left: string = moveMap[y][x - 1];
      let up: string = moveMap[y - 1] ? moveMap[y - 1][x] : undefined;
      let down: string = moveMap[y + 1] ? moveMap[y + 1][x] : undefined;

      if (right && right[0] !== '2' && !locked(moveMap[y][x + 1]) && !right.includes('a')) {
        moveMap[y][x + 1] += 'a';
        q.push([x + 1, y, current[2] + 1]);
        unlocked.push([x + 1, y]);
      } 
      if (left && left[0] !== '2' && !locked(moveMap[y][x - 1]) && !left.includes('d')) {
        moveMap[y][x - 1] += 'd';
        q.push([x - 1, y, current[2] + 1]);
        unlocked.push([x - 1, y]);
      } 
      if (up && up[0] !== '2' && !locked(moveMap[y - 1][x]) && !up.includes('s')) {
        moveMap[y - 1][x] += 's';
        q.push([x, y - 1, current[2] + 1]);
        unlocked.push([x, y - 1]);
      } 
      if (down && down[0] !== '2' && !locked(moveMap[y + 1][x]) && !down.includes('w')) {
        moveMap[y + 1][x] += 'w';
        q.push([x, y + 1, current[2] + 1]);
        unlocked.push([x, y + 1]);
      }
    }
    this.path = moveMap

  }

}

