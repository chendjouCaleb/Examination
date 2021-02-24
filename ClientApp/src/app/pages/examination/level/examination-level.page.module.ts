import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationModule} from 'examination/app/components';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule, MsfTabModule } from 'examination/controls';
import {ExaminationLevelHomePage} from './home/examination-level-home.page';
import {ExaminationLevelPageLayout} from './layout/examination-level.page-layout';
import {TestModule} from 'examination/app/components/test/test.module';
import {MsPivotModule} from '@ms-fluent/pivot';
import {ExaminationStudentPage} from './student/examination.student.page';
import {MsButtonModule} from "@ms-fluent/button";

export const routes: Routes = [
  {path: '', component: ExaminationLevelPageLayout},
  {path: 'students/:examinationStudentId', component: ExaminationStudentPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, MsPivotModule,
    LayoutModule, MsfTabModule, ControlModule, MsButtonModule],
  declarations: [ExaminationLevelPageLayout, ExaminationLevelHomePage, ExaminationStudentPage]
})
export class ExaminationLevelPageModule {
}
