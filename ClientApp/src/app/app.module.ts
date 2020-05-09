import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule, Preference} from 'examination/infrastructure';
import {MsfButtonModule} from 'fabric-docs';
import {ToastTestComponent} from './toast-test/toast.test.component';
import {MsToastModule} from './toast/toast.module';
import {AuthorizationModule} from 'examination/app/authorization';
import {HttpClientModule} from '@angular/common/http';
import {AppHttpClientModule} from "examination/models";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CurrentItems} from "./current-items";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";
import {registerLocaleData} from "@angular/common";
import * as moment from "moment";
import localeFr from "@angular/common/locales/fr";
import localeFrExtra from "@angular/common/locales/extra/fr";

moment.locale("fr");

registerLocaleData(localeFr, "fr-FR", localeFrExtra);

@NgModule({
  declarations: [
    AppComponent, ToastTestComponent
  ],
  imports: [ MatNativeDateModule,
    BrowserModule, AppRoutingModule, HttpClientModule, AuthorizationModule,  MsfButtonModule, LayoutModule, MsToastModule,
    AppHttpClientModule, BrowserAnimationsModule
  ],
  providers: [Preference, CurrentItems, {provide: MAT_DATE_LOCALE, useValue: 'fr'} ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(preference: Preference) {
    preference.set('themeMode', 'dark');
  }
}
