import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule} from 'examination/controls';
import {UserPickerModule} from 'examination/app/user-picker';
import {SupervisorAddComponent} from "./add/supervisor-add.component";


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [SupervisorAddComponent],
  exports: [SupervisorAddComponent],
})
export class SupervisorModule {
}
