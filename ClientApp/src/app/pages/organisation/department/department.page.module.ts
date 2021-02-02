import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DepartmentModule, DepartmentResolver} from 'examination/app/components/department';
import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfMenuModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {DepartmentHomePage} from './home/department-home.page';
import {ControlModule, MsfTabModule, MsPivotModule} from 'examination/controls';
import {CorrectorModule, LevelModule, RoomModule, SchoolResolver, SpecialityModule, StudentModule} from 'examination/app/components';
import {DepartmentLevels} from './levels/department-levels';
import {DepartmentSpecialities} from './specialities/department-specialities';
import {DepartmentPageLayout} from './layout/department.page-layout';
import {SupervisorModule} from 'examination/app/components/member/supervisor';
import {PrincipalModule} from 'examination/app/components/member/principal';
import {SecretaryModule} from 'examination/app/components/member/secretary';

const routes: Routes = [
  {
    path: ':departmentId', component: DepartmentPageLayout, resolve: [SchoolResolver, DepartmentResolver]
  }
];

@NgModule({
  imports: [CommonModule, MsfButtonModule, MsPivotModule, DepartmentModule, LevelModule, SpecialityModule,
    CorrectorModule, SupervisorModule, PrincipalModule, SecretaryModule, StudentModule, RoomModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfTabModule, MsfMenuModule ],
  declarations: [DepartmentPageLayout, DepartmentHomePage, DepartmentLevels, DepartmentSpecialities]
})
export class DepartmentPageModule {

}
