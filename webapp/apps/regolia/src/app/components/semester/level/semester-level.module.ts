import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {SemesterLevelCard} from "./card/semester-level-card";
import {SemesterLevelList} from "./list/semester-level-list";

@NgModule({
  imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule],
  declarations: [ SemesterLevelCard, SemesterLevelList ],
  exports: [ SemesterLevelCard, SemesterLevelList ],
})
export class SemesterLevelModule {

}
