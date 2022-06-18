import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {ExaminationDepartmentCard} from "./card/examination-department-card";
import {RouterModule} from "@angular/router";
import {ExaminationDepartmentList} from "./list/examination-department-list";

@NgModule({
  imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule],
  declarations: [ ExaminationDepartmentCard, ExaminationDepartmentList ],
  exports: [ ExaminationDepartmentCard, ExaminationDepartmentList ],
})
export class ExaminationDepartmentModule {

}
