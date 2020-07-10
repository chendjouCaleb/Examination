import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule} from 'examination/controls';
import {PrincipalAddComponent} from './add/principal-add.component';
import {PrincipalEditComponent} from './edit/principal-edit.component';
import {UserPickerModule} from 'examination/app/user-picker';


@NgModule({
  imports: [CommonModule, AppFormModule, MsfModalModule, UserPickerModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [PrincipalAddComponent, PrincipalEditComponent],
  exports: [PrincipalAddComponent, PrincipalEditComponent],
})
export class PrincipalModule {
}
