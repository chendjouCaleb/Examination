import {NgModule} from "@angular/core";
import {OrganisationLayoutModule} from "../organisation/layout/organisation-layout.module";
import {CommonModule} from "@angular/common";
import {ControlModule} from "../../controls/control.module";
import {RoomLayoutModule} from "./layout/room-layout.module";
import {RoomListPage} from "./list/room-list.page";
import {RouterModule, Routes} from "@angular/router";
import {MsfButtonModule, MsfIconModule, MsfMenuModule, MsfPersonaModule} from "fabric-docs";

const routes: Routes = [
  {path: '', component: RoomListPage}
];

@NgModule({
  imports: [CommonModule, ControlModule, RoomLayoutModule, OrganisationLayoutModule, MsfPersonaModule,
    MsfButtonModule,
    MsfIconModule, MsfMenuModule,
    RouterModule.forChild(routes)],
  declarations: [RoomListPage]
})
export class RoomModule {

}
