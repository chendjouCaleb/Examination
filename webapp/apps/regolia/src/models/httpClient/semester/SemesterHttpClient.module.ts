import {NgModule} from "@angular/core";
import {SemesterDepartmentHttpClient} from "./SemesterDepartmentHttpClient";
import {SemesterHttpClient} from "./SemesterHttpClient";
import {SemesterLevelHttpClient} from "./SemesterLevelHttpClient";
import {SemesterLevelSpecialityHttpClient} from "./SemesterLevelSpecialityHttpClient";
import {SemesterSpecialityHttpClient} from "./SemesterSpecialityHttpClient";

@NgModule({
  providers: [ SemesterDepartmentHttpClient, SemesterHttpClient, SemesterLevelHttpClient,
    SemesterLevelSpecialityHttpClient, SemesterSpecialityHttpClient]
})
export class SemesterHttpClientModule {

}
