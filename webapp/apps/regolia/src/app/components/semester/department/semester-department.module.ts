import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {SemesterDepartmentCard} from "./card/semester-department-card";
import {RouterModule} from "@angular/router";
import {SemesterDepartmentList} from "./list/semester-department-list";

@NgModule({
  imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule],
  declarations: [ SemesterDepartmentCard, SemesterDepartmentList ],
  exports: [ SemesterDepartmentCard, SemesterDepartmentList ],
})
export class SemesterDepartmentModule {

}
