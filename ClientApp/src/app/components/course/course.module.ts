import {NgModule} from '@angular/core';
import {CourseAdd} from './add/course-add';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule} from 'examination/controls';
import {MsfCheckboxModule, MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {CourseEdit} from './edit/course-edit';
import {ScoreAdd} from './score-add/score-add';
import {CourseService} from './course.service';
import {COURSE_SERVICE_TOKEN} from './course.service.interface';
import {CourseResolver} from './course.resolver';
import {ScoreList} from './score-list/score-list';
import {CourseLevelSpecialityAdd} from './course-level-speciality-add/course-level-speciality-add';
import {CourseRestrict} from './restrict/course-restrict';
import {CourseDetails} from './details/course-details';
import {CourseList} from './list/course-list';
import {LayoutModule} from 'examination/infrastructure';
import {MsTableModule} from '@ms-fluent/table';
import {MsButtonModule} from '@ms-fluent/button';
import {MomentModule} from "ngx-moment";


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, AppFormModule,
    MsButtonModule, MsfSelectModule, MsfModalModule, MsfMenuModule, MsTableModule, ControlModule, LayoutModule, MsfCheckboxModule, MomentModule],
  declarations: [CourseDetails, CourseList, CourseAdd, CourseLevelSpecialityAdd, CourseRestrict, CourseEdit, ScoreAdd, ScoreList],
  exports: [CourseDetails, CourseList, CourseAdd, CourseLevelSpecialityAdd, CourseRestrict, CourseEdit, ScoreAdd, ScoreList],
  providers: [CourseResolver, CourseService, {provide: COURSE_SERVICE_TOKEN, useExisting: CourseService}]
})
export class CourseModule {
}

