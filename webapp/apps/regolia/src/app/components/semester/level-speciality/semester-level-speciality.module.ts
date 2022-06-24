import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {SemesterItemModule} from "examination/app/components/semester/item";
import {SemesterLevelSpecialityList} from "./list/semester-level-speciality-list";
import {SemesterLevelSpecialityCard} from "./card/semester-level-speciality-card";

@NgModule({
    imports: [CommonModule, RouterModule, SemesterItemModule],
  declarations: [SemesterLevelSpecialityList, SemesterLevelSpecialityCard ],
  exports: [SemesterLevelSpecialityList, SemesterLevelSpecialityCard ]
})
export class SemesterLevelSpecialityModule {

}
