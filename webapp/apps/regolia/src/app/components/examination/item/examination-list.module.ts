import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ControlModule, MsBadgeModule} from "src/controls";
import {MomentModule} from "ngx-moment";
import {ExaminationItem} from "./examination-item";

@NgModule({
  imports: [CommonModule, RouterModule, ControlModule, MsBadgeModule, MomentModule,],
  declarations: [ExaminationItem],
  exports: [ExaminationItem]
})
export class ExaminationListModule {

}
