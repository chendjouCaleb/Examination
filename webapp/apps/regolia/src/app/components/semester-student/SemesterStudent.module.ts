import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SemesterStudentAddAll} from "./AddAll/SemesterStudentAddAll";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";
import {SemesterStudentDelete} from "./Delete/SemesterStudentDelete";
import {SemesterStudentAddAllDepartment} from "./AddAll/SemesterStudentAddAllDepartment";
import {SemesterStudentAddAllLevel} from "./AddAll/SemesterStudentAddAllLevel";
import {SemesterStudentResolver} from "./semester-student.resolver";

@NgModule({
  imports: [ CommonModule, MsDialogModule, MsButtonModule ],
  declarations: [ SemesterStudentAddAll, SemesterStudentAddAllLevel, SemesterStudentAddAllDepartment, SemesterStudentDelete ],
  exports: [ SemesterStudentAddAll, SemesterStudentAddAllLevel, SemesterStudentAddAllDepartment, SemesterStudentDelete ],

  providers: [ SemesterStudentResolver ]
})
export class SemesterStudentModule {

}
