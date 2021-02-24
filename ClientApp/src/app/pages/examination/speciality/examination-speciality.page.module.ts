import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationModule, TestModule} from 'examination/app/components';
import {LayoutModule} from 'examination/infrastructure';
import {ExaminationSpecialityHomePage} from './home/examination-speciality-home.page';
import {ExaminationSpecialityPageLayout} from './layout/examination-speciality.page-layout';
import {MsPivotModule} from '@ms-fluent/pivot';
import {MsButtonModule} from '@ms-fluent/button';
import {ControlModule} from "examination/controls";

export const routes: Routes = [
  {path: '', component: ExaminationSpecialityPageLayout }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule, MsButtonModule,
    MsPivotModule, ControlModule],
  declarations: [ExaminationSpecialityPageLayout, ExaminationSpecialityHomePage ]
})
export class ExaminationSpecialityPageModule {
}
