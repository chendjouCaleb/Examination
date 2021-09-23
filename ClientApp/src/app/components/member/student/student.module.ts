import {MatRippleModule} from '@angular/material/core';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {MomentModule} from 'ngx-moment';
import {StudentRegistrationId} from './registrationId/student-registrationId';
import {StudentUserLink} from './user-link/student-user-link';
import {StudentEdit} from './edit/student-edit';
import {StudentAdd} from './add/student-add';
import {StudentDetails} from './details/student-details';
import {StudentLevel} from './level/student-level';
import {StudentService} from './student.service';
import {StudentResolver} from './student.resolver';
import {STUDENT_SERVICE_TOKEN} from './student.service.interface';
import {StudentList} from './list/student-list';
import {StudentSpeciality} from './speciality/student-speciality';
import {RouterModule} from '@angular/router';
import {
  MsActionMenuModule,
  MsButtonModule,
  MsCheckboxModule, MsCleaveModule,
  MsContextMenuModule,
  MsDialogModule,
  MsDropdownModule, MsFormFieldModule, MsGridModule, MsLabelModule,
  MsPaginatorModule,
  MsPivotModule,
  MsRadioModule,
  MsSelectModule,
  MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';
import {StudentAddModule} from './add/student-add.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsSelectModule, MsSpinnerModule, MsActionMenuModule,
    AppFormModule, MsContextMenuModule, MsDropdownModule, MomentModule, MsRadioModule, MsTableModule, MsButtonModule, MsPaginatorModule,
    MatRippleModule, MsCheckboxModule, UserPickerModule, MsPivotModule, MsDialogModule, RouterModule, MsFormFieldModule,
    MsLabelModule, StudentAddModule, MsCleaveModule, MsGridModule],
  declarations: [ StudentEdit, StudentUserLink, StudentLevel, StudentRegistrationId,
    StudentDetails, StudentList, StudentSpeciality],
  exports: [ StudentEdit, StudentUserLink, StudentLevel, StudentRegistrationId,
    StudentDetails, StudentList, StudentSpeciality],

  providers: [StudentService, StudentResolver, {provide: STUDENT_SERVICE_TOKEN, useExisting: StudentService}]
})
export class StudentModule {
}
