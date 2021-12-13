import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTableModule} from "@ms-fluent/components";
import {SemesterCourseList} from "./SemesterCourseList";
import {ControlModule} from "src/controls";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, MsTableModule, ControlModule, MsButtonModule, RouterModule],
  declarations: [ SemesterCourseList ],
  exports: [ SemesterCourseList ]
})
export class SemesterCourseListModule {

}
