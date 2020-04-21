import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule, MsfPersonaModule} from "fabric-docs";
import {RouterModule, Routes} from "@angular/router";
import {OrganisationListPage} from "./list/organisation-list.page";
import {LayoutModule} from "../../infrastructure/public_api";
import {OrganisationAddPage} from "./add/organisation-add.page";
import {AuthorizedGuard} from "../authorization/authorization-guard";
import {ControlModule} from "../../controls/control.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganisationLayoutModule} from "./layout/organisation-layout.module";
import {OrganisationHomePage} from "./home/organisation-home.page";
import {OrganisationResolver} from "./organisation.resolver";
import {OrganisationSettingsPage} from "./settings/organisation-settings.page";

export const routes: Routes = [
  {path: 'add', component: OrganisationAddPage, canActivate: [AuthorizedGuard]},
  {path: ':organisationId/home', component: OrganisationHomePage, resolve: [ OrganisationResolver ] },
  {path: ':organisationId/settings',  loadChildren: () => import('./settings/organisation-settings.module').then(s => s.OrganisationSettingsModule)},
  {path: '', component: OrganisationListPage},

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MsfPersonaModule,
    ControlModule, LayoutModule, MsfButtonModule, OrganisationLayoutModule],
  declarations: [OrganisationListPage, OrganisationAddPage, OrganisationHomePage ],
  providers: [ OrganisationResolver ]
})
export class OrganisationModule {

}
