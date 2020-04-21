import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MsfButtonModule} from "fabric-docs";
import {RouterModule, Routes} from "@angular/router";
import {OrganisationListPage} from "./list/organisation-list.page";
import {LayoutModule} from "../../infrastructure/public_api";
import {OrganisationAddPage} from "./add/organisation-add.page";
import {AuthorizedGuard} from "../authorization/authorization-guard";
import {ControlModule} from "../../controls/control.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganisationLayoutModule} from "./layout/organisation-layout.module";

export const routes: Routes = [
  {path: 'add', component: OrganisationAddPage, canActivate: [AuthorizedGuard]},
  {path: '', component: OrganisationListPage},

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule,
    ControlModule, LayoutModule, MsfButtonModule, OrganisationLayoutModule],
  declarations: [OrganisationListPage, OrganisationAddPage]
})
export class OrganisationModule {

}
