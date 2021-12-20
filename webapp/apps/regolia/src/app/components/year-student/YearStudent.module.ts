import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearStudentAddAll} from "./AddAll/YearStudentAddAll";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";
import {YearStudentDelete} from "./Delete/YearStudentDelete";
import {YearStudentAddAllDepartment} from "./AddAll/YearStudentAddAllDepartment";
import {YearStudentAddAllLevel} from "./AddAll/YearStudentAddAllLevel";

@NgModule({
  imports: [ CommonModule, MsDialogModule, MsButtonModule ],
  declarations: [ YearStudentAddAll, YearStudentAddAllLevel, YearStudentAddAllDepartment, YearStudentDelete ],
  exports: [ YearStudentAddAll, YearStudentAddAllLevel, YearStudentAddAllDepartment, YearStudentDelete ]
})
export class YearStudentModule {

}
