import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import {MsPaginatorButtons} from './paginator-buttons/paginator-buttons';
import {HistoryBack} from './history-back';
import {MsIcon} from './ms-icon';
import {DayOfWeekPipe} from './dayOfWeek.pipe';
import {PreviousLocation} from './prev-location';
import {MsButtonModule, MsDialogModule, MsPersonaModule} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MsPersonaModule, MsButtonModule, MsDialogModule],
  providers: [AlertEmitter, Confirmation, PreviousLocation],
  declarations: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent, StateBadgeDirective, Icon, StatsItem,
    MsAlert, MsAlertFooter, MsAlertButton, LocalTimeDirective, DateInputDirective, UcFirstPipe,
    MsColorDirective, MsFontWeightDirective, MsFontSizeDirective, MsBorderColorDirective, MsBgColorDirective,
    TableColumnDirective, UserPersona, MsPaginatorButtons, HistoryBack, MsIcon, DayOfWeekPipe],
  exports: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent, StateBadgeDirective, Icon, StatsItem,
    MsAlert, MsAlertFooter, MsAlertButton, LocalTimeDirective, DateInputDirective, UcFirstPipe, TableColumnDirective,
    MsFontWeightDirective, MsFontSizeDirective, MsColorDirective, MsBorderColorDirective, MsBgColorDirective,
    UserPersona, MsPaginatorButtons, HistoryBack, MsIcon, DayOfWeekPipe],
})
export class ControlModule {

}
