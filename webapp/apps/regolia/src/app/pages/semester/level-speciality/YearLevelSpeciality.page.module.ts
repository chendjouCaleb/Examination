import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearLevelSpecialityHomePage} from "./home/YearLevelSpecialityHome.page";
import {YearLevelSpecialityPageLayout} from "./layout/YearLevelSpecialityPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: YearLevelSpecialityPageLayout, children: [
      {path: '', component: YearLevelSpecialityHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ YearLevelSpecialityHomePage, YearLevelSpecialityPageLayout]
})
export class YearLevelSpecialityPageModule {

}
