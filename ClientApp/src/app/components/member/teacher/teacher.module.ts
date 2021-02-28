import {TeacherAdd} from 'examination/app/components/member/teacher/add/teacher-add';
import {NgModule} from '@angular/core';
import {MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {TeacherService} from './teacher.service';
import {TEACHER_SERVICE_TOKEN} from './teacher.service.interface';
import {TeacherList} from './list/teacher-list';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';
import {RouterModule} from '@angular/router';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsButtonModule, RouterModule],
  declarations: [TeacherAdd, TeacherList],
  exports: [TeacherAdd, TeacherList],
  providers: [ TeacherService, { provide: TEACHER_SERVICE_TOKEN, useExisting: TeacherService}]
})
export class TeacherModule {
}
