import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SemesterItem} from "./SemesterItem";
import {MomentModule} from "ngx-moment";
import {MsBadgeModule} from "src/controls";

@NgModule({
  imports: [CommonModule, MomentModule, MsBadgeModule],
  declarations: [ SemesterItem ],
  exports: [ SemesterItem ]
})
export class SemesterItemModule {

}
