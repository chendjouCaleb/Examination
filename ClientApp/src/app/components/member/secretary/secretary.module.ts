import {SecretaryAdd} from 'examination/app/components/member/secretary/add/secretary-add';
import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {SecretaryService} from './secretary.service';
import {SECRETARY_SERVICE_TOKEN} from './secretary.service.interface';
import {SecretaryList} from "./list/secretary-list";


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule, MsfTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [SecretaryAdd, SecretaryList],
  exports: [SecretaryAdd, SecretaryList],
  providers: [ SecretaryService, { provide: SECRETARY_SERVICE_TOKEN, useExisting: SecretaryService}]
})
export class SecretaryModule {
}
