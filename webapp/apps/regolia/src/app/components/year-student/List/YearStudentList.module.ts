import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsPaginatorModule, MsTableModule} from "@ms-fluent/components";
import {YearStudentList} from "./YearStudentList";
import {RouterModule} from "@angular/router";
import {ControlModule} from "src/controls";

@NgModule({
  imports: [CommonModule, MsTableModule, MsPaginatorModule, RouterModule, MsButtonModule, ControlModule],
  declarations: [ YearStudentList ],
  exports: [ YearStudentList ]
})
export class YearStudentListModule {

}
