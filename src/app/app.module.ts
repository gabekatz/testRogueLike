import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattlescreenComponent } from './battlescreen/battlescreen.component';

import { AI } from './services/AI';
import { gridActions } from './services/gridActions';
import { playerAction } from './services/playerActions';

@NgModule({
  declarations: [
    AppComponent,
    BattlescreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AI,
    gridActions,
    playerAction
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
