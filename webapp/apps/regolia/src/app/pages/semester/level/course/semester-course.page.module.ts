import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {
  CourseModule,
  CourseTeacherModule,
  ExaminationModule,
  SpecialityModule,
  TestModule
} from '@examination/components';
import {SemesterCoursePageLayout} from './layout/semester-course.page-layout';
import {SemesterCourseHomePage} from './home/semester-course-home.page';
import {MomentModule} from 'ngx-moment';
import {MsActionMenuModule, MsButtonModule, MsPivotModule, MsTableModule} from '@ms-fluent/components';
import {SemesterCourseTeacherListModule} from "../../../../components/semester-course-teacher/list";

const routes: Routes = [
  {
    path: '', component: SemesterCoursePageLayout
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsTableModule, SpecialityModule, CourseModule, ExaminationModule,
    CourseModule, MsPivotModule, TestModule, CourseTeacherModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MomentModule, MsActionMenuModule, SemesterCourseTeacherListModule],
  declarations: [SemesterCoursePageLayout, SemesterCourseHomePage]
})
export class SemesterCoursePageModule {

}
