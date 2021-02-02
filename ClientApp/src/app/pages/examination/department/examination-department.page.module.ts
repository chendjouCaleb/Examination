import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ExaminationModule, TestModule} from "examination/app/components";
import {LayoutModule} from "examination/infrastructure";
import {MsPivotModule} from "examination/controls";
import {ExaminationDepartmentHomePage} from "./home/examination-department-home.page";
import {ExaminationDepartmentPageLayout} from "./layout/examination-department.page-layout";

export const routes: Routes = [
  {path: '', component: ExaminationDepartmentPageLayout}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule,
    MsPivotModule],
  declarations: [ExaminationDepartmentPageLayout, ExaminationDepartmentHomePage,]
})
export class ExaminationDepartmentPageModule {
}
