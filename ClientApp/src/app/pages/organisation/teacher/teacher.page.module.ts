import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfMenuModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {
  CourseModule,
  DepartmentResolver,
  ExaminationModule,
  SchoolResolver,
  SpecialityModule,
  TeacherModule
} from 'examination/app/components';
import {MsButtonModule} from '@ms-fluent/button';
import {MsPivotModule} from '@ms-fluent/pivot';
import {TeacherPageLayout} from './layout/teacher.page-layout';
import {TeacherHomePage} from './home/teacher-home.page';
import {MomentModule} from 'ngx-moment';
import {MsTableModule} from '@ms-fluent/table';

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
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule, MomentModule],
  declarations: [TeacherPageLayout, TeacherHomePage]
})
export class TeacherPageModule {

}
