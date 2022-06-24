import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ExaminationListModule} from "examination/app/components/examination/item";
import {ExaminationLevelSpecialityCard} from "./card/examination-level-speciality-card";
import {ExaminationLevelSpecialityList} from "./list/examination-level-speciality-list";

@NgModule({
    imports: [CommonModule, RouterModule, ExaminationListModule],
  declarations: [ExaminationLevelSpecialityList, ExaminationLevelSpecialityCard ],
  exports: [ExaminationLevelSpecialityList, ExaminationLevelSpecialityCard ]
})
export class ExaminationLevelSpecialityModule {

}
