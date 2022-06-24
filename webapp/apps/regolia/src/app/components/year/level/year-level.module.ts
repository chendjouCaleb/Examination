import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {RouterModule} from "@angular/router";
import {YearLevelCard} from "./card/year-level-card";
import {YearLevelList} from "./year-level-list/YearLevelList";
import {YearItemModule} from "examination/app/components/year/item";

@NgModule({
    imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule, YearItemModule],
  declarations: [ YearLevelCard, YearLevelList ],
  exports: [ YearLevelCard, YearLevelList ],
})
export class YearLevelModule {

}
