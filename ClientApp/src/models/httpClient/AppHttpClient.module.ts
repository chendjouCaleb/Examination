import {NgModule} from '@angular/core';

import {IdentityHttpClientModule} from './identity';
import {ExaminationHttpClientModule} from './examination';
import {MemberHttpClientModule} from './member';
import {OrganisationHttpClientModule} from './organisation';
import {TestHttpClientModule} from './test';
import {CourseHttpClientModule} from './course';

@NgModule({
  imports: [IdentityHttpClientModule, ExaminationHttpClientModule, MemberHttpClientModule, CourseHttpClientModule,
    OrganisationHttpClientModule, TestHttpClientModule, IdentityHttpClientModule]

})
export class AppHttpClientModule {
}
