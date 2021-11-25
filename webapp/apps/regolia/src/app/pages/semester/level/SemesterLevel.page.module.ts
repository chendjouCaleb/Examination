import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterLevelHomePage} from "./home/SemesterLevelHome.page";
import {SemesterLevelPageLayout} from "./layout/SemesterLevelPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: SemesterLevelPageLayout, children: [
      {path: '', component: SemesterLevelHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ SemesterLevelHomePage, SemesterLevelPageLayout]
})
export class SemesterLevelPageModule {

}
