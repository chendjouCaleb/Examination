import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {YearItemModule} from "examination/app/components/year/item";
import {YearLevelSpecialityList} from "./list/YearLevelSpecialityList";

@NgModule({
    imports: [CommonModule, RouterModule, YearItemModule],
  declarations: [YearLevelSpecialityList ],
  exports: [YearLevelSpecialityList ]
})
export class YearLevelSpecialityModule {

}
