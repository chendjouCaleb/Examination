import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearStudentAddAll} from "./AddAll/YearStudentAddAll";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";
import {YearStudentDelete} from "./Delete/YearStudentDelete";

@NgModule({
  imports: [ CommonModule, MsDialogModule, MsButtonModule ],
  declarations: [ YearStudentAddAll, YearStudentDelete ],
  exports: [ YearStudentAddAll, YearStudentDelete ]
})
export class YearStudentModule {

}
