import {BrowserModule, HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule} from '@angular/platform-browser';
import {Injectable, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule, Preference} from 'examination/infrastructure';
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
import {HubsModule} from 'examination/hubs';
import {Global} from '../global';

import * as hammer from 'hammerjs'
import {
  MS_BUTTON_DEFAULT_OPTIONS,
  MS_BUTTON_DEFAULT_OPTIONS_FACTORY, MS_DIALOG_DEFAULT_OPTIONS,
  MsButtonDefaultOptions,
  MsButtonModule, MsDialogConfig,
  MsSpinnerModule
} from '@ms-fluent/components';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = {
    swipe: {direction: hammer.DIRECTION_ALL},
    pan: {direction: hammer.DIRECTION_ALL}
  };
}


moment.locale('fr');

registerLocaleData(localeFr, 'fr-FR', localeFrExtra);

const buttonOptions: MsButtonDefaultOptions = MS_BUTTON_DEFAULT_OPTIONS_FACTORY();

buttonOptions.colorThemes['standard'] = {
  fontColor: 'standard',
  focusBorderColor: 'sharedGray180',
  bgColor: 'standard',
  borderColor: 'transparent'
};

const dialogConfig = new MsDialogConfig();
dialogConfig.backdropClass = ['ex-overlay-class'];
dialogConfig.panelClass = ['ex-dialog-panel'];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [MatNativeDateModule, MatSnackBarModule, HammerModule, MsSpinnerModule,
    BrowserModule, AppRoutingModule, HttpClientModule, AuthorizationModule, MsButtonModule, LayoutModule,
    AppHttpClientModule, HubsModule, BrowserAnimationsModule
  ],
  providers: [Preference, CurrentItems, Global,
    {provide: MS_DIALOG_DEFAULT_OPTIONS, useValue: dialogConfig},
    {provide: LISTENER_ALERT_SERVICE_TOKEN, useExisting: AlertEmitter},
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    {provide: MAT_DATE_LOCALE, useValue: 'fr'},
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
