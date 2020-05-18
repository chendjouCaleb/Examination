import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GroupListPage} from './list/group-list.page';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule, MsfTableModule} from 'fabric-docs';
import {GroupHomePage} from './home/group-home.page';
import {MomentModule} from 'ngx-moment';
import {GroupModule, GroupResolver} from 'src/app/group';
import {ControlModule} from 'examination/controls';
import {ExaminationModule} from 'examination/app/examination';
import {MatRippleModule} from '@angular/material/core';

const routes: Routes = [
  {path: '', component: GroupListPage},
  {path: ':groupId/home', component: GroupHomePage, resolve: [GroupResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, GroupModule, ExaminationModule, MsfPersonaModule,
    MsfButtonModule, MomentModule, MatRippleModule, MsfTableModule,
    MsfIconModule, MsfMenuModule, MsfModalModule,
    RouterModule.forChild(routes)],
  declarations: [GroupListPage, GroupHomePage],
  providers: [GroupResolver]
})
export class GroupPageModule {

}
