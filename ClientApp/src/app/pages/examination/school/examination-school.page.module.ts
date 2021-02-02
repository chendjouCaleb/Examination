import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationSchoolHomePage} from './home/examination-school-home.page';
import {RouterModule, Routes} from '@angular/router';
import {ExaminationModule, TestModule} from 'examination/app/components';
import {ExaminationSchoolPageLayout} from './layout/examination-school.page-layout';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule, MsfTabModule, MsPivotModule} from 'examination/controls';
import {MsfButtonModule, MsfMenuModule} from "fabric-docs";
import {ExaminationDepartments} from "examination/app/pages/examination/school/departments/examination-departments";

export const routes: Routes = [
  {path: '', component: ExaminationSchoolPageLayout}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule,
    MsfMenuModule, MsPivotModule, MsfButtonModule, ControlModule],
  declarations: [ExaminationSchoolPageLayout, ExaminationSchoolHomePage, ExaminationDepartments ]
})
export class ExaminationSchoolPageModule {
}
