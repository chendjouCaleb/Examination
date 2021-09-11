import {SecretaryAdd} from 'examination/app/components/member/secretary/add/secretary-add';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {SecretaryService} from './secretary.service';
import {SECRETARY_SERVICE_TOKEN} from './secretary.service.interface';
import {SecretaryList} from './list/secretary-list';
import {
  MsButtonModule,
  MsContextMenuModule, MsDialogModule,
  MsDropdownModule,
  MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsDialogModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsContextMenuModule, MsDropdownModule, MsButtonModule, MsSpinnerModule],
  declarations: [SecretaryAdd, SecretaryList],
  exports: [SecretaryAdd, SecretaryList],
  providers: [ SecretaryService, { provide: SECRETARY_SERVICE_TOKEN, useExisting: SecretaryService}]
})
export class SecretaryModule {
}
