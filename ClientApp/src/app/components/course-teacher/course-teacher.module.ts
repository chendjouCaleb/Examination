import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlModule, MsfSelectModule} from 'examination/controls';
import {CourseTeacherList} from './list/course-teacher-list';
import {CourseTeacherService} from './course-teacher.service';
import {COURSE_TEACHER_SERVICE_TOKEN} from './course-teacher.service.interface';
import {CourseTeacherAdd} from './add/course-teacher-add';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from 'examination/infrastructure';
import {CourseTeacherDetails} from './details/course-teacher-details';
import {RouterModule} from '@angular/router';
import {CourseHourModule} from '../course-hour';
import {
  MsButtonModule,
  MsCheckboxModule,
  MsDialogModule, MsLabelModule,
  MsPivotModule,
  MsSelectModule,
  MsTableModule
} from '@ms-fluent/components';

@NgModule({
  imports: [CommonModule, ControlModule, MsTableModule, MsButtonModule, FormsModule, ReactiveFormsModule,
    MsCheckboxModule, MsLabelModule, MsSelectModule, LayoutModule, MsDialogModule, RouterModule, MsPivotModule, CourseHourModule],
  declarations: [ CourseTeacherList, CourseTeacherAdd, CourseTeacherDetails ],
  exports: [ CourseTeacherList, CourseTeacherAdd, CourseTeacherDetails ],
  providers: [ CourseTeacherService, { provide: COURSE_TEACHER_SERVICE_TOKEN, useExisting: CourseTeacherService }]
})
export class CourseTeacherModule {

}
