import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlModule} from 'examination/controls';
import {MatDialogModule} from '@angular/material/dialog';
import {MomentModule} from 'ngx-moment';
import {SupervisorListPage} from './list/supervisor-list.page';
import {ExaminationModule} from 'examination/app/examination';
import {UserPickerModule} from 'examination/app/user-picker';
import {MatRippleModule} from '@angular/material/core';
import {SupervisorModule} from "examination/app/supervisor";

const routes: Routes = [
  {path: '', component: SupervisorListPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MomentModule, MsfModalModule, UserPickerModule,
    MsfTableModule, SupervisorModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule,
    ExaminationModule, MsfPersonaModule, MsfButtonModule, MatRippleModule],
  declarations: [SupervisorListPage]
})
export class SupervisorPageModule {
}
