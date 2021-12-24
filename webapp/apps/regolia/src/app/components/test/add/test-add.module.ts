import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {
  MsButtonModule,
  MsCheckboxModule, MsCleaveModule, MsDialogModule,
  MsFormFieldModule,
  MsLabelModule,
  MsSelectModule
} from "@ms-fluent/components";
import {TestAdd} from "./test-add";
import {TestAddService} from "./test-add.service";
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "../../../../controls";

@NgModule({
  imports: [CommonModule, MsButtonModule, MsSelectModule, MsFormFieldModule, ReactiveFormsModule, AppFormModule, MsCheckboxModule, MsLabelModule, MsDialogModule, MsCleaveModule],
  declarations: [ TestAdd ],
  exports: [ TestAdd ],
  providers: [ TestAddService ]
})
export class TestAddModule {

}
