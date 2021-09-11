import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {DepartmentModule, DepartmentResolver} from 'examination/app/components/department';
import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {DepartmentHomePage} from './home/department-home.page';
import {ControlModule} from 'examination/controls';
import {
  ApplicationModule,
  CorrectorModule,
  LevelModule,
  RoomModule,
  SchoolResolver,
  SpecialityModule,
  StudentModule, TeacherModule
} from 'examination/app/components';
import {DepartmentLevels} from './levels/department-levels';
import {DepartmentSpecialities} from './specialities/department-specialities';
import {DepartmentPageLayout} from './layout/department.page-layout';
import {SupervisorModule} from 'examination/app/components/member/supervisor';
import {PrincipalModule} from 'examination/app/components/member/principal';
import {SecretaryModule} from 'examination/app/components/member/secretary';
import {MsButtonModule, MsContextMenuModule, MsPivotModule} from '@ms-fluent/components';

const routes: Routes = [
  {
    path: ':departmentId', component: DepartmentPageLayout, resolve: [SchoolResolver, DepartmentResolver]
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsPivotModule, DepartmentModule, LevelModule, SpecialityModule,
    ApplicationModule, TeacherModule,
    CorrectorModule, SupervisorModule, PrincipalModule, SecretaryModule, StudentModule, RoomModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsContextMenuModule ],
  declarations: [DepartmentPageLayout, DepartmentHomePage, DepartmentLevels, DepartmentSpecialities]
})
export class DepartmentPageModule {

}
