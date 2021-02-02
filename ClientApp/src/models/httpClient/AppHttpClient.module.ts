import {NgModule} from '@angular/core';

import {IdentityHttpClientModule} from './identity';
import {ExaminationHttpClientModule} from './examination';
import {MemberHttpClientModule} from './member';
import {OrganisationHttpClientModule} from './organisation';
import {TestHttpClientModule} from './test';

@NgModule({
  imports: [IdentityHttpClientModule, ExaminationHttpClientModule, MemberHttpClientModule,
    OrganisationHttpClientModule, TestHttpClientModule, IdentityHttpClientModule]

})
export class AppHttpClientModule {
}
