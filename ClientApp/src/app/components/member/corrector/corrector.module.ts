import {CorrectorAdd} from 'examination/app/components/member/corrector/add/corrector-add';
import {NgModule} from '@angular/core';
import {MsfButtonModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {CorrectorService} from './corrector.service';
import {CORRECTOR_SERVICE_TOKEN} from './corrector.service.interface';
import {CorrectorList} from "examination/app/components/member/corrector/list/corrector-list";


@NgModule({
  imports: [CommonModule, AppFormModule, MsfModalModule, UserPickerModule, MsfTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MatDialogModule, MsfMenuModule, MsfPersonaModule, MsfButtonModule],
  declarations: [CorrectorAdd, CorrectorList],
  exports: [CorrectorAdd, CorrectorList],
  providers: [CorrectorService, {provide: CORRECTOR_SERVICE_TOKEN, useExisting: CorrectorService}]
})
export class CorrectorModule {
}
