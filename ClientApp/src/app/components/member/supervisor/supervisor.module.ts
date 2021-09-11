import {SupervisorAdd} from 'examination/app/components/member/supervisor/add/supervisor-add';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {SupervisorService} from './supervisor.service';
import {SUPERVISOR_SERVICE_TOKEN} from './supervisor.service.interface';
import {SupervisorList} from './list/supervisor-list';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDialogModule,
  MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsDialogModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsContextMenuModule, MsButtonModule, MsSpinnerModule],
  declarations: [SupervisorAdd, SupervisorList],
  exports: [SupervisorAdd, SupervisorList],
  providers: [ SupervisorService, { provide: SUPERVISOR_SERVICE_TOKEN, useExisting: SupervisorService}]
})
export class SupervisorModule {
}
