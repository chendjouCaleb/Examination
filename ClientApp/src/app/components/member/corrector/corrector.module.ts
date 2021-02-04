import {CorrectorAdd} from 'examination/app/components/member/corrector/add/corrector-add';
import {NgModule} from '@angular/core';
import {MsfMenuModule, MsfModalModule} from 'fabric-docs';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, UserPickerModule} from 'examination/controls';
import {CorrectorService} from './corrector.service';
import {CORRECTOR_SERVICE_TOKEN} from './corrector.service.interface';
import {CorrectorList} from 'examination/app/components/member/corrector/list/corrector-list';
import {MsTableModule} from '@ms-fluent/table';
import {MsButtonModule} from '@ms-fluent/button';


@NgModule({
  imports: [CommonModule, AppFormModule, MsfModalModule, UserPickerModule, MsTableModule,
    FormsModule, ReactiveFormsModule, ControlModule, MsfMenuModule, MsButtonModule],
  declarations: [CorrectorAdd, CorrectorList],
  exports: [CorrectorAdd, CorrectorList],
  providers: [CorrectorService, {provide: CORRECTOR_SERVICE_TOKEN, useExisting: CorrectorService}]
})
export class CorrectorModule {
}
