import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {OrganisationResolver} from './organisation/organisation.resolver';


const routes: Routes = [
  {
    path: 'examinations', loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule)
  },
  {
    path: 'organisations',
    loadChildren: () => import('./page/organisation/organisation-page.module').then(m => m.OrganisationPageModule),
  },

  {
    path: 'organisations/:organisationId/admins', resolve: [OrganisationResolver],
    loadChildren: () => import('./page/admin/organisation-admin-page.module').then(m => m.OrganisationAdminPageModule),
  },

  {
    path: 'organisations/:organisationId/rooms', resolve: [OrganisationResolver],
    loadChildren: () => import('./page/room/room-page.module').then(m => m.RoomPageModule),
  },
  {path: '', redirectTo: 'organisations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
