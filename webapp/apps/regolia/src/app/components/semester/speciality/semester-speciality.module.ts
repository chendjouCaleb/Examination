import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SemesterSpecialityCard} from "./card/semester-speciality-card";
import {SemesterSpecialityList} from "./list/semester-speciality-list";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SemesterSpecialityList, SemesterSpecialityCard ],
  exports: [SemesterSpecialityList, SemesterSpecialityCard ]
})
export class SemesterSpecialityModule {

}
