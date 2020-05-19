import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MsfButtonModule,
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
import {StudentAddComponent} from "examination/app/student/add/student-add.component";
import {StudentList} from "examination/app/student/list/student-list";
import {MatRippleModule} from "@angular/material/core";
import {StudentLayoutComponent} from "examination/app/student/layout/student-layout.component";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfButtonModule, MsfSelectModule,
    AppFormModule, MsfTableModule, MsfPersonaModule, MsfMenuModule, MomentModule, MsfRadioModule,
    MatDatepickerModule, MatRippleModule,
    MsfPivotModule, MsfModalModule, MsfTabModule, ExaminationModule, RouterModule],
  declarations: [StudentLayoutComponent, StudentAddComponent, StudentList],
  exports: [StudentLayoutComponent, StudentAddComponent, StudentList]
})
export class GroupModule {
}
