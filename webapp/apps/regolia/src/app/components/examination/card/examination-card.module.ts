import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MomentModule} from "ngx-moment";
import {MsBadgeModule} from "src/controls";
import {ExaminationCard} from "./examination-card";

@NgModule({
  imports: [CommonModule, MomentModule, MsBadgeModule],
  declarations: [ExaminationCard],
  exports: [ExaminationCard]
})
export class ExaminationCardModule {

}
