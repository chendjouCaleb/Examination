import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MsfButtonModule, MsfCheckboxModule,
  MsfMenuModule,
  MsfModalModule,
  MsfPersonaModule,
  MsfPivotModule, MsfRadioModule,
  MsfTableModule
} from 'fabric-docs';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule, MsfTabModule} from 'examination/controls';
import {ExaminationModule} from '../examination';
import {RouterModule} from '@angular/router';
import {MomentModule} from "ngx-moment";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {ApplicationAddComponent} from "examination/app/application/add/application-add.component";
import {MatRippleModule} from "@angular/material/core";
import {ApplicationEditComponent} from "examination/app/application/edit/application-edit.component";
import {ApplicationSpeciality} from "examination/app/application/speciality/application-speciality";
import {ApplicationService} from "examination/app/application/application.service";
import {ApplicationList} from "examination/app/application/list/application-list";
import {ApplicationHome} from "examination/app/application/home/application-home";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfButtonModule, MsfSelectModule,
    AppFormModule, MsfTableModule, MsfPersonaModule, MsfMenuModule, MomentModule, MsfRadioModule,
    MatDatepickerModule, MatRippleModule, MsfCheckboxModule,
    MsfPivotModule, MsfModalModule, MsfTabModule, ExaminationModule, RouterModule],
  declarations: [ApplicationAddComponent, ApplicationEditComponent, ApplicationSpeciality,
    ApplicationList, ApplicationHome],
  exports: [ApplicationAddComponent, ApplicationEditComponent, ApplicationSpeciality, ApplicationList,
    ApplicationHome],

  providers: [ApplicationService]
})
export class ApplicationModule {
}
