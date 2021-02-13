import {MatRippleModule} from '@angular/material/core';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfCheckboxModule, MsfMenuModule, MsfModalModule, MsfRadioModule} from 'fabric-docs';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule, UserPickerModule} from 'examination/controls';
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
import {MsPaginatorModule, MsTableModule} from '@ms-fluent/table';
import {MsButtonModule} from '@ms-fluent/button';
import {MsPivotModule} from '@ms-fluent/pivot';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfSelectModule,
    AppFormModule, MsfMenuModule, MomentModule, MsfRadioModule, MsTableModule, MsButtonModule, MsPaginatorModule,
    MatRippleModule, MsfCheckboxModule, UserPickerModule, MsPivotModule, MsfModalModule],
  declarations: [StudentAdd, StudentEdit, StudentUserLink, StudentLevel, StudentRegistrationId,
    StudentDetails, StudentList, StudentSpeciality],
  exports: [StudentAdd, StudentEdit, StudentUserLink, StudentLevel, StudentRegistrationId,
    StudentDetails, StudentList, StudentSpeciality],

  providers: [StudentService, StudentResolver, {provide: STUDENT_SERVICE_TOKEN, useExisting: StudentService}]
})
export class StudentModule {
}
