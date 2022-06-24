import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ExaminationSpecialityCard} from "./card/examination-speciality-card";
import {ExaminationSpecialityList} from "./list/examination-speciality-list";
import {ExaminationListModule} from "examination/app/components/examination/item";

@NgModule({
    imports: [CommonModule, RouterModule, ExaminationListModule],
  declarations: [ExaminationSpecialityList, ExaminationSpecialityCard ],
  exports: [ExaminationSpecialityList, ExaminationSpecialityCard ]
})
export class ExaminationSpecialityModule {

}
