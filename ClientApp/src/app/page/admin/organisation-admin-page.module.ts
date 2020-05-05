import {NgModule} from '@angular/core';
import {OrganisationModule} from 'src/app/organisation';
import {MsfButtonModule, MsfMenuModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {AdminListPage} from './list/admin-list.page';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlModule} from '../../../controls/control.module';
import {MatDialogModule} from '@angular/material/dialog';
import {MomentModule} from 'ngx-moment';
import {OrganisationAdminModule} from 'src/app/admin';


const routes: Routes = [
  {path: '', component: AdminListPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MomentModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule, OrganisationAdminModule,
    OrganisationModule, MsfPersonaModule, MsfButtonModule],
  declarations: [AdminListPage]
})
export class OrganisationAdminPageModule {
}
