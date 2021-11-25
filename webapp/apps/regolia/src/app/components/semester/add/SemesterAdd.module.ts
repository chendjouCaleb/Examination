import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SemesterAdd} from "./SemesterAdd";
import {MsButtonModule, MsCleaveModule, MsDialogModule, MsFormFieldModule, MsLabelModule} from "@ms-fluent/components";
import {SemesterAddService} from "./SemesterAdd.service";
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "src/controls";

@NgModule({
  imports: [CommonModule, MsDialogModule, MsButtonModule, MsFormFieldModule, MsCleaveModule, ReactiveFormsModule,
    AppFormModule, MsLabelModule],
  declarations: [ SemesterAdd ],
  providers: [ SemesterAddService]
})
export class SemesterAddModule {

}
