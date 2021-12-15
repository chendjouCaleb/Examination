import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {
  CourseHourModule,
  CourseModule, CourseSessionModule,
  CourseTeacherModule,
  ExaminationModule,
  SpecialityModule,
  TestModule
} from '@examination/components';
import {SemesterCoursePageLayout} from './layout/semester-course.page-layout';
import {SemesterCourseHomePage} from './home/semester-course-home.page';
import {MomentModule} from 'ngx-moment';
import {MsActionMenuModule, MsButtonModule, MsPivotModule, MsTableModule} from '@ms-fluent/components';
import {SemesterCourseTeacherListModule} from "@examination/components";
import {SemesterCourseHoursPage} from "./SemesterCourseHoursPage";
import {SemesterCourseSessionsPage} from "./SemesterCourseSessionsPage";

const routes: Routes = [
  { path: '', component: SemesterCoursePageLayout}
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsTableModule, SpecialityModule, CourseModule, ExaminationModule,
    CourseModule, MsPivotModule, TestModule, CourseTeacherModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MomentModule, MsActionMenuModule, SemesterCourseTeacherListModule, CourseHourModule, CourseSessionModule],
  declarations: [SemesterCoursePageLayout, SemesterCourseHomePage, SemesterCourseHoursPage,  SemesterCourseSessionsPage]
})
export class SemesterCoursePageModule {

}
