import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ClientLoader} from "./client.loader";
import {OrganisationLoader} from "./organisation.loader";
import {AdminLoader} from "./admin.loader";
import {RoomLoader} from "./room.loader";
import {ExaminationLoader} from "./examination.loader";


@NgModule({
  imports: [CommonModule],
  providers: [ ClientLoader, OrganisationLoader, AdminLoader, RoomLoader, ExaminationLoader ]
})
export class LoaderModule { }
