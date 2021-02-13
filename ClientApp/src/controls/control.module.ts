import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfModalModule} from 'fabric-docs';
import {LabelledIcon} from './labelled/labelled-icon';
import {Labelled} from './labelled/labelled';
import {FloatButton} from './float-button/float-button';
import {AlertEmitter} from './alert-emitter';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {Confirmation} from './confirmation/confirmation';
import {StateBadgeDirective} from './state-badge.directive';
import {Icon} from './icon/icon';
import {StatsItem} from './stats-item/stats-item';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MsAlert, MsAlertButton, MsAlertFooter} from './alert/alert';
import {LocalTimeDirective} from './local-time.directive';
import {DateInputDirective} from './date-input.directive';
import {UcFirstPipe} from './ucfirst.pipe';

import {MsFontWeightDirective} from './font-weight.directive';
import {MsFontSizeDirective} from './font-size.directive';
import {MsBorderColorDirective} from './border-color.directive';
import {MsBgColorDirective} from './bg-color.directive';
import {MsColorDirective} from './font-color.directive';
import {TableColumnDirective} from './tablecolumn.directive';
import {UserPersona} from './user-persona';
import {MsPersonaModule} from '@ms-fluent/persona';
import {MsPaginatorButtons} from './paginator-buttons/paginator-buttons';
import {MsButtonModule} from '@ms-fluent/button';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MsPersonaModule, MsButtonModule, MsfModalModule, MsfButtonModule],
  providers: [AlertEmitter, Confirmation],
  declarations: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent, StateBadgeDirective, Icon, StatsItem,
    MsAlert, MsAlertFooter, MsAlertButton, LocalTimeDirective, DateInputDirective, UcFirstPipe,
    MsColorDirective, MsFontWeightDirective, MsFontSizeDirective, MsBorderColorDirective, MsBgColorDirective,
    TableColumnDirective, UserPersona, MsPaginatorButtons],
  exports: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent, StateBadgeDirective, Icon, StatsItem,
    MsAlert, MsAlertFooter, MsAlertButton, LocalTimeDirective, DateInputDirective, UcFirstPipe, TableColumnDirective,
    MsFontWeightDirective, MsFontSizeDirective, MsColorDirective, MsBorderColorDirective, MsBgColorDirective,
    UserPersona, MsPaginatorButtons],
})
export class ControlModule {

}
