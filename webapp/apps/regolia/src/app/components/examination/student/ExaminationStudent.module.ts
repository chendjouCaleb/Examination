import {NgModule} from "@angular/core";
import {MsButtonModule, MsPaginatorModule, MsSpinnerModule, MsTableModule} from "@ms-fluent/components";
import {CommonModule} from "@angular/common";
import {ExaminationStudentList} from "./student-list/examination-student-list";
import {ExaminationStudentDetails} from "./students-details/examination-student-details";
import {ControlModule} from "../../../../controls";
import {RouterModule} from "@angular/router";
import {MomentModule} from "ngx-moment";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, MsTableModule, ControlModule, RouterModule, MomentModule, FormsModule, MsSpinnerModule, MsPaginatorModule, MsButtonModule],
  declarations: [ ExaminationStudentList, ExaminationStudentDetails ],
  exports: [ ExaminationStudentList, ExaminationStudentDetails ]
})
export class ExaminationStudentModule {

}
