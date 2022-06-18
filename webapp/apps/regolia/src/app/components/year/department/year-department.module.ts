import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsTooltipModule} from "@ms-fluent/components";
import {YearDepartmentCard} from "./card/year-department-card";
import {YearDepartmentList} from "./list/YearDepartmentList";
import {RouterModule} from "@angular/router";
import {YearItemModule} from "examination/app/components/year/item";

@NgModule({
    imports: [CommonModule, MsButtonModule, RouterModule, MsTooltipModule, YearItemModule],
  declarations: [ YearDepartmentCard, YearDepartmentList ],
  exports: [ YearDepartmentCard, YearDepartmentList ],
})
export class YearDepartmentModule {

}
