import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ToastTestComponent} from './toast-test/toast.test.component';
import {AuthorizedGuard} from './authorization/authorization-guard';


const routes: Routes = [
  {
    path: 'examinations', loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule)
  },
  {
    path: 'organisations',
    loadChildren: () => import('./organisation/organisation.module').then(m => m.OrganisationModule),
  },
  {path: '', redirectTo: 'organisations', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
