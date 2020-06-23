import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MsfButtonModule,
  MsfMenuModule,
  MsfModalModule,
  MsfPersonaModule,
  MsfPivotModule,
  MsfTableModule
} from 'fabric-docs';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule, MsfTabModule} from 'examination/controls';
import {ExaminationModule} from '../examination';
import {GroupLayoutComponent} from './layout/group-layout.component';
import {GroupAddComponent} from './add/group-add.component';
import {RouterModule} from '@angular/router';
import {GroupList} from "./list/group-list";
import {MomentModule} from "ngx-moment";
import { MatRippleModule} from "@angular/material/core";
import { GroupService } from './group.service';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsfButtonModule, MsfSelectModule,
    AppFormModule, MsfTableModule, MsfPersonaModule, MsfMenuModule, MomentModule, MatRippleModule,
    MsfPivotModule, MsfModalModule, MsfTabModule, ExaminationModule, RouterModule],
  declarations: [GroupLayoutComponent, GroupAddComponent, GroupList],
  exports: [GroupLayoutComponent, GroupAddComponent, GroupList],
  providers: [ GroupService ]
})
export class GroupModule {
}
