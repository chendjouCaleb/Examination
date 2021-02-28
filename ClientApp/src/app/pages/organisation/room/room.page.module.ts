import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfMenuModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {ControlModule} from 'examination/controls';
import {
  CourseModule,
  DepartmentResolver,
  ExaminationModule,
  SchoolResolver,
  SpecialityModule,
  RoomModule, CourseHourModule, CourseSessionModule
} from 'examination/app/components';
import {MsButtonModule} from '@ms-fluent/button';
import {MsPivotModule} from '@ms-fluent/pivot';
import {RoomPageLayout} from './layout/room.page-layout';
import {RoomHomePage} from './home/room-home.page';
import {MomentModule} from 'ngx-moment';
import {MsTableModule} from '@ms-fluent/table';

const routes: Routes = [
  { path: ':roomId', resolve: [SchoolResolver], component: RoomPageLayout }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, MsTableModule, SpecialityModule, CourseModule, ExaminationModule,
    RoomModule, MsPivotModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule, MomentModule, CourseHourModule,
  CourseSessionModule],
  declarations: [RoomPageLayout, RoomHomePage]
})
export class RoomPageModule {

}
