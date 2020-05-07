import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {AdminAddComponent} from './add/admin-add.component';
import {MomentModule} from 'ngx-moment';
import {AdminEditComponent} from './edit/admin-edit.component';
import {ControlModule} from 'examination/controls';
import {AppFormModule} from "examination/controls";


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [AdminAddComponent, AdminEditComponent],
  exports: [AdminAddComponent, AdminEditComponent],
})
export class OrganisationAdminModule {
}
