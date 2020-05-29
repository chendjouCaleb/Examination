import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ClientHttpClient} from './client.http.client';
import {OrganisationHttpClient} from './organisation.httpClient';
import {AdminHttpClient} from './admin.httpClient';
import {UserHttpClient} from './user.httpClient';
import {RoomHttpClient} from './room.httpClient';
import {ExaminationHttpClient} from './examination.httpClient';
import {CorrectorHttpClient} from './corrector.httpClient';
import {PrincipalHttpClient} from './principal.httpClient';
import {SupervisorHttpClient} from './supervisor.httpClient';
import {SecretaryHttpClient} from './secretary.httpClient';
import {SpecialityHttpClient} from './speciality.httpClient';
import {GroupHttpClient} from './group.httpClient';
import {StudentHttpClient} from './student.httpClient';
import {ApplicationHttpClient} from './application.httpClient';
import {TestHttpClient} from './test.httpClient';
import {TestGroupHttpClient} from './test-group.httpClient';
import {ScoreHttpClient} from './score.httpClient';

@NgModule({
  imports: [HttpClientModule],
  providers: [
    ClientHttpClient, OrganisationHttpClient, AdminHttpClient, UserHttpClient, RoomHttpClient, GroupHttpClient,
    ExaminationHttpClient, CorrectorHttpClient, PrincipalHttpClient, SupervisorHttpClient, SecretaryHttpClient,
    SpecialityHttpClient, StudentHttpClient, ApplicationHttpClient, TestHttpClient, TestGroupHttpClient,
    ScoreHttpClient
  ]
})
export class AppHttpClientModule {
}
