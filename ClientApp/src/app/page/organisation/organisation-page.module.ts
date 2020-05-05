import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfPersonaModule} from 'fabric-docs';
import {RouterModule, Routes} from '@angular/router';
import {OrganisationListPage} from './list/organisation-list.page';
import {LayoutModule} from '../../../infrastructure/public_api';
import {AuthorizedGuard} from '../../authorization/authorization-guard';
import {ControlModule} from '../../../controls/control.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrganisationHomePage} from './home/organisation-home.page';
import {OrganisationAddPage} from './add/organisation-add.page';
import {OrganisationModule, OrganisationResolver} from '../../organisation';

export const routes: Routes = [
  {path: 'add', component: OrganisationAddPage, canActivate: [AuthorizedGuard]},
  {path: ':organisationId/home', component: OrganisationHomePage, resolve: [OrganisationResolver]},
  {
    path: ':organisationId/settings',
    loadChildren: () => import('./settings/organisation-settings.module').then(s => s.OrganisationSettingsModule),
    resolve: [OrganisationResolver]
  },
  {
    path: ':organisationId/examinations',
    loadChildren: () => import('../../examination/examination.module').then(s => s.ExaminationModule),
    resolve: [OrganisationResolver]
  },
  {path: '', component: OrganisationListPage},

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, MsfPersonaModule,
    ControlModule, LayoutModule, MsfButtonModule, OrganisationModule],
  declarations: [OrganisationListPage, OrganisationAddPage, OrganisationHomePage],
  providers: [OrganisationResolver]
})
export class OrganisationPageModule {

}
