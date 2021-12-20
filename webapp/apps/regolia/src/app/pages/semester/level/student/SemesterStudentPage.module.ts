import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {SemesterStudentLayout} from './layout/SemesterStudentLayout';
import {SemesterStudentHomePage} from './home/SemesterStudentHome.page';
import {MomentModule} from 'ngx-moment';
import {MsActionMenuModule, MsButtonModule, MsPivotModule} from '@ms-fluent/components';
import {SemesterStudentTests} from "./SemesterStudentTests";

const routes: Routes = [
  {path: '', component: SemesterStudentLayout}
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MomentModule, MsActionMenuModule],
  declarations: [SemesterStudentLayout, SemesterStudentHomePage, SemesterStudentTests]
})
export class SemesterStudentPageModule {

}
