import {NgModule} from '@angular/core';

import {MemberHttpClient} from './member.httpClient';
import {PlannerHttpClient} from './planner.httpClient';
import {ApplicationHttpClient} from "./application.httpClient";
import {SecretaryHttpClient} from "./secretary.httpClient";
import {SupervisorHttpClient} from "./supervisor.httpClient";
import {CorrectorHttpClient} from "./corrector.httpClient";
import {StudentHttpClient} from "./student.httpClient";
import {PrincipalHttpClient} from "./principal.httpClient";

@NgModule({
  providers: [ApplicationHttpClient, CorrectorHttpClient, SupervisorHttpClient, SecretaryHttpClient,
    StudentHttpClient, MemberHttpClient, PlannerHttpClient, PrincipalHttpClient ]
})
export class MemberHttpClientModule {
}
