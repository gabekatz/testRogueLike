import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattlescreenComponent } from './battlescreen/battlescreen.component';

import { AI } from './services/AI';
import { gridActions } from './services/gridActions';
import { PlayerAction } from './services/playerActions';

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
    PlayerAction
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
