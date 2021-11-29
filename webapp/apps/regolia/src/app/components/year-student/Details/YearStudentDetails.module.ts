import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsActionMenuModule, MsPivotModule} from "@ms-fluent/components";
import {YearStudentDetails} from "./YearStudentDetails";

@NgModule({
  imports: [ CommonModule, MsPivotModule, MsActionMenuModule ],
  declarations: [ YearStudentDetails ],
  exports: [ YearStudentDetails ]
})
export class YearStudentDetailsModule {

}
