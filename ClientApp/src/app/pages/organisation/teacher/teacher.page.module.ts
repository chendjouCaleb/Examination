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
  SpecialityModule,
  TeacherModule
} from 'examination/app/components';
import {TeacherPageLayout} from './layout/teacher.page-layout';
import {TeacherHomePage} from './home/teacher-home.page';
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
    path: ':teacherId',
    resolve: [SchoolResolver, DepartmentResolver],
    component: TeacherPageLayout
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsTableModule, SpecialityModule, CourseModule, ExaminationModule,
    TeacherModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsDropdownModule, MsContextMenuModule, MomentModule, CourseTeacherModule,
    CourseHourModule, CourseSessionModule],
  declarations: [TeacherPageLayout, TeacherHomePage]
})
export class TeacherPageModule {

}
