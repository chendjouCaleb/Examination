import {NgModule} from "@angular/core";
import {YearDepartmentHttpClient} from "./YearDepartmentHttpClient";
import {YearHttpClient} from "./YearHttpClient";
import {YearLevelHttpClient} from "./YearLevelHttpClient";
import {YearLevelSpecialityHttpClient} from "./YearLevelSpecialityHttpClient";
import {YearSpecialityHttpClient} from "./YearSpecialityHttpClient";

@NgModule({
  providers: [ YearDepartmentHttpClient, YearHttpClient, YearLevelHttpClient,
    YearLevelSpecialityHttpClient, YearSpecialityHttpClient]
})
export class YearHttpClientModule {

}
