import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MsAlertModule,
  MsButtonModule,
  MsCheckboxModule, MsCleaveModule, MsDialogModule,
  MsFormFieldModule,
  MsLabelModule,
  MsRadioModule, MsSelectModule,
  MsStepperModule
} from '@ms-fluent/components';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StudentAddContact} from './contact/student-add-contact';
import {StudentAddEnd} from './end/student-add-end';
import {StudentAddHome} from './home/student-add-home';
import {StudentAddImage} from './image/student-add-image';
import {StudentAddInfo} from './info/student-add-info';
import {StudentAddRegistrationId} from './registrationId/student-add-registrationId';
import {StudentAdd} from './student-add';
import {StudentAddLevel} from './level/student-add-level';
import {AppFormModule, ImageFormModule} from 'examination/controls';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MsFormFieldModule, MsStepperModule, MsRadioModule,
    MsCheckboxModule, MsLabelModule, MsButtonModule, MsStepperModule, MsSelectModule, MsDialogModule,
    MsCleaveModule, MsAlertModule, AppFormModule, ImageFormModule],
  declarations: [ StudentAdd, StudentAddContact, StudentAddEnd, StudentAddHome, StudentAddImage, StudentAddLevel,
    StudentAddInfo, StudentAddRegistrationId ]
})
export class StudentAddModule {

}
