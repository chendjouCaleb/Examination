import {Component} from '@angular/core';
import {Room} from 'examination/entities';
import {RoomLoader} from 'examination/loaders';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'room.page-layout.html',
  selector: 'app-room-page-layout'
})
export class RoomPageLayout {
  room: Room;

  constructor(private route: ActivatedRoute, private loader: RoomLoader) {
    const id = + route.snapshot.paramMap.get('roomId');

    this.loader.loadById(id).then(room => this.room = room);
  }
}
