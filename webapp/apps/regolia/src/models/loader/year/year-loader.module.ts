import {NgModule} from "@angular/core";
import {YearLoader} from "./year.loader";
import {YearDepartmentLoader} from "./year-department.loader";
import {YearLevelLoader} from "./year-level.loader";
import {YearLevelSpecialityLoader} from "./year-level-speciality.loader";
import {YearSpecialityLoader} from "./year-speciality.loader";
import {YearStudentLoader} from "./year-student.loader";
import {YearTeacherLoader} from "./year-teacher.loader";

@NgModule({
  providers: [ YearLoader, YearDepartmentLoader, YearLevelLoader, YearLevelSpecialityLoader, YearSpecialityLoader,
  YearStudentLoader, YearTeacherLoader ]
})
export class YearLoaderModule {

}
