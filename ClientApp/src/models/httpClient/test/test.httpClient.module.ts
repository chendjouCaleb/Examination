import {NgModule} from '@angular/core';
import {TestHttpClient} from "./test.httpClient";
import {TestGroupHttpClient} from "./test-group.httpClient";
import {TestGroupSupervisorHttpClient} from "./test-group-supervisor.httpClient";
import {TestGroupSecretaryHttpClient} from "./test-group-secretary.httpClient";
import {TestGroupCorrectorHttpClient} from "./test-group-corrector.httpClient";
import {PaperHttpClient} from "./paper.httpClient";
import {TestScoreHttpClient} from "./test-score.httpClient";
import {TestLevelSpecialityHttpClient} from "./test-level-speciality.httpClient";
import {ScorePaperHttpClient} from "./score-paper.httpClient";


@NgModule({
  providers: [TestHttpClient, TestGroupHttpClient, TestGroupCorrectorHttpClient, TestGroupSupervisorHttpClient,
    ScorePaperHttpClient,
    TestGroupSecretaryHttpClient, PaperHttpClient, TestScoreHttpClient, TestLevelSpecialityHttpClient ]
})
export class TestHttpClientModule {

}
