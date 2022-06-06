import {Component, Inject, OnInit, ViewChild} from "@angular/core";
import {Room, School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {RoomHttpClient} from "@examination/http";
import {IRoomService, ROOM_SERVICE_TOKEN, RoomList} from "@examination/components";

@Component({
  template: `
    <div class="p-2 ms-depth-8" *ngIf="school.isPrincipalUser">
      <MsActionMenu >
        <button MsActionMenuButton icon="Add" (click)="addRoom()">Ajouter une salle</button>
      </MsActionMenu>
    </div>

    <h4 class="mt-3">Salles de cours</h4>

    <RoomList #roomList class="m-4"></RoomList>`
})
export class SchoolRoomPage implements OnInit {
  school: School;
  rooms: Room[]

  @ViewChild('roomList')
  roomList: RoomList;

  constructor(items: CurrentItems, public _router: Router,
              @Inject(ROOM_SERVICE_TOKEN) private _service: IRoomService,
              private _httpClient: RoomHttpClient) {
    this.school = items.get('school');
  }

  async ngOnInit() {
    this.rooms = await this._httpClient.listBySchool(this.school);
    console.log(this.rooms.length)
    this.roomList.addRooms(...this.rooms);
  }

  addRoom() {
    this._service.addRoom(this.school).then(room => {
      if(room) {
        this.roomList.addRooms(room);
      }
    })
  }
}
