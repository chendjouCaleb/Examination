import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationSchoolHomePage} from './home/examination-school-home.page';
import {RouterModule, Routes} from '@angular/router';
import {ExaminationModule, TestModule} from 'examination/app/components';
import {ExaminationSchoolPageLayout} from './layout/examination-school.page-layout';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {MsfMenuModule} from 'fabric-docs';
import {ExaminationDepartments} from 'examination/app/pages/examination/school/departments/examination-departments';
import {MsPivotModule} from '@ms-fluent/pivot';
import {MsButtonModule} from '@ms-fluent/button';

export const routes: Routes = [
  {path: '', component: ExaminationSchoolPageLayout}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule,
    MsfMenuModule, MsPivotModule, ControlModule, MsButtonModule],
  declarations: [ExaminationSchoolPageLayout, ExaminationSchoolHomePage, ExaminationDepartments]
})
export class ExaminationSchoolPageModule {
}
