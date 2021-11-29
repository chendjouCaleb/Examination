import {NgModule} from "@angular/core";
import {YearDepartmentHttpClient} from "./YearDepartmentHttpClient";
import {YearHttpClient} from "./YearHttpClient";
import {YearLevelHttpClient} from "./YearLevelHttpClient";
import {YearLevelSpecialityHttpClient} from "./YearLevelSpecialityHttpClient";
import {YearSpecialityHttpClient} from "./YearSpecialityHttpClient";
import {YearStudentHttpClient} from "./YearStudentHttpClient";
import {YearTeacherHttpClient} from "./YearTeacherHttpClient";

@NgModule({
  providers: [ YearDepartmentHttpClient, YearHttpClient, YearLevelHttpClient,
    YearLevelSpecialityHttpClient, YearSpecialityHttpClient,
    YearTeacherHttpClient, YearStudentHttpClient]
})
export class YearHttpClientModule {

}
