import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearItem} from "./YearItem";
import {MomentModule} from "ngx-moment";
import {MsBadgeModule} from "src/controls";

@NgModule({
  imports: [CommonModule, MomentModule, MsBadgeModule],
  declarations: [ YearItem ],
  exports: [ YearItem ]
})
export class YearItemModule {

}
