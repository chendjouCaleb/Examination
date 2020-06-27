import {NgModule} from '@angular/core';
import {OrganisationModule} from 'src/app/organisation';
import {CommonModule} from '@angular/common';
import {ControlModule} from 'examination/controls';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {TestHomePage} from './home/test-home.page';
import {MomentModule} from 'ngx-moment';
import {TestModule, TestResolver} from 'src/app/test';
import {TestListPage} from "examination/app/page/tests/list/test-list.page";
import {ExaminationModule} from "examination/app/examination";
import {TestSettingsPage} from "examination/app/page/tests/settings/test-settings.page";

const routes: Routes = [
  {path: '', component: TestListPage},
  {path: ':testId/home', component: TestHomePage, resolve: [TestResolver]},
  {path: ':testId/settings', component: TestSettingsPage, resolve: [TestResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, TestModule, OrganisationModule, MsfPersonaModule,
    MsfButtonModule, MomentModule, MsfModalModule,
    MsfIconModule, MsfMenuModule, ExaminationModule,
    RouterModule.forChild(routes)],
  declarations: [TestListPage, TestHomePage, TestSettingsPage ],
  providers: [TestResolver]
})
export class TestPageModule {

}
