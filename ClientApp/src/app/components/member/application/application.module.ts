import {ApplicationDetails} from './details/application-details';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfCheckboxModule, MsfMenuModule, MsfModalModule, MsfRadioModule} from 'fabric-docs';

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
import {MsButtonModule} from '@ms-fluent/button';
import {MsPersonaModule} from '@ms-fluent/persona';
import {MsPaginatorModule, MsTableModule} from '@ms-fluent/table';
import {MsPivotModule} from '@ms-fluent/pivot';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule, MsButtonModule, MsfSelectModule,
    AppFormModule, MsPersonaModule, MsfMenuModule, MomentModule, MsfRadioModule, MsfCheckboxModule,
    MsPivotModule, MsfModalModule, MsTableModule, MsPaginatorModule, RouterModule],

  declarations: [ApplicationAdd, ApplicationEdit, ApplicationDetails, ApplicationList],
  exports: [ApplicationAdd, ApplicationEdit, ApplicationDetails, ApplicationList],

  providers: [ApplicationService, ApplicationResolver, {
    useExisting: ApplicationService,
    provide: STUDENT_APPLICATION_SERVICE_TOKEN
  }]
})
export class ApplicationModule {
}
