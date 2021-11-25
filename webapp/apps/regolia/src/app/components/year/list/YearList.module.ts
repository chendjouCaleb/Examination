import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearList} from "./YearList";
import {MomentModule} from "ngx-moment";
import {MsBadgeModule} from "src/controls";
import {YearItemModule} from "../item";
import {RouterModule} from "@angular/router";
import {YearDepartmentList} from './year-department-list/YearDepartmentList';
import {YearLevelList} from "./year-level-list/YearLevelList";
import {YearSpecialityList} from "./year-speciality-list/YearSpecialityList";
import {YearLevelSpecialityList} from "./YearLevelSpecialityList/YearLevelSpecialityList";

@NgModule({
  declarations: [ YearList, YearDepartmentList, YearLevelList, YearSpecialityList, YearLevelSpecialityList ],
  exports: [ YearList, YearDepartmentList, YearLevelList, YearSpecialityList, YearLevelSpecialityList ],
  imports: [CommonModule, MomentModule, MsBadgeModule, YearItemModule, RouterModule]
})
export class YearListModule {

}
