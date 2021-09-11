import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
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
import {CoursePageLayout} from './layout/course.page-layout';
import {CourseHomePage} from './home/course-home.page';
import {MomentModule} from 'ngx-moment';
import {CourseTeacherModule} from 'examination/app/components/course-teacher';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDropdownModule,
  MsPivotModule,
  MsTableModule
} from '@ms-fluent/components';

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
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsDropdownModule,
    MsContextMenuModule, MomentModule, CourseHourModule, CourseSessionModule],
  declarations: [CoursePageLayout, CourseHomePage]
})
export class CoursePageModule {

}
