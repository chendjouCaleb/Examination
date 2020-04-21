import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule, Preference} from 'src/infrastructure/public_api';
import {MsfButtonModule} from 'fabric-docs';
import {ToastTestComponent} from './toast-test/toast.test.component';
import {MsToastModule} from './toast/toast.module';
import {AuthorizationModule} from './authorization/authorization.module';
import {HttpClientModule} from '@angular/common/http';
import {AppHttpClientModule} from "../models";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CurrentItems} from "./current-items";

@NgModule({
  declarations: [
    AppComponent, ToastTestComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, AuthorizationModule,  MsfButtonModule, LayoutModule, MsToastModule,
    AppHttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [Preference, CurrentItems],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(preference: Preference) {
    preference.set('themeMode', 'dark');
  }
}
