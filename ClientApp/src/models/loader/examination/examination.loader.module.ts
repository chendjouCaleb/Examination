import {NgModule} from "@angular/core";
import {ExaminationDepartmentLoader} from "./examination-department.loader";
import {ExaminationLevelLoader} from "./examination-level.loader";
import {ExaminationSpecialityLoader} from "./examination-speciality.loader";
import {ExaminationLevelSpecialityLoader} from "./examination-level-speciality.loader";
import {ExaminationStudentLoader} from "./examination-student.loader";
import {ExaminationHttpClientModule} from "examination/models/http";

@NgModule({
  imports: [ ExaminationHttpClientModule],
  providers: [ExaminationLoaderModule, ExaminationDepartmentLoader, ExaminationLevelLoader, ExaminationSpecialityLoader,
    ExaminationLevelSpecialityLoader, ExaminationStudentLoader]
})
export class ExaminationLoaderModule {

}
