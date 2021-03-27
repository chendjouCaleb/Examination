import {PrincipalAdd} from 'examination/app/components/member/principal/add/principal-add';
import {NgModule} from '@angular/core';
import {MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {PrincipalService} from './principal.service';
import {PRINCIPAL_SERVICE_TOKEN} from './principal.service.interface';
import {PrincipalList} from './list/principal-list';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';
import {MsSpinnerModule} from "@ms-fluent/spinner";


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsButtonModule, MsSpinnerModule],
  declarations: [PrincipalAdd, PrincipalList],
  exports: [PrincipalAdd, PrincipalList],
  providers: [ PrincipalService, { provide: PRINCIPAL_SERVICE_TOKEN, useExisting: PrincipalService}]
})
export class PrincipalModule {
}
