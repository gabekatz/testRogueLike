import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-battlescreen',
  templateUrl: './battlescreen.component.html',
  styleUrls: ['./battlescreen.component.css']
})
export class BattlescreenComponent implements OnInit {
  currPos: number = 0;
  player: HTMLElement;
  key: any;
  size: number = 8;
  facing: string = 'down';

  constructor() { }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(this.key)
    this.move(this.key)
  }

  ngOnInit() {
    this.createGrid(this.size);
    let contCheck = document.getElementById('container');
    console.log(contCheck)
    this.player = document.getElementById(JSON.stringify(this.currPos))
    this.player.style.backgroundColor = 'black';
  }
  
    createGrid = (x) => {
      let container = document.getElementById('container');
      let grid = document.createElement('div')
      let count = 0
      grid.style.width = JSON.stringify(960/x) + 'px'
      grid.style.height = JSON.stringify(960/x) + 'px'
      // grid.style.outline = '1px solid black';
      grid.className += 'grid';
      for (var rows = 0; rows < x; rows++) {
          for (var columns = 0; columns < x; columns++) {
              // $("#container").append("<div class='grid'></div>");
              grid.id = JSON.stringify(count);
              count++;
              let newBlock = grid.cloneNode();

              container.appendChild(newBlock);

          };
      };
      // document.getElementsByClassName('grid').style.width('width', JSON.stringify(960/x));
      // // $(".grid").height(960/x);
      // document.getElementById('grid')..setAttribute('height', JSON.stringify(960/x));
  };

  move = (direction) => {
    let currPos = document.getElementById('selected');
    this.player.style.backgroundColor = '';
    if (direction === 'w') {
      if (!(this.currPos - this.size < 0)){
        this.currPos -= this.size;
      }
    } else if (direction === 'd') {
      if ((this.currPos + 1) % this.size !== 0){
        this.currPos += 1;
      }
    } else if (direction === 's') {
      if (!(this.currPos + this.size >= this.size**2)){
        this.currPos += this.size;
      }
    } else if (direction === 'a') {
      if (this.currPos % this.size !== 0){
        this.currPos -= 1;
      }
    }
    console.log('new position', this.currPos)
  this.player = document.getElementById(JSON.stringify(this.currPos))
  this.player.style.backgroundColor = 'black'
  }
}
