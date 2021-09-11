import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationModule, TestModule} from 'examination/app/components';
import {LayoutModule} from 'examination/infrastructure';
import {ExaminationLevelSpecialityPageLayout} from './layout/examination-level-speciality.page-layout';
import {ExaminationLevelSpecialityHomePage} from './home/examination-level-speciality-home.page';
import {ControlModule} from 'examination/controls';
import {MsButtonModule, MsPivotModule} from '@ms-fluent/components';


export const routes: Routes = [
  {path: '', component: ExaminationLevelSpecialityPageLayout}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule,
    MsPivotModule, MsButtonModule, ControlModule],
  exports: [
    ExaminationLevelSpecialityHomePage
  ],
  declarations: [ExaminationLevelSpecialityPageLayout, ExaminationLevelSpecialityHomePage]
})
export class ExaminationLevelSpecialityPageModule {
}
