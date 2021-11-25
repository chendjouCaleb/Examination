import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearDepartmentHomePage} from "./home/YearDepartmentHome.page";
import {YearDepartmentPageLayout} from "./layout/YearDepartmentPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: YearDepartmentPageLayout, children: [
      {path: '', component: YearDepartmentHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ YearDepartmentHomePage, YearDepartmentPageLayout]
})
export class YearDepartmentPageModule {

}
