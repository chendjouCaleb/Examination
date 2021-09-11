import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule } from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CourseSessionList} from './list/course-session-list';
import {RouterModule} from '@angular/router';
import {CourseSessionService} from './course-session.service';
import {COURSE_SESSION_SERVICE_TOKEN} from './course-session.service.interface';
import {MomentModule} from 'ngx-moment';
import {CourseSessionAdd} from './add/course-session-add';
import {CourseSessionDate} from './date/course-session-date';
import {CourseSessionDelete} from './delete/course-session-delete';
import {CourseSessionDetails} from './details/course-session-details';
import {CourseSessionObjective} from './objective/course-session-objective';
import {CourseSessionReport} from './report/course-session-report';
import {CourseSessionRoom} from './room/course-session-room';
import {CourseSessionTeacher} from './teacher/course-session-teacher';
import {
  MsButtonModule, MsCheckboxModule,
  MsDialogModule,
  MsRadioModule,
  MsSelectModule,
  MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';
import {MsDatePickerModule, MsTimeLineModule} from '@ms-fluent/date-ui';

@NgModule({
  imports: [CommonModule, RouterModule, MomentModule, ControlModule, FormsModule, ReactiveFormsModule,
    MsSpinnerModule, MsTableModule, MsCheckboxModule, MsRadioModule, MsSelectModule, MomentModule, AppFormModule,
    MsButtonModule, MsDialogModule, MsDatePickerModule, MsTimeLineModule],

  declarations: [CourseSessionList, CourseSessionAdd, CourseSessionDate, CourseSessionDelete, CourseSessionDetails,
    CourseSessionObjective, CourseSessionObjective, CourseSessionReport, CourseSessionRoom, CourseSessionTeacher],
  exports: [CourseSessionList, CourseSessionAdd, CourseSessionDate, CourseSessionDelete, CourseSessionDetails,
    CourseSessionObjective, CourseSessionObjective, CourseSessionReport, CourseSessionRoom, CourseSessionTeacher],
  providers: [CourseSessionService, {provide: COURSE_SESSION_SERVICE_TOKEN, useExisting: CourseSessionService}]
})
export class CourseSessionModule {

}
