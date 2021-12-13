import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsContextMenuModule, MsDropdownModule, MsTableModule} from "@ms-fluent/components";
import {SemesterCourseTeacherList} from "./SemesterCourseTeacherList";
import {RouterModule} from "@angular/router";
import {ControlModule} from "src/controls";

@NgModule({
  imports: [CommonModule, MsTableModule, MsButtonModule, MsDropdownModule, MsContextMenuModule, RouterModule, ControlModule],
  declarations: [ SemesterCourseTeacherList ],
  exports: [ SemesterCourseTeacherList ]
})
export class SemesterCourseTeacherListModule {

}
