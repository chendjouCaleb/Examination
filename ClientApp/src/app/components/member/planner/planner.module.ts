import {PlannerAdd} from 'examination/app/components/member/planner/add/planner-add';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {PlannerService} from './planner.service';
import {PLANNER_SERVICE_TOKEN} from './planner.service.interface';
import {PlannerList} from './list/planner-list';
import {
  MsButtonModule,
  MsContextMenuModule,
  MsDialogModule,
  MsPersonaModule, MsSpinnerModule,
  MsTableModule
} from '@ms-fluent/components';


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsDialogModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsContextMenuModule, MsPersonaModule, MsButtonModule, MsSpinnerModule],
  declarations: [PlannerAdd, PlannerList],
  exports: [PlannerAdd, PlannerList],
  providers: [ PlannerService, { provide: PLANNER_SERVICE_TOKEN, useExisting: PlannerService}]
})
export class PlannerModule {
}
