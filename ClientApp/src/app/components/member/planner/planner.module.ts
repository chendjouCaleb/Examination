import {PlannerAdd} from 'examination/app/components/member/planner/add/planner-add';
import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MomentModule} from 'ngx-moment';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {PlannerService} from './planner.service';
import {PLANNER_SERVICE_TOKEN} from './planner.service.interface';
import {PlannerList} from "./list/planner-list";


@NgModule({
  imports: [CommonModule, MomentModule, AppFormModule, MsfModalModule, UserPickerModule, MsfTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [PlannerAdd, PlannerList],
  exports: [PlannerAdd, PlannerList],
  providers: [ PlannerService, { provide: PLANNER_SERVICE_TOKEN, useExisting: PlannerService}]
})
export class PlannerModule {
}
