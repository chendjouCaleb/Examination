import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterDepartmentHomePage} from "./home/SemesterDepartmentHome.page";
import {SemesterDepartmentPageLayout} from "./layout/SemesterDepartmentPageLayout";
import {LayoutModule} from "@examination/infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: SemesterDepartmentPageLayout, children: [
      {path: '', component: SemesterDepartmentHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ SemesterDepartmentHomePage, SemesterDepartmentPageLayout]
})
export class SemesterDepartmentPageModule {

}
