import {Component, Inject, Input} from '@angular/core';
import {Room} from 'examination/entities';
import {IRoomService, ROOM_SERVICE_TOKEN} from 'examination/app/components';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'room-home.page.html',
  selector: 'app-room-home-page'
})
export class RoomHomePage {
  @Input()
  room: Room;

  constructor(@Inject(ROOM_SERVICE_TOKEN) public _roomService: IRoomService,
              private router: Router) {
  }

  delete() {
    this._roomService.deleteRoom(this.room).then(result => {
      if (result) {
        this.router.navigate([`${this.room.url}`], { queryParams: {tab: 'rooms'}}).then();
      }
    })
  }
}
