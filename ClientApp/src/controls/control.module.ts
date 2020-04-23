import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule} from "fabric-docs";
import {LabelledIcon} from "./labelled/labelled-icon";
import {Labelled} from "./labelled/labelled";
import {FloatButton} from "./float-button/float-button";
import {ControlErrorComponent} from "./form/control.error.component";
import {AlertEmitter} from "./alert-emitter";
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {MatDialogModule} from "@angular/material/dialog";
import {Confirmation} from "./confirmation/confirmation";

@NgModule({
  imports: [ CommonModule, MatDialogModule, MsfButtonModule],
  providers: [ AlertEmitter, Confirmation ],
  declarations: [ LabelledIcon, Labelled, FloatButton, ControlErrorComponent, ConfirmationComponent ],
  exports: [ LabelledIcon, Labelled, FloatButton, ControlErrorComponent, ConfirmationComponent ],
})
export class ControlModule {

}
