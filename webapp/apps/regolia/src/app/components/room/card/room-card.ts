import {Component, Input} from "@angular/core";
import {Room} from "examination/entities";

@Component({
  templateUrl: 'room-card.html',
  selector: 'RoomCard, [RoomCard]',
  styleUrls: ['room-card.scss'],
  host: {
    class: 'ms-cardBackgroundColor ms-cardBackgroundColor--hover'
  }
})
export class RoomCard {
  @Input()
  room: Room;
}
