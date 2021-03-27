import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, MsfSelectModule} from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MsfCheckboxModule, MsfModalModule, MsfRadioModule} from 'fabric-docs';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';
import {CourseHourList} from './list/course-hour-list';
import {RouterModule} from '@angular/router';
import {CourseHourService} from './course-hour.service';
import {COURSE_HOUR_SERVICE_TOKEN} from './course-hour.service.interface';
import {CourseHourAdd} from './add/course-hour-add';
import {MsPivotModule} from '@ms-fluent/pivot';
import {CourseHourDetails} from './details/course-hour-details';
import {CourseHourRoom} from './room/course-hour-room';
import {CourseHourTeacher} from './teacher/course-hour-teacher';
import {CourseHourDelete} from './delete/course-hour-delete';
import {MsSpinnerModule} from "@ms-fluent/spinner";

@NgModule({
  imports: [CommonModule, RouterModule, ControlModule, FormsModule, ReactiveFormsModule, MsButtonModule, MsTableModule,
    MsfCheckboxModule, MsfRadioModule, MsfSelectModule, AppFormModule, MsfModalModule, MsPivotModule,
    MsPivotModule, MsSpinnerModule],

  declarations: [CourseHourList, CourseHourAdd, CourseHourDetails, CourseHourRoom, CourseHourTeacher, CourseHourDelete],
  exports: [CourseHourList, CourseHourAdd, CourseHourDetails, CourseHourRoom, CourseHourTeacher, CourseHourDelete],
  providers: [CourseHourService, {provide: COURSE_HOUR_SERVICE_TOKEN, useExisting: CourseHourService}]
})
export class CourseHourModule {

}
