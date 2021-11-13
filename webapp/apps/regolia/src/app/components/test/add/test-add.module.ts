import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsFormFieldModule, MsSelectModule} from "@ms-fluent/components";
import {TestAdd} from "./test-add";
import {TestAddService} from "./test-add.service";

@NgModule({
  imports: [ CommonModule, MsButtonModule, MsSelectModule, MsFormFieldModule ],
  declarations: [ TestAdd ],
  exports: [ TestAdd ],
  providers: [ TestAddService ]
})
export class TestAddModule {

}
