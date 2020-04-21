import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganisationLayoutModule} from "../layout/organisation-layout.module";
import {RouterModule, Routes} from "@angular/router";
import {OrganisationSettingsPage} from "./organisation-settings.page";
import {OrganisationResolver} from "../organisation.resolver";
import {AuthorizedGuard} from "../../authorization/authorization-guard";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MsfButtonModule, MsfPersonaModule} from "fabric-docs";
import {ControlModule} from "../../../controls/control.module";
import {LayoutModule} from "../../../infrastructure/layout/layout.module";

const routes: Routes = [
  {path: '', component: OrganisationSettingsPage, resolve: [ OrganisationResolver], canActivate: [ AuthorizedGuard ]}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrganisationLayoutModule, FormsModule, ReactiveFormsModule,
    MsfPersonaModule, ControlModule, LayoutModule, MsfButtonModule],

  declarations: [ OrganisationSettingsPage ]
})
export class OrganisationSettingsModule {

}
