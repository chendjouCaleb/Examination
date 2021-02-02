import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ExaminationModule, TestModule} from "examination/app/components";
import {LayoutModule} from "examination/infrastructure";
import {MsPivotModule} from "examination/controls";
import {ExaminationSpecialityHomePage} from "./home/examination-speciality-home.page";
import {ExaminationSpecialityPageLayout} from "./layout/examination-speciality.page-layout";

export const routes: Routes = [
  {path: '', component: ExaminationSpecialityPageLayout }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ExaminationModule, TestModule, LayoutModule, MsPivotModule],
  declarations: [ExaminationSpecialityPageLayout, ExaminationSpecialityHomePage ]
})
export class ExaminationSpecialityPageModule {
}
