import {NgModule} from '@angular/core';
import {OrganisationModule} from 'src/app/organisation';
import {CommonModule} from '@angular/common';
import {ControlModule} from 'examination/controls';
import {RoomListPage} from './list/room-list.page';
import {RouterModule, Routes} from '@angular/router';
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfModalModule, MsfPersonaModule} from 'fabric-docs';
import {RoomHomePage} from './home/room-home.page';
import {MomentModule} from 'ngx-moment';
import {RoomModule, RoomResolver} from 'src/app/room';

const routes: Routes = [
  {path: '', component: RoomListPage},
  {path: ':roomId/home', component: RoomHomePage, resolve: [RoomResolver]}
];

@NgModule({
  imports: [CommonModule, ControlModule, RoomModule, OrganisationModule, MsfPersonaModule,
    MsfButtonModule, MomentModule, MsfModalModule,
    MsfIconModule, MsfMenuModule,
    RouterModule.forChild(routes)],
  declarations: [RoomListPage, RoomHomePage],
  providers: [RoomResolver]
})
export class RoomPageModule {

}
