import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsButtonModule, MsFormFieldModule, MsSelectModule} from "@ms-fluent/components";
import {TestAdd} from "./test-add";
import {TestAddService} from "./test-add.service";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule, MsButtonModule, MsSelectModule, MsFormFieldModule, ReactiveFormsModule],
  declarations: [ TestAdd ],
  exports: [ TestAdd ],
  providers: [ TestAddService ]
})
export class TestAddModule {

}
