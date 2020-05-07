import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule} from "fabric-docs";
import {LabelledIcon} from "./labelled/labelled-icon";
import {Labelled} from "./labelled/labelled";
import {FloatButton} from "./float-button/float-button";
import {AlertEmitter} from "./alert-emitter";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {MatDialogModule} from "@angular/material/dialog";
import {Confirmation} from "./confirmation/confirmation";

@NgModule({
  imports: [CommonModule, MatDialogModule, MsfButtonModule],
  providers: [AlertEmitter, Confirmation],
  declarations: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent],
  exports: [LabelledIcon, Labelled, FloatButton, ConfirmationComponent],
})
export class ControlModule {

}
