import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearList} from "./YearList";
import {MomentModule} from "ngx-moment";
import {MsBadgeModule} from "src/controls";
import {YearItemModule} from "../item";
import {RouterModule} from "@angular/router";
import {YearLevelSpecialityList} from "./YearLevelSpecialityList/YearLevelSpecialityList";

@NgModule({
  declarations: [ YearList, YearLevelSpecialityList ],
  exports: [ YearList, YearLevelSpecialityList ],
  imports: [CommonModule, MomentModule, MsBadgeModule, YearItemModule, RouterModule]
})
export class YearListModule {

}
