import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule} from "fabric-docs";
import {LabelledIcon} from "./labelled/labelled-icon";
import {Labelled} from "./labelled/labelled";
import {FloatButton} from "./float-button/float-button";
import {ControlErrorComponent} from "./form/control.error.component";
import {AlertEmitter} from "./alert-emitter";

@NgModule({
  imports: [ CommonModule, MsfButtonModule],
  providers: [ AlertEmitter ],
  declarations: [ LabelledIcon, Labelled, FloatButton, ControlErrorComponent ],
  exports: [ LabelledIcon, Labelled, FloatButton, ControlErrorComponent ],
})
export class ControlModule {

}
