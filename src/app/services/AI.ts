import { Injectable } from "@angular/core";
import { cPlayer } from "../shared/cPlayer";


@Injectable()
export class AI {
  constructor() { }

  moveKnights(knights, player) {
    console.log('running')
    knights.forEach((knight) => {
      if (knight.health > 0) {

      let x = knight.x;
      let y = knight.y;
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
          if (flip) {
            knight.x -= 100;
            knight.direction = 'left';
          } else {
            knight.y -= 100;
            knight.direction = 'up';
          }
        } else if (px > x && py < y) {
          //move up or right
          if (flip) {
            knight.x += 100;
            knight.direction = 'right';
          } else {
            knight.y -= 100;
            knight.direction = 'up';
          }
        } else if (px < x && py > y) {
          //move down or left
          if (flip) {
            knight.x -= 100;
            knight.direction  = 'left';
          } else {
            knight.y += 100;
            knight.direction = 'down';
          }
        } else if (px > x && py > y) {
          //move down or right
          if (flip) {
            knight.x += 100;
            knight.direction = 'right';
          } else {
            knight.y += 100;
            knight.direction = 'down';
          }
        } else if (px === x) {
          if (py > y) {
            knight.y += 100;
            knight.direction = 'down';
          } else {
            knight.y -= 100;
            knight.direction = 'up';
          }
        } else if (py === y) {
          if (px > x) {
            knight.x += 100;
            knight.direction = 'right';
          } else {
            knight.x -= 100;
            knight.direction = 'left';
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