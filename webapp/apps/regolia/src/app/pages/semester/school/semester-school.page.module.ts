import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {SemesterSchoolHomePage} from "./home/SemesterSchoolHome.page";
import {SemesterSchoolPageLayout} from "./layout/SemesterSchoolPageLayout";
import {LayoutModule} from "../../../../infrastructure";
import {BreadcrumbModule, MsActionMenuModule, MsButtonModule, MsRibbonModule} from "@ms-fluent/components";
import {SemesterAddModule, SemesterListModule} from "@examination/components";
import {MomentModule} from "ngx-moment";

const routes: Routes = [
  {
    path: '', component: SemesterSchoolPageLayout, children: [
      {path: '', component: SemesterSchoolHomePage, data: { label: 'home'}}
    ]
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), LayoutModule, SemesterAddModule,
    SemesterListModule,
    MsRibbonModule, BreadcrumbModule, MsButtonModule, MomentModule, MsActionMenuModule],
  declarations: [ SemesterSchoolHomePage, SemesterSchoolPageLayout]
})
export class SemesterSchoolPageModule {

}
