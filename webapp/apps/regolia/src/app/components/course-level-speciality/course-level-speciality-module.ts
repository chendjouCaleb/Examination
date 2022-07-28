import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CourseLevelSpecialityList} from "./list/course-level-speciality-list";
import {MsActionMenuModule, MsCommonModule, MsSpinnerModule, MsTableModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {ControlModule} from "src/controls";

@NgModule({
    imports: [CommonModule, MsTableModule, MsActionMenuModule, RouterModule, MsSpinnerModule, MsCommonModule, ControlModule],
  declarations: [CourseLevelSpecialityList],
  exports: [CourseLevelSpecialityList]
})
export class CourseLevelSpecialityModule {

}
