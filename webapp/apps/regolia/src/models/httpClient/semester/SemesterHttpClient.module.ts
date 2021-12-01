import {NgModule} from "@angular/core";
import {SemesterDepartmentHttpClient} from "./SemesterDepartmentHttpClient";
import {SemesterHttpClient} from "./SemesterHttpClient";
import {SemesterLevelHttpClient} from "./SemesterLevelHttpClient";
import {SemesterLevelSpecialityHttpClient} from "./SemesterLevelSpecialityHttpClient";
import {SemesterSpecialityHttpClient} from "./SemesterSpecialityHttpClient";
import {SemesterStudentHttpClient} from "./SemesterStudentHttpClient";
import {SemesterTeacherHttpClient} from "./SemesterTeacherHttpClient";

@NgModule({
  providers: [SemesterDepartmentHttpClient, SemesterHttpClient, SemesterLevelHttpClient,
    SemesterLevelSpecialityHttpClient, SemesterSpecialityHttpClient, SemesterStudentHttpClient,
    SemesterTeacherHttpClient]
})
export class SemesterHttpClientModule {

}
