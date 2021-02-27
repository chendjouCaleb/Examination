import {NgModule} from '@angular/core';
import {MemberHttpClientModule} from 'examination/models/http';
import {ApplicationLoader} from './application.loader';
import {StudentLoader} from './student.loader';
import {MemberLoader} from './member.loader';
import {CorrectorLoader} from './corrector.loader';
import {PlannerLoader} from './planner.loader';
import {PrincipalLoader} from './principal.loader';
import {SecretaryLoader} from './secretary.loader';
import {SupervisorLoader} from './supervisor.loader';
import {TeacherLoader} from "./teacher.loader";

@NgModule({
  imports: [MemberHttpClientModule],
  providers: [ApplicationLoader, StudentLoader, MemberLoader, CorrectorLoader, PlannerLoader,
    PrincipalLoader, SecretaryLoader, SupervisorLoader, TeacherLoader]
})
export class MemberLoaderModule {
}
