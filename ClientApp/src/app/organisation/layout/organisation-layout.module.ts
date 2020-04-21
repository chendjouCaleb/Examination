import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule, MsfIconModule, MsfPersonaModule} from "fabric-docs";
import {ControlModule} from "../../../controls/control.module";
import {OrganisationList} from "./list/organisation-list";
import {RouterModule} from "@angular/router";
import {OrganisationLayout} from "./organisation-layout";
import {LayoutModule} from "../../../infrastructure/layout/layout.module";

@NgModule({
  imports: [ CommonModule, RouterModule, LayoutModule, ControlModule, MsfPersonaModule,
    MsfButtonModule, MsfIconModule, MsfPersonaModule],
  declarations: [ OrganisationList, OrganisationLayout ],
  exports: [ OrganisationList, OrganisationLayout ]
})
export class OrganisationLayoutModule {

}
