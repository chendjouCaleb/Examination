import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsStateBadge} from "./state-badge";

@NgModule({
  imports: [ CommonModule ],
  declarations: [ MsStateBadge ],
  exports: [ MsStateBadge ]
})
export class MsBadgeModule {

}
