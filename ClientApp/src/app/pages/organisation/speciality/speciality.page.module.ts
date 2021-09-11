import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {SpecialityHome} from './home/speciality-home';
import {ControlModule} from 'examination/controls';
import {
  CourseModule,
  DepartmentResolver,
  SchoolResolver,
  SpecialityModule,
  SpecialityResolver,
  StudentModule
} from 'examination/app/components';
import {SpecialityPageLayout} from './layout/speciality.page-layout';
import {MsButtonModule, MsContextMenuModule, MsDropdownModule, MsPivotModule} from '@ms-fluent/components';

const routes: Routes = [
  {
    path: ':specialityId',
    resolve: [SchoolResolver, DepartmentResolver, SpecialityResolver],
    component: SpecialityPageLayout
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, SpecialityModule, CourseModule, StudentModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsDropdownModule, MsContextMenuModule, ],
  declarations: [SpecialityHome, SpecialityPageLayout]
})
export class SpecialityPageModule {

}
