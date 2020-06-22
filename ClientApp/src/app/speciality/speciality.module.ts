import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfModalModule, MsfPivotModule} from 'fabric-docs';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfTabModule} from 'examination/controls';
import {ExaminationModule} from '../examination';
import {SpecialityLayoutComponent} from 'examination/app/speciality/layout/speciality-layout.component';
import {SpecialityAddComponent} from 'examination/app/speciality/add/speciality-add.component';
import {RouterModule} from '@angular/router';
import {CanGroupSpecialityAlert} from "examination/app/speciality/CanGroupAlert";
import {SpecialityService} from "examination/app/speciality/speciality-service";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfButtonModule, AppFormModule,
    MsfPivotModule, MsfModalModule, MsfTabModule, ExaminationModule, RouterModule],
  declarations: [SpecialityLayoutComponent, SpecialityAddComponent, CanGroupSpecialityAlert],
  exports: [SpecialityLayoutComponent, SpecialityAddComponent, CanGroupSpecialityAlert],
  providers: [ SpecialityService ]
})
export class SpecialityModule {
}
