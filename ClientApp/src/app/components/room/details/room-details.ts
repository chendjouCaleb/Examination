﻿import {Component, Inject, Input} from '@angular/core';
import {Room} from 'examination/entities';
import {ROOM_SERVICE_TOKEN, IRoomService} from '../room.service.interface';
import {MsfModalRef} from 'fabric-docs';

@Component({
  templateUrl: 'room-details.html',
  selector: 'app-room-details'
})
export class RoomDetails {
  @Input()
  room: Room;


  constructor(@Inject(ROOM_SERVICE_TOKEN) public service: IRoomService,
              private _modalRef: MsfModalRef<RoomDetails>) {
  }

  delete() {
    this.service.deleteRoom(this.room).then(() => this._modalRef?.close());
  }

}
