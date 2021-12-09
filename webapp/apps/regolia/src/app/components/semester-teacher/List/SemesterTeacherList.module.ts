import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsPaginatorModule, MsTableModule} from "@ms-fluent/components";
import {SemesterTeacherList} from "./SemesterTeacherList";
import {RouterModule} from "@angular/router";
import {ControlModule} from "src/controls";

@NgModule({
  imports: [CommonModule, MsTableModule, MsPaginatorModule, RouterModule, MsButtonModule, ControlModule],
  declarations: [ SemesterTeacherList ],
  exports: [ SemesterTeacherList ]
})
export class SemesterTeacherListModule {

}
