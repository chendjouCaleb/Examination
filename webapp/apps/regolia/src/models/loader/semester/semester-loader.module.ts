import {NgModule} from "@angular/core";
import {SemesterLoader} from "./semester.loader";
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {SemesterLevelLoader} from "./semester-level.loader";
import {SemesterLevelSpecialityLoader} from "./semester-level-speciality.loader";
import {SemesterSpecialityLoader} from "./semester-speciality.loader";

@NgModule({
  providers: [ SemesterLoader, SemesterDepartmentLoader, SemesterLevelLoader, SemesterLevelSpecialityLoader, SemesterSpecialityLoader ]
})
export class SemesterLoaderModule {

}
