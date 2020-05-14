import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule} from 'examination/controls';
import {PrincipalAddComponent} from './add/principal-add.component';
import {PrincipalEditComponent} from './edit/principal-edit.component';
import {UserPickerModule} from 'examination/app/user-picker';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [PrincipalAddComponent, PrincipalEditComponent],
  exports: [PrincipalAddComponent, PrincipalEditComponent],
})
export class PrincipalModule {
}
