import {NgModule} from "@angular/core";
import {TeacherList} from "./teacher-list";
import {MsButtonModule, MsSpinnerModule, MsTableModule} from "@ms-fluent/components";
import {CommonModule} from "@angular/common";
import {ControlModule} from "src/controls";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [TeacherList],
  imports: [
    MsTableModule, CommonModule, MsSpinnerModule, ControlModule, MsButtonModule, RouterModule
  ],
  exports: [TeacherList]
})
export class TeacherListModule {

}
