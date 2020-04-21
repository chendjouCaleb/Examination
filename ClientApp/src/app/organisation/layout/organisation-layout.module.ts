import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule, MsfIconModule, MsfPersonaModule} from "fabric-docs";
import {ControlModule} from "../../../controls/control.module";
import {OrganisationList} from "./list/organisation-list";
import {RouterModule} from "@angular/router";

@NgModule({
  imports: [ CommonModule, RouterModule, ControlModule, MsfButtonModule, MsfIconModule, MsfPersonaModule],
  declarations: [ OrganisationList ],
  exports: [ OrganisationList ]
})
export class OrganisationLayoutModule {

}
