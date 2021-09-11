import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationModule, TestModule} from 'examination/app/components';
import {LayoutModule} from 'examination/infrastructure';
import {ExaminationDepartmentHomePage} from './home/examination-department-home.page';
import {ExaminationDepartmentPageLayout} from './layout/examination-department.page-layout';
import {ControlModule} from 'examination/controls';
import {MsButtonModule, MsPivotModule} from '@ms-fluent/components';

export const routes: Routes = [
  {path: '', component: ExaminationDepartmentPageLayout}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule,
    MsPivotModule, MsButtonModule, ControlModule],
  declarations: [ExaminationDepartmentPageLayout, ExaminationDepartmentHomePage, ]
})
export class ExaminationDepartmentPageModule {
}
