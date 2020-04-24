import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ToastTestComponent} from './toast-test/toast.test.component';
import {AuthorizedGuard} from './authorization/authorization-guard';
import {OrganisationResolver} from "./organisation/organisation.resolver";


const routes: Routes = [
  {
    path: 'examinations', loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule)
  },
  {
    path: 'organisations',
    loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule),
  },
  {
    path: 'organisations/:organisationId/rooms', resolve: [OrganisationResolver],
    loadChildren: () => import('./room/room.module').then(m => m.RoomModule),
  },
  {path: '', redirectTo: 'organisations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
