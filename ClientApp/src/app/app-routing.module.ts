import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ToastTestComponent} from './toast-test/toast.test.component';


const routes: Routes = [
  {path: 'examinations', loadChildren: () => import('./examination/examination.module').then(m => m.ExaminationModule)},
  {path: '', component: ToastTestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
