import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TestLevelSpecialityResolver, TestModule} from 'examination/app/components';
import {TestPageLayout} from './layout/test.page-layout';
import {RouterModule, Routes} from '@angular/router';
import {LayoutModule} from 'examination/infrastructure';
import {TestLevelSpecialityPageLayout} from './level-speciality-layout/test-level-speciality.page-layout';
import {TestGroupPageLayout} from './test-group-layout/test-group.page-layout';
import {TestGroupModule, TestGroupResolver} from 'examination/app/components/test-group';
import {PaperModule} from 'examination/app/components/paper';
import {MsPivotModule} from "@ms-fluent/pivot";

export const routes: Routes = [
  {path: '', component: TestPageLayout},
  {
    path: 'specialities/:testLevelSpecialityId',
    component: TestLevelSpecialityPageLayout,
    resolve: [TestLevelSpecialityResolver]
  },
  {path: 'groups/:testGroupId', component: TestGroupPageLayout, resolve: [TestGroupResolver]}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsPivotModule,
     TestModule, TestGroupModule, PaperModule],
  declarations: [TestPageLayout, TestGroupPageLayout, TestLevelSpecialityPageLayout]
})
export class TestPageModule {
}
