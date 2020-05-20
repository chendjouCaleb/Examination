import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ClientLoader} from './client.loader';
import {OrganisationLoader} from './organisation.loader';
import {AdminLoader} from './admin.loader';
import {RoomLoader} from './room.loader';
import {ExaminationLoader} from './examination.loader';
import {PrincipalLoader} from './principal.loader';
import {CorrectorLoader} from './corrector.loader';
import {SupervisorLoader} from "./supervisor.loader";
import {SecretaryLoader} from "./secretary.loader";
import {SpecialityLoader} from "./speciality.loader";
import {GroupLoader} from "./group.loader";
import {StudentLoader} from "./student.loader";
import {ApplicationLoader} from "./application.loader";


@NgModule({
  imports: [CommonModule],
  providers: [ClientLoader, OrganisationLoader, AdminLoader, RoomLoader, SecretaryLoader,
    SpecialityLoader, GroupLoader, StudentLoader, ApplicationLoader,
    ExaminationLoader, PrincipalLoader, CorrectorLoader, SupervisorLoader]
})
export class LoaderModule {
}
