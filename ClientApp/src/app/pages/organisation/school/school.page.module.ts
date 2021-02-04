import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SchoolModule, SchoolResolver} from 'examination/app/components/school';
import {CommonModule} from '@angular/common';
import {SchoolListPage} from './list/school-list.page';
import {LayoutModule} from 'examination/infrastructure';
import {OrganisationLoaderModule} from 'examination/loaders';
import {SchoolHomePage} from './home/school-home.page';
import {OrganisationHttpClientModule} from 'examination/models/http';
import {ControlModule} from 'examination/controls';
import {SchoolPageLayout} from './layout/school.page-layout';
import {DepartmentModule, ExaminationModule, RoomModule} from 'examination/app/components';
import {PlannerModule} from 'examination/app/components/member/planner';
import {MsButtonModule} from '@ms-fluent/button';
import {MsGridModule} from '@ms-fluent/grid';
import {SchoolAddPage} from './add/school-add.page';
import {AuthorizedGuard} from 'examination/app/authorization';
import {MsPivotModule} from '@ms-fluent/pivot';

const routes: Routes = [
  {path: '', component: SchoolListPage},
  {path: 'add', component: SchoolAddPage, canActivate: [AuthorizedGuard]},
  {path: ':schoolId', resolve: [SchoolResolver], component: SchoolPageLayout}
];

@NgModule({
  imports: [CommonModule, SchoolModule, DepartmentModule, OrganisationHttpClientModule,
    OrganisationLoaderModule, RoomModule, ExaminationModule, MsButtonModule, MsGridModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, PlannerModule ],
  declarations: [SchoolListPage, SchoolHomePage, SchoolPageLayout, SchoolAddPage]
})
export class SchoolPageModule {

}
