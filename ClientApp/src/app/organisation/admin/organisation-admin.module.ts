import {NgModule} from "@angular/core";
import {OrganisationLayoutModule} from "../layout/organisation-layout.module";
import {MsfButtonModule, MsfPersonaModule} from "fabric-docs";
import {CommonModule} from "@angular/common";
import {AdminListPage} from "./list/admin-list.page";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ControlModule} from "../../../controls/control.module";
import {MatDialogModule} from "@angular/material/dialog";
import {AdminAddComponent} from "./add/admin-add.component";


const routes: Routes = [
  {path: '', component: AdminListPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes),
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule,
    OrganisationLayoutModule, MsfPersonaModule, MsfButtonModule],
  declarations: [AdminListPage, AdminAddComponent ]
})
export class OrganisationAdminModule {
}
