import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ApplicationListPage} from './list/application-list.page';
import {RouterModule, Routes} from '@angular/router';
import {ApplicationModule, ApplicationResolver} from 'src/app/application';
import {ControlModule} from 'examination/controls';
import {ExaminationModule} from 'examination/app/examination';
import {AuthorizedGuard} from "examination/app/authorization";

const routes: Routes = [
  {path: '', component: ApplicationListPage, canActivate: [ AuthorizedGuard ] }
];

@NgModule({
  imports: [CommonModule, ControlModule, ApplicationModule, ExaminationModule,

    RouterModule.forChild(routes)],
  declarations: [ApplicationListPage],
  providers: [ApplicationResolver]
})
export class ApplicationPageModule {

}
