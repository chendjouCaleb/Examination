import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlModule} from 'examination/controls';
import {MatDialogModule} from '@angular/material/dialog';
import {MomentModule} from 'ngx-moment';
import {PrincipalListPage} from './list/principal-list.page';
import {ExaminationModule} from 'examination/app/examination';
import {UserPickerModule} from 'examination/app/user-picker';


const routes: Routes = [
  {path: '', component: PrincipalListPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MomentModule, MsfModalModule, UserPickerModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule,
    ExaminationModule, MsfPersonaModule, MsfButtonModule],
  declarations: [PrincipalListPage]
})
export class PrincipalPageModule {
}
