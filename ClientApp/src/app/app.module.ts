import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule, Preference} from 'src/infrastructure/public_api'
import {MsfButtonModule} from "fabric-docs";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, MsfButtonModule
  ],
  providers: [ Preference ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(preference: Preference) {
    preference.set('themeMode', 'dark')
  }
}
