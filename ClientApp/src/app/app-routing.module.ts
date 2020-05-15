import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrganisationResolver} from 'examination/app/organisation';
import {ExaminationResolver} from 'examination/app/examination';


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

  {
    path: 'organisations/:organisationId/examinations', resolve: [OrganisationResolver],
    loadChildren: () => import('./page/examination/examination-page.module').then(m => m.ExaminationPageModule),
  },

  {
    path: 'organisations/:organisationId/examinations/:examinationId/principals',
    resolve: [OrganisationResolver, ExaminationResolver],
    loadChildren: () => import('./page/principal/principal-page.module').then(m => m.PrincipalPageModule),
  },

  {
    path: 'organisations/:organisationId/examinations/:examinationId/correctors',
    resolve: [OrganisationResolver, ExaminationResolver],
    loadChildren: () => import('./page/corrector/corrector-page.module').then(m => m.CorrectorPageModule),
  },

  {
    path: 'organisations/:organisationId/examinations/:examinationId/supervisors',
    resolve: [OrganisationResolver, ExaminationResolver],
    loadChildren: () => import('./page/supervisor/supervisor-page.module').then(m => m.SupervisorPageModule),
  },

  {path: '', redirectTo: 'organisations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
