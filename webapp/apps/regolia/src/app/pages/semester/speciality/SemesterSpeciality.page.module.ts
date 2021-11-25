import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterSpecialityHomePage} from "./home/SemesterSpecialityHome.page";
import {SemesterSpecialityPageLayout} from "./layout/SemesterSpecialityPageLayout";
import {LayoutModule} from "examination/infrastructure";
import {MsRibbonModule} from "@ms-fluent/components";

const routes: Routes = [
  {
    path: '', component: SemesterSpecialityPageLayout, children: [
      {path: '', component: SemesterSpecialityHomePage}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, MsRibbonModule],
  declarations: [ SemesterSpecialityHomePage, SemesterSpecialityPageLayout]
})
export class SemesterSpecialityPageModule {

}
