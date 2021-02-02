import {ApplicationDetails} from "./details/application-details";
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MsfButtonModule,
  MsfCheckboxModule,
  MsfMenuModule,
  MsfModalModule,
  MsfPersonaModule,
  MsfPivotModule,
  MsfRadioModule, MsfTableModule
} from 'fabric-docs';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule, MsfTabModule} from 'examination/controls';
import {RouterModule} from '@angular/router';
import {MomentModule} from "ngx-moment";
import {MatRippleModule} from "@angular/material/core";
import {ApplicationEdit} from "./edit/application-edit";
import {ApplicationAdd} from "./add/application-add";
import {ApplicationService} from "./application.service";
import {STUDENT_APPLICATION_SERVICE_TOKEN} from "./application.service.interface";
import {ApplicationResolver} from "./application.resolver";
import {ApplicationList} from "./list/application-list";


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfButtonModule, MsfSelectModule,
    AppFormModule, MsfPersonaModule, MsfMenuModule, MomentModule, MsfRadioModule, MatRippleModule, MsfCheckboxModule,
    MsfPivotModule, MsfModalModule, MsfTabModule,MsfTableModule,  RouterModule],
  declarations: [ApplicationAdd, ApplicationEdit, ApplicationDetails, ApplicationList],
  exports: [ApplicationAdd, ApplicationEdit, ApplicationDetails, ApplicationList],

  providers: [ApplicationService, ApplicationResolver, {
    useExisting: ApplicationService,
    provide: STUDENT_APPLICATION_SERVICE_TOKEN
  }]
})
export class ApplicationModule {
}
