import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExaminationModule} from 'examination/app/components';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule, MsfTabModule, MsPivotModule} from 'examination/controls';
import {ExaminationLevelHomePage} from './home/examination-level-home.page';
import {ExaminationLevelPageLayout} from './layout/examination-level.page-layout';
import {TestModule} from 'examination/app/components/test/test.module';

export const routes: Routes = [
  {path: '', component: ExaminationLevelPageLayout}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, MsPivotModule,
    LayoutModule, MsfTabModule, ControlModule],
  declarations: [ExaminationLevelPageLayout, ExaminationLevelHomePage]
})
export class ExaminationLevelPageModule {
}
