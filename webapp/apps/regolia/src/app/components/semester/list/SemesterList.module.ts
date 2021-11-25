import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SemesterList} from "./SemesterList";
import {MomentModule} from "ngx-moment";
import {MsBadgeModule} from "src/controls";
import {SemesterItemModule} from "../item";
import {RouterModule} from "@angular/router";
import {SemesterDepartmentList} from './SemesterDepartmentList/SemesterDepartmentList';
import {SemesterLevelList} from "./SemesterLevelList/SemesterLevelList";
import {SemesterSpecialityList} from "./SemesterSpecialityList/SemesterSpecialityList";
import {SemesterLevelSpecialityList} from "./SemesterLevelSpecialityList/SemesterLevelSpecialityList";

@NgModule({
  declarations: [ SemesterList, SemesterDepartmentList, SemesterLevelList, SemesterSpecialityList, SemesterLevelSpecialityList ],
  exports: [ SemesterList, SemesterDepartmentList, SemesterLevelList, SemesterSpecialityList, SemesterLevelSpecialityList ],
  imports: [CommonModule, MomentModule, MsBadgeModule, SemesterItemModule, RouterModule]
})
export class SemesterListModule {

}
