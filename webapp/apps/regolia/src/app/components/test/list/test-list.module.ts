import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsCommonModule, MsSpinnerModule, MsTableModule} from "@ms-fluent/components";
import {TestList} from "./test-list";
import {MomentModule} from "ngx-moment";
import {ControlModule} from "src/controls";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [CommonModule, MsTableModule, MsButtonModule, MsSpinnerModule, MsCommonModule, MomentModule, ControlModule, RouterModule],
  declarations: [ TestList ],
  exports: [ TestList ]
})
export class TestListModule {

}
