import {NgModule} from "@angular/core";
import {SemesterTeacherService} from "./SemesterTeacher.service";
import {SemesterTeacherDelete} from "./Delete/SemesterTeacherDelete";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";
import { SemesterTeacherAdd } from "./Add/SemesterTeacherAdd";
import {SemesterDepartmentTeacherAdd} from "./Add/SemesterDepartmentTeacherAdd";

@NgModule({
  providers: [SemesterTeacherService],
  imports: [
    MsButtonModule,
    MsDialogModule
  ],
  declarations: [SemesterTeacherDelete, SemesterTeacherAdd, SemesterDepartmentTeacherAdd]
})
export class SemesterTeacherModule {

}
