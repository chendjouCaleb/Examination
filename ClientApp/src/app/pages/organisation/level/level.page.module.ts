import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfMenuModule, MsfTableModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {LevelHomePage} from './home/level-home.page';
import {ControlModule, MsfTabModule, MsPivotModule} from 'examination/controls';
import {
  ApplicationModule,
  CourseModule,
  DepartmentResolver,
  LevelModule,
  LevelResolver,
  RoomModule,
  SchoolResolver,
  StudentModule
} from 'examination/app/components';
import {LevelPageLayout} from './layout/level.page-layout';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {
    path: ':levelId', resolve: [SchoolResolver, DepartmentResolver, LevelResolver], children: [
      {path: 'home', component: LevelPageLayout},
      {path: '', redirectTo: 'home', pathMatch: 'prefix'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, MsfButtonModule, LevelModule, CourseModule, StudentModule, ApplicationModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule, MsfTabModule, MsfTableModule,
    MatRippleModule, RoomModule, MsPivotModule],
  declarations: [LevelHomePage, LevelPageLayout]
})
export class LevelPageModule {

}
