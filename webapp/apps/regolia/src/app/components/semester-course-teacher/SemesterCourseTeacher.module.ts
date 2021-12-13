import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsCheckboxModule, MsDialogModule, MsLabelModule, MsSelectModule} from "@ms-fluent/components";
import {SemesterCourseTeacherAdd} from "./add/SemesterCourseTeacherAdd";
import {ReactiveFormsModule} from "@angular/forms";
import {SemesterCourseTeacherDelete} from "./Delete/SemesterCourseTeacherDelete";
import {DeleteTutorialRole} from "./DeleteTutorialRole/DeleteTutorialRole";
import {AddTutorialRole} from "./AddTutorialRole/AddTutorialRole";
import {DeleteLectureRole} from "./DeleteLectureRole/DeleteLectureRole";
import {AddLectureRole} from "./AddLectureRole/AddLectureRole";
import {SemesterCourseTeacherPrincipal} from "./Principal/SemesterCourseTeacherPrincipal";

@NgModule({
  imports: [CommonModule, MsCheckboxModule, MsDialogModule, MsSelectModule, MsLabelModule,
    ReactiveFormsModule, MsButtonModule],
  declarations: [ SemesterCourseTeacherAdd, SemesterCourseTeacherDelete, DeleteTutorialRole,
    AddTutorialRole, DeleteLectureRole, AddLectureRole, SemesterCourseTeacherPrincipal ]
})
export class SemesterCourseTeacherModule {

}
