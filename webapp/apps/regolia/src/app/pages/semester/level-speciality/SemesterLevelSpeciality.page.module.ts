import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterLevelSpecialityHomePage} from "./home/SemesterLevelSpecialityHome.page";
import {SemesterLevelSpecialityPageLayout} from "./layout/SemesterLevelSpecialityPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: SemesterLevelSpecialityPageLayout, children: [
      {path: '', component: SemesterLevelSpecialityHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ SemesterLevelSpecialityHomePage, SemesterLevelSpecialityPageLayout]
})
export class SemesterLevelSpecialityPageModule {

}
