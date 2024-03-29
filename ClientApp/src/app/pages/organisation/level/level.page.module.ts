import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {LayoutModule} from 'examination/infrastructure';
import {LevelHomePage} from './home/level-home.page';
import {ControlModule} from 'examination/controls';
import {
  ApplicationModule, CourseHourModule,
  CourseModule, CourseSessionModule,
  DepartmentResolver,
  LevelModule,
  LevelResolver,
  RoomModule,
  SchoolResolver,
  StudentModule
} from 'examination/app/components';
import {LevelPageLayout} from './layout/level.page-layout';
import {MatRippleModule} from '@angular/material/core';
import {MsButtonModule, MsContextMenuModule, MsDropdownModule, MsPivotModule} from '@ms-fluent/components';

const routes: Routes = [
  {
    path: ':levelId', resolve: [SchoolResolver, DepartmentResolver, LevelResolver], children: [
      {path: 'home', component: LevelPageLayout},
      {path: '', redirectTo: 'home', pathMatch: 'prefix'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, MsButtonModule, LevelModule, CourseModule, StudentModule, ApplicationModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsContextMenuModule, MsDropdownModule,
    MatRippleModule, RoomModule, MsPivotModule, CourseHourModule, CourseSessionModule],
  declarations: [LevelHomePage, LevelPageLayout]
})
export class LevelPageModule {

}
