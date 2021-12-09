import {NgModule} from "@angular/core";
import {YearTeacherService} from "./YearTeacher.service";
import {YearTeacherDelete} from "./Delete/YearTeacherDelete";
import {MsButtonModule, MsDialogModule} from "@ms-fluent/components";

@NgModule({
  providers: [YearTeacherService],
  imports: [
    MsButtonModule,
    MsDialogModule
  ],
  declarations: [YearTeacherDelete]
})
export class YearTeacherModule {

}
