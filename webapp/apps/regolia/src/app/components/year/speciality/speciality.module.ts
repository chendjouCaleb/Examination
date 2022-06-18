import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearSpecialityList} from "./list/YearSpecialityList";
import {RouterModule} from "@angular/router";
import {YearSpecialityCard} from "./card/year-speciality-card";

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [YearSpecialityList, YearSpecialityCard ],
  exports: [YearSpecialityList, YearSpecialityCard ]
})
export class YearSpecialityModule {

}
