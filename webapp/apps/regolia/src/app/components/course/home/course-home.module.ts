import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsDialogModule, MsPivotModule} from "@ms-fluent/components";
import {CourseSessionModule} from "../../course-session";
import {CourseHourModule} from "../../course-hour";
import {CourseHome} from "./course-home";
import {TestListModule} from "../../test/list";
import {CourseHomeService} from "./course-home.service";

@NgModule({
  imports: [CommonModule, MsPivotModule, TestListModule, CourseSessionModule, CourseHourModule, MsButtonModule, MsDialogModule],
  declarations: [ CourseHome ],
  exports: [ CourseHome ],
  providers: [CourseHomeService ]
})
export class CourseHomeModule {

}
