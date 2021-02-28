import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfMenuModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {
  CourseHourModule,
  CourseModule, CourseSessionModule,
  DepartmentResolver,
  ExaminationModule,
  SchoolResolver,
  SpecialityModule, TestModule
} from 'examination/app/components';
import {MsButtonModule} from '@ms-fluent/button';
import {MsPivotModule} from '@ms-fluent/pivot';
import {CoursePageLayout} from './layout/course.page-layout';
import {CourseHomePage} from './home/course-home.page';
import {MomentModule} from 'ngx-moment';
import {MsTableModule} from '@ms-fluent/table';
import {CourseTeacherModule} from 'examination/app/components/course-teacher';

const routes: Routes = [
  {
    path: ':courseId',
    resolve: [SchoolResolver, DepartmentResolver],
    component: CoursePageLayout
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsTableModule, SpecialityModule, CourseModule, ExaminationModule,
    CourseModule, MsPivotModule, TestModule, CourseTeacherModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule, MomentModule, CourseHourModule, CourseSessionModule],
  declarations: [CoursePageLayout, CourseHomePage]
})
export class CoursePageModule {

}
