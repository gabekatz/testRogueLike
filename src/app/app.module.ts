import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BattlescreenComponent } from './battlescreen/battlescreen.component';

import { AI } from './services/AI';

@NgModule({
  declarations: [
    AppComponent,
    BattlescreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    AI
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
