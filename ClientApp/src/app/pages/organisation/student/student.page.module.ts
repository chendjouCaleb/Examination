import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfMenuModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {
  CourseModule,
  DepartmentResolver, ExaminationModule, LevelResolver,
  SchoolResolver,
  SpecialityModule,
  StudentModule
} from 'examination/app/components';
import {MsButtonModule} from '@ms-fluent/button';
import {MsPivotModule} from '@ms-fluent/pivot';
import {StudentPageLayout} from './layout/student.page-layout';
import {StudentHomePage} from './home/student-home.page';
import {MomentModule} from 'ngx-moment';
import {StudentExaminations} from './examinations/student-examinations';
import {MsTableModule} from '@ms-fluent/table';

const routes: Routes = [
  {
    path: ':studentId',
    resolve: [SchoolResolver, DepartmentResolver, LevelResolver],
    component: StudentPageLayout
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsTableModule, SpecialityModule, CourseModule, ExaminationModule, StudentModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule, MomentModule],
  declarations: [StudentPageLayout, StudentHomePage, StudentExaminations]
})
export class StudentPageModule {

}
