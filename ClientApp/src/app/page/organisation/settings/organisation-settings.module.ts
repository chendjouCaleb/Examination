import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {OrganisationSettingsPage} from './organisation-settings.page';
import {AuthorizedGuard} from 'examination/app/authorization';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MsfButtonModule, MsfPersonaModule} from 'fabric-docs';
import {AppFormModule, ControlModule} from 'examination/controls';
import {LayoutModule} from 'examination/infrastructure';
import {OrganisationInfoComponent} from './info/organisation-info.component';
import {OrganisationIdentifierComponent} from './identifier/organisation-identifier.component';
import {OrganisationModule, OrganisationResolver} from 'src/app/organisation';

const routes: Routes = [
  {path: '', component: OrganisationSettingsPage, resolve: [OrganisationResolver], canActivate: [AuthorizedGuard]}
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), OrganisationModule, AppFormModule,
    FormsModule, ReactiveFormsModule,
    MsfPersonaModule, ControlModule, LayoutModule, MsfButtonModule],

  declarations: [OrganisationSettingsPage, OrganisationInfoComponent, OrganisationIdentifierComponent]
})
export class OrganisationSettingsModule {

}
