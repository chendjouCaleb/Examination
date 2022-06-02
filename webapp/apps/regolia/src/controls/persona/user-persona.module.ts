import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsPersonaModule} from "@ms-fluent/components";
import {UserPersona} from "./user-persona";

@NgModule({
  imports: [ CommonModule, MsPersonaModule],
  declarations: [ UserPersona ],
  exports: [ UserPersona ]
})
export class UserPersonaModule {

}
