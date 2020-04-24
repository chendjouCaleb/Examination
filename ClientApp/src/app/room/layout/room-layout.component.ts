import {Component, Input} from "@angular/core";
import {Room} from "../../../models/entities";

@Component({
  templateUrl: 'room-layout.component.html',
  selector: 'app-room-layout'
})
export class RoomLayoutComponent {
  @Input()
  room: Room;
}
