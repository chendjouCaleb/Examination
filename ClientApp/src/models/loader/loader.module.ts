import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLoader} from './client.loader';
import {OrganisationLoader} from './organisation.loader';
import {AdminLoader} from './admin.loader';
import {RoomLoader} from './room.loader';
import {ExaminationLoader} from './examination.loader';
import {PrincipalLoader} from './principal.loader';
import {CorrectorLoader} from './corrector.loader';
import {SupervisorLoader} from './supervisor.loader';
import {SecretaryLoader} from './secretary.loader';
import {SpecialityLoader} from './speciality.loader';
import {GroupLoader} from './group.loader';
import {StudentLoader} from './student.loader';
import {ApplicationLoader} from './application.loader';
import {TestLoader} from './test.loader';
import {ScoreLoader} from './score.loader';
import {TestGroupSecretaryLoader} from './test-group-secretary.loader';
import {TestGroupSupervisorLoader} from './test-group-supervisor.loader';
import {TestGroupCorrectorLoader} from './test-group-corrector.loader';
import {PaperLoader} from './paper.loader';


@NgModule({
  imports: [CommonModule],
  providers: [ClientLoader, OrganisationLoader, AdminLoader, RoomLoader, SecretaryLoader,
    SpecialityLoader, GroupLoader, StudentLoader, ApplicationLoader, TestLoader,
    ExaminationLoader, PrincipalLoader, CorrectorLoader, SupervisorLoader,
    TestGroupSecretaryLoader, TestGroupSupervisorLoader, TestGroupCorrectorLoader,
    ScoreLoader, PaperLoader]
})
export class LoaderModule {
}
