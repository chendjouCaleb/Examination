import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {YearStudentLayout} from './layout/YearStudentLayout';
import {YearStudentHomePage} from './home/YearStudentHome.page';
import {MomentModule} from 'ngx-moment';
import {MsActionMenuModule, MsButtonModule, MsPivotModule} from '@ms-fluent/components';
import {YearStudentTests} from "./YearStudentTests";

const routes: Routes = [
  {path: '', component: YearStudentLayout}
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MomentModule, MsActionMenuModule],
  declarations: [YearStudentLayout, YearStudentHomePage, YearStudentTests]
})
export class YearStudentPageModule {

}
