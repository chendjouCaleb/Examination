import {NgModule} from "@angular/core";
import {TestHttpClientModule} from "examination/models/http";
import {TestGroupLoader} from "./test-group.loader";
import {TestGroupSupervisorLoader} from "./test-group-supervisor.loader";
import {ScorePaperLoader} from "./score-paper.loader";
import {PaperLoader} from "./paper.loader";
import {TestGroupCorrectorLoader} from "./test-group-corrector.loader";
import {TestLoader} from "./test.loader";
import {TestGroupSecretaryLoader} from "./test-group-secretary.loader";
import {TestScoreLoader} from "./test-score.loader";
import {TestLevelSpecialityLoader} from "./test-level-speciality.loader";


@NgModule({
  imports: [ TestHttpClientModule],
  providers: [ TestGroupLoader, TestGroupSecretaryLoader, TestGroupSupervisorLoader, TestGroupCorrectorLoader,
    PaperLoader, ScorePaperLoader, TestLoader, TestScoreLoader, TestLevelSpecialityLoader]
})
export class TestLoaderModule {}
