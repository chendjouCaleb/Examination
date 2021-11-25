import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {YearLevelHomePage} from "./home/YearLevelHome.page";
import {YearLevelPageLayout} from "./layout/YearLevelPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: YearLevelPageLayout, children: [
      {path: '', component: YearLevelHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ YearLevelHomePage, YearLevelPageLayout]
})
export class YearLevelPageModule {

}
