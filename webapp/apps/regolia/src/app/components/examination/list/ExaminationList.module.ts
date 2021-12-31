import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SemesterExaminationList} from "./SemesterExaminationList";
import {MsButtonModule, MsSpinnerModule, MsTableModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {ControlModule, MsBadgeModule} from "src/controls";
import {ExaminationDepartmentList} from "./ExaminationDepartmentList";
import {ExaminationListItem} from "./ExaminationListItem";
import {MomentModule} from "ngx-moment";

@NgModule({
  imports: [CommonModule, MsTableModule, MsSpinnerModule, RouterModule, ControlModule, MsButtonModule, MsBadgeModule, MomentModule],
  declarations: [ SemesterExaminationList, ExaminationListItem, ExaminationDepartmentList ],
  exports: [ SemesterExaminationList ]
})
export class ExaminationListModule {

}
