import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {OrganisationLayoutModule} from "../../organisation/layout/organisation-layout.module";
import {MsfButtonModule, MsfPivotModule} from "fabric-docs";
import {RoomLayoutComponent} from "./room-layout.component";
import {RoomAddComponent} from "./add/room-add.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ControlModule} from "../../../controls/control.module";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ControlModule,
    OrganisationLayoutModule, MsfButtonModule, MsfPivotModule],
  declarations: [RoomLayoutComponent, RoomAddComponent],
  exports: [RoomLayoutComponent, RoomAddComponent]
})
export class RoomLayoutModule {
}
