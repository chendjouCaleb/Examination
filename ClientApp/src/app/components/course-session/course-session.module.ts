import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppFormModule, ControlModule, MsfSelectModule} from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MsfCheckboxModule, MsfModalModule, MsfRadioModule} from 'fabric-docs';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';
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

@NgModule({
  imports: [CommonModule, RouterModule, MomentModule, ControlModule, FormsModule, ReactiveFormsModule, MsButtonModule,
    MsTableModule, MsfCheckboxModule, MsfRadioModule, MsfSelectModule, MomentModule, AppFormModule, MsfModalModule],

  declarations: [CourseSessionList, CourseSessionAdd, CourseSessionDate, CourseSessionDelete, CourseSessionDetails,
    CourseSessionObjective, CourseSessionObjective, CourseSessionReport, CourseSessionRoom, CourseSessionTeacher],
  exports: [CourseSessionList, CourseSessionAdd, CourseSessionDate, CourseSessionDelete, CourseSessionDetails,
    CourseSessionObjective, CourseSessionObjective, CourseSessionReport, CourseSessionRoom, CourseSessionTeacher],
  providers: [CourseSessionService, {provide: COURSE_SESSION_SERVICE_TOKEN, useExisting: CourseSessionService}]
})
export class CourseSessionModule {

}
