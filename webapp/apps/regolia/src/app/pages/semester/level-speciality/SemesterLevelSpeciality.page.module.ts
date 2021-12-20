import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterLevelSpecialityHomePage} from "./home/SemesterLevelSpecialityHome.page";
import {SemesterLevelSpecialityPageLayout} from "./layout/SemesterLevelSpecialityPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsActionMenuModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterLevelSpecialityStudentsPage} from "./SemesterLevelSpecialityStudents.page";
import {SemesterStudentListModule} from "../../../components/semester-student/List";

const routes: Routes = [
  {
    path: '', component: SemesterLevelSpecialityPageLayout,  children: [
      {path: '', component: SemesterLevelSpecialityHomePage, data: {label: 'home'}},
      {path: 'students', component: SemesterLevelSpecialityStudentsPage, data: {label: 'students'} },
      {path: 'home', redirectTo: '', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule, SemesterStudentListModule, MsActionMenuModule],
  declarations: [ SemesterLevelSpecialityHomePage, SemesterLevelSpecialityStudentsPage, SemesterLevelSpecialityPageLayout]
})
export class SemesterLevelSpecialityPageModule {

}
