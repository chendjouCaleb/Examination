import {Component} from "@angular/core";
import {Room} from "../../../models";
import {CurrentItems} from "../../current-items";

@Component({
  templateUrl: 'room-home.page.html',
  selector: 'app-room-home'
})
export class RoomHomePage {
  room: Room;

  constructor(currentItems: CurrentItems) {
    this.room = currentItems.get('room');
  }
}
