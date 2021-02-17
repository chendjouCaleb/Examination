﻿import {SupervisorAdd} from 'examination/app/components/member/supervisor/add/supervisor-add';
import {NgModule} from '@angular/core';
import {MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {SupervisorService} from './supervisor.service';
import {SUPERVISOR_SERVICE_TOKEN} from './supervisor.service.interface';
import {SupervisorList} from './list/supervisor-list';
import {MsButtonModule} from '@ms-fluent/button';
import {MsTableModule} from '@ms-fluent/table';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsButtonModule],
  declarations: [SupervisorAdd, SupervisorList],
  exports: [SupervisorAdd, SupervisorList],
  providers: [ SupervisorService, { provide: SUPERVISOR_SERVICE_TOKEN, useExisting: SupervisorService}]
})
export class SupervisorModule {
}