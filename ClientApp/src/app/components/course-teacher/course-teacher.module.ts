import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlModule, MsfSelectModule} from 'examination/controls';
import {MsTableModule} from '@ms-fluent/table';
import {MsButtonModule} from '@ms-fluent/button';
import {CourseTeacherList} from './list/course-teacher-list';
import {CourseTeacherService} from './course-teacher.service';
import {COURSE_TEACHER_SERVICE_TOKEN} from './course-teacher.service.interface';
import {CourseTeacherAdd} from './add/course-teacher-add';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MsfCheckboxModule, MsfModalModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {CourseTeacherDetails} from './details/course-teacher-details';
import {RouterModule} from '@angular/router';
import {MsPivotModule} from '@ms-fluent/pivot';
import {CourseHourModule} from '../course-hour';

@NgModule({
  imports: [CommonModule, ControlModule, MsTableModule, MsButtonModule, FormsModule, ReactiveFormsModule,
    MsfCheckboxModule, MsfSelectModule, LayoutModule, MsfModalModule, RouterModule, MsPivotModule, CourseHourModule],
  declarations: [ CourseTeacherList, CourseTeacherAdd, CourseTeacherDetails ],
  exports: [ CourseTeacherList, CourseTeacherAdd, CourseTeacherDetails ],
  providers: [ CourseTeacherService, { provide: COURSE_TEACHER_SERVICE_TOKEN, useExisting: CourseTeacherService }]
})
export class CourseTeacherModule {

}
