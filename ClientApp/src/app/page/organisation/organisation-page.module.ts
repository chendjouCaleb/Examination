import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MsfButtonModule, MsfPersonaModule} from 'fabric-docs';
import {RouterModule, Routes} from '@angular/router';
import {OrganisationListPage} from './list/organisation-list.page';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrganisationHomePage} from './home/organisation-home.page';
import {OrganisationAddPage} from './add/organisation-add.page';
import {AuthorizedGuard} from "examination/app/authorization";
import {OrganisationModule, OrganisationResolver} from "examination/app/organisation";
import {LayoutModule} from "examination/infrastructure";
import {AppFormModule, ControlModule} from "examination/controls";

export const routes: Routes = [
  {path: 'add', component: OrganisationAddPage, canActivate: [AuthorizedGuard]},
  {path: ':organisationId/home', component: OrganisationHomePage, resolve: [OrganisationResolver]},
  {
    path: ':organisationId/settings',
    loadChildren: () => import('./settings/organisation-settings.module').then(s => s.OrganisationSettingsModule),
    resolve: [OrganisationResolver]
  },

  {path: '', component: OrganisationListPage},

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), AppFormModule, FormsModule, ReactiveFormsModule, MsfPersonaModule,
    ControlModule, LayoutModule, MsfButtonModule, OrganisationModule],
  declarations: [OrganisationListPage, OrganisationAddPage, OrganisationHomePage],
  providers: [OrganisationResolver]
})
export class OrganisationPageModule {

}
