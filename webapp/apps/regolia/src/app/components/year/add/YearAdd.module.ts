import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {YearDate} from "./date/YearDate";
import {MsButtonModule, MsCleaveModule, MsDialogModule, MsFormFieldModule, MsLabelModule} from "@ms-fluent/components";
import {YearAddService} from "./YearAdd.service";
import {ReactiveFormsModule} from "@angular/forms";
import {AppFormModule} from "src/controls";
import {YearAdd} from "./YearAdd";

@NgModule({
  imports: [CommonModule, MsDialogModule, MsButtonModule, MsFormFieldModule, MsCleaveModule, ReactiveFormsModule,
    AppFormModule, MsLabelModule],
  declarations: [ YearDate, YearAdd ],
  providers: [ YearAddService]
})
export class YearAddModule {

}
