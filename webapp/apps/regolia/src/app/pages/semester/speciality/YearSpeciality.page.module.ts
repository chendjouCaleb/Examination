import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearSpecialityHomePage} from "./home/YearSpecialityHome.page";
import {YearSpecialityPageLayout} from "./layout/YearSpecialityPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: YearSpecialityPageLayout, children: [
      {path: '', component: YearSpecialityHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ YearSpecialityHomePage, YearSpecialityPageLayout]
})
export class YearSpecialityPageModule {

}
