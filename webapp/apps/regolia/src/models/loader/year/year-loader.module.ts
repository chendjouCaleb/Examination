import {NgModule} from "@angular/core";
import {YearLoader} from "./year.loader";
import {YearDepartmentLoader} from "./year-department.loader";
import {YearLevelLoader} from "./year-level.loader";
import {YearLevelSpecialityLoader} from "./year-level-speciality.loader";
import {YearSpecialityLoader} from "./year-speciality.loader";

@NgModule({
  providers: [ YearLoader, YearDepartmentLoader, YearLevelLoader, YearLevelSpecialityLoader, YearSpecialityLoader ]
})
export class YearLoaderModule {

}
