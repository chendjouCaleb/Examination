import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {YearLevelCard} from "./card/year-level-card";
import {YearLevelList} from "./year-level-list/YearLevelList";

@NgModule({
  imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule],
  declarations: [ YearLevelCard, YearLevelList ],
  exports: [ YearLevelCard, YearLevelList ],
})
export class YearLevelModule {

}
