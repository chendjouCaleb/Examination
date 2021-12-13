import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";
import {SemesterCourseAdd} from "./Add/SemesterCourseAdd";
import {SemesterLevelCourseAdd} from "./Add/SemesterLevelCourseAdd";
import {SemesterCourseService} from "./SemesterCourse.service";
import {SemesterDepartmentCourseAdd} from "./Add/SemesterDepartmentCourseAdd";
import { SemesterCourseDelete } from "./Delete/SemesterCourseDelete";

@NgModule({
  imports: [ CommonModule, MsDialogModule, MsButtonModule ],
  declarations: [ SemesterCourseAdd, SemesterLevelCourseAdd, SemesterDepartmentCourseAdd, SemesterCourseDelete ],
  providers: [ SemesterCourseService ]
})
export class SemesterCourseModule {

}
