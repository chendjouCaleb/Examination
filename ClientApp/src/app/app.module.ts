import {BrowserModule} from '@angular/platform-browser';
import {Inject, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule, Preference} from 'examination/infrastructure';
import {MsfButtonModule} from 'fabric-docs';
import {AuthorizationModule} from 'examination/app/authorization';
import {HttpClientModule} from '@angular/common/http';
import {AppHttpClientModule} from 'examination/models';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CurrentItems} from './current-items';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {registerLocaleData} from '@angular/common';
import * as moment from 'moment';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';

import {AlertEmitter} from 'examination/controls';
import {LISTENER_ALERT_SERVICE_TOKEN} from 'examination/listeners';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HubsModule} from "examination/hubs";
import {MS_BUTTON_DEFAULT_OPTIONS, MsButtonDefaultOptions} from "@ms-fluent/button";


moment.locale('fr');

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [MatNativeDateModule, MatSnackBarModule,
    BrowserModule, AppRoutingModule, HttpClientModule, AuthorizationModule, MsfButtonModule, LayoutModule,
    AppHttpClientModule, HubsModule, BrowserAnimationsModule
  ],
  providers: [Preference, CurrentItems,
    {provide: LISTENER_ALERT_SERVICE_TOKEN, useExisting: AlertEmitter},
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(preference: Preference, @Inject(MS_BUTTON_DEFAULT_OPTIONS) buttonOptions: MsButtonDefaultOptions) {
    preference.loadProperties();
    buttonOptions.size = 'normal';
  }
}
