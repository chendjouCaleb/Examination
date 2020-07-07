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
import {Icon} from "./icon/icon";
import {StatsItem} from "./stats-item/stats-item";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MsAlert, MsAlertButton, MsAlertFooter} from "./alert/alert";
import {LocalTimeDirective} from "./local-time.directive";
import {DateInputDirective} from "./date-input.directive";
import {UcFirstPipe} from "./ucfirst.pipe";

@NgModule({
  imports: [CommonModule, MatSnackBarModule, MsfModalModule, MsfButtonModule],
  providers: [AlertEmitter, Confirmation],
  declarations: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent, StateBadgeDirective, Icon, StatsItem,
    MsAlert, MsAlertFooter, MsAlertButton, LocalTimeDirective, DateInputDirective, UcFirstPipe],
  exports: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent, StateBadgeDirective, Icon, StatsItem,
    MsAlert, MsAlertFooter, MsAlertButton, LocalTimeDirective, DateInputDirective, UcFirstPipe],
})
export class ControlModule {

}
