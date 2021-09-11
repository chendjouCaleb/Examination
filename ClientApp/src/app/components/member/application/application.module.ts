import {ApplicationDetails} from './details/application-details';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppFormModule, ControlModule, MsfSelectModule} from 'examination/controls';
import {RouterModule} from '@angular/router';
import {MomentModule} from 'ngx-moment';
import {ApplicationEdit} from './edit/application-edit';
import {ApplicationAdd} from './add/application-add';
import {ApplicationService} from './application.service';
import {STUDENT_APPLICATION_SERVICE_TOKEN} from './application.service.interface';
import {ApplicationResolver} from './application.resolver';
import {ApplicationList} from './list/application-list';
import {
  MsButtonModule,
  MsCheckboxModule, MsContextMenuModule,
  MsDialogModule, MsDropdownModule, MsLabelModule,
  MsPaginatorModule,
  MsPersonaModule,
  MsPivotModule,
  MsRadioModule, MsSelectModule, MsSpinnerModule, MsTableModule
} from '@ms-fluent/components';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsButtonModule, MsSelectModule,
    AppFormModule, MsPersonaModule, MsContextMenuModule, MsDropdownModule, MomentModule, MsRadioModule, MsCheckboxModule,
    MsLabelModule,
    MsPivotModule, MsDialogModule, MsTableModule, MsPaginatorModule, RouterModule, MsSpinnerModule],

  declarations: [ApplicationAdd, ApplicationEdit, ApplicationDetails, ApplicationList],
  exports: [ApplicationAdd, ApplicationEdit, ApplicationDetails, ApplicationList],

  providers: [ApplicationService, ApplicationResolver, {
    useExisting: ApplicationService,
    provide: STUDENT_APPLICATION_SERVICE_TOKEN
  }]
})
export class ApplicationModule {
}
