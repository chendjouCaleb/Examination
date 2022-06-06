import {Component, Input} from "@angular/core";
import {Room} from "examination/entities";

@Component({
  templateUrl: 'room-page.html',
  selector: 'RoomPage, room-page'
})
export class RoomPage {
  @Input()
  room: Room;
}
