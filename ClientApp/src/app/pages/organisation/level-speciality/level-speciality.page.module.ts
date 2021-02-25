import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfMenuModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {LevelSpecialityHome} from './home/level-speciality-home';
import {ControlModule} from 'examination/controls';
import {
  CourseModule,
  DepartmentResolver,
  LevelResolver,
  SchoolResolver,
  SpecialityModule,
  StudentModule
} from 'examination/app/components';
import {LevelSpecialityPageLayout} from './layout/level-speciality.page-layout';
import {MsButtonModule} from '@ms-fluent/button';
import {MsPivotModule} from '@ms-fluent/pivot';

const routes: Routes = [
  {
    path: ':levelSpecialityId',
    resolve: [SchoolResolver, DepartmentResolver, LevelResolver],
    component: LevelSpecialityPageLayout
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, SpecialityModule, CourseModule, StudentModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule],
  declarations: [LevelSpecialityHome, LevelSpecialityPageLayout]
})
export class LevelSpecialityPageModule {

}
