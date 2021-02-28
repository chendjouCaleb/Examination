import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ControlModule, MsfSelectModule} from 'examination/controls';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MsfCheckboxModule, MsfRadioModule} from 'fabric-docs';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';
import {CourseSessionList} from './list/course-session-list';
import {RouterModule} from '@angular/router';
import {CourseSessionService} from './course-session.service';
import {COURSE_SESSION_SERVICE_TOKEN} from './course-session.service.interface';
import {MomentModule} from 'ngx-moment';

@NgModule({
  imports: [CommonModule, RouterModule, ControlModule, FormsModule, ReactiveFormsModule, MsButtonModule, MsTableModule,
    MsfCheckboxModule, MsfRadioModule, MsfSelectModule, MomentModule],

  declarations: [ CourseSessionList ],
  exports: [ CourseSessionList ],
  providers: [ CourseSessionService, { provide: COURSE_SESSION_SERVICE_TOKEN, useExisting: CourseSessionService}]
})
export class CourseSessionModule {

}
