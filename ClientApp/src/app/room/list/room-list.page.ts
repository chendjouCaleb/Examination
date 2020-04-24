import {Component, OnInit} from "@angular/core";
import {Room, RoomHttpClient, RoomLoader, Organisation} from "src/models";
import {CurrentItems} from "src/app/current-items";
import {List} from "@positon/collections";
import {MatDialog} from "@angular/material/dialog";
import {AlertEmitter} from "../../../controls/alert-emitter";
import {Confirmation} from "../../../controls/confirmation/confirmation";
import {RoomAddComponent} from "../layout/add/room-add.component";


@Component({
  templateUrl: 'room-list.page.html',
  selector: 'room-list'
})
export class RoomListPage implements OnInit {

  organisation: Organisation;
  rooms: List<Room>;

  constructor(private currentItems: CurrentItems, private _roomLoader: RoomLoader,
              private _httpClient: RoomHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _dialog: MatDialog) {
    this.organisation = currentItems.get('organisation');
  }

  async ngOnInit() {
    this.rooms = await this._roomLoader.loadByOrganisation(this.organisation);
  }

  openAddRoomDialog() {
    const modalRef = this._dialog.open(RoomAddComponent, {data: {organisation: Organisation}});
    modalRef.componentInstance.organisation = this.organisation;
    modalRef.afterClosed().subscribe(result => {
      if(result) {
        this.rooms.insert(0, result);
      }
    })
  }


  delete(room: Room) {
    const result = this._confirmation.open("Voulez-vous Supprimer cette salle?");
    result.accept.subscribe(async () => {
      await this._httpClient.delete(room.id);
      this.rooms.remove(room);
      this._alertEmitter.info("La salle a été supprimée!")
    })
  }
}
