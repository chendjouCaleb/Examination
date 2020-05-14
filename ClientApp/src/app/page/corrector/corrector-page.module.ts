import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ControlModule} from 'examination/controls';
import {MatDialogModule} from '@angular/material/dialog';
import {MomentModule} from 'ngx-moment';
import {CorrectorListPage} from './list/corrector-list.page';
import {ExaminationModule} from 'examination/app/examination';
import {UserPickerModule} from 'examination/app/user-picker';
import {MatRippleModule} from '@angular/material/core';


const routes: Routes = [
  {path: '', component: CorrectorListPage}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), MomentModule, MsfModalModule, UserPickerModule,
    MsfTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule,
    ExaminationModule, MsfPersonaModule, MsfButtonModule, MatRippleModule],
  declarations: [CorrectorListPage]
})
export class CorrectorPageModule {
}
