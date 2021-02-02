import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfMenuModule, MsfTableModule} from 'fabric-docs';
import {LayoutModule} from 'examination/infrastructure';
import {SpecialityHomePage} from './home/speciality-home.page';
import {ControlModule, MsfTabModule} from 'examination/controls';
import {CourseModule, DepartmentResolver, SpecialityModule, SpecialityResolver, SchoolResolver} from 'examination/app/components';
import {SpecialityPageLayout} from "./layout/speciality.page-layout";
import {SpecialityCoursesPage} from "./courses/speciality-courses.page";

const routes: Routes = [
  {
    path: ':specialityId', resolve: [SchoolResolver, DepartmentResolver, SpecialityResolver], children: [
      {path: 'home', component: SpecialityHomePage},
      {path: 'courses', component: SpecialityCoursesPage},
      {path: '', redirectTo: 'home', pathMatch: 'prefix'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, MsfButtonModule, SpecialityModule, CourseModule,
    RouterModule.forChild(routes), LayoutModule, ControlModule, MsfMenuModule, MsfTabModule, MsfTableModule],
  declarations: [SpecialityHomePage, SpecialityCoursesPage, SpecialityPageLayout ]
})
export class SpecialityPageModule {

}
