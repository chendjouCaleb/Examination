import {NgModule} from "@angular/core";
import {OrganisationLayoutModule} from "../layout/organisation-layout.module";
import {MsfButtonModule, MsfMenuModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from "@angular/common";
import {AdminListPage} from "./list/admin-list.page";
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ControlModule} from "../../../controls/control.module";
import {MatDialogModule} from "@angular/material/dialog";
import {AdminAddComponent} from "./add/admin-add.component";
import {MomentModule} from "ngx-moment";
import {AdminEditComponent} from "./edit/admin-edit.component";



const routes: Routes = [
  {path: '', component: AdminListPage }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MomentModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule,
    OrganisationLayoutModule, MsfPersonaModule, MsfButtonModule],
  declarations: [AdminListPage, AdminAddComponent, AdminEditComponent ]
})
export class OrganisationAdminModule {
}
