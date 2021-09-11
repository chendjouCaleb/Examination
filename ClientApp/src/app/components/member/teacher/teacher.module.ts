import {TeacherAdd} from 'examination/app/components/member/teacher/add/teacher-add';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {TeacherService} from './teacher.service';
import {TEACHER_SERVICE_TOKEN} from './teacher.service.interface';
import {TeacherList} from './list/teacher-list';
import {RouterModule} from '@angular/router';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDialogModule,
  MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsDialogModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsContextMenuModule, MsButtonModule, RouterModule, MsSpinnerModule],
  declarations: [TeacherAdd, TeacherList],
  exports: [TeacherAdd, TeacherList],
  providers: [TeacherService, {provide: TEACHER_SERVICE_TOKEN, useExisting: TeacherService}]
})
export class TeacherModule {
}
