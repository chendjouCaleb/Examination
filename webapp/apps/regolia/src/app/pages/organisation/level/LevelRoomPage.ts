import {Component, Inject, ViewChild} from "@angular/core";
import {Department, Level, Room} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {IRoomService, ROOM_SERVICE_TOKEN, RoomList} from "@examination/components";
import {RoomHttpClient} from "@examination/http";

@Component({
  template: `
    <div class="p-2 ms-depth-8" *ngIf="level?.department.isPrincipalUser">
      <MsActionMenu>
        <button MsActionMenuButton icon="Add" (click)="addRoom()">Ajouter une salle</button>
      </MsActionMenu>
    </div>

    <h4 class="mt-3">Salles de cours</h4>

    <RoomList #roomList class="m-4" [roomUrlFn]="roomUrlFn"></RoomList>
  `
})
export class LevelRoomPage {
  level: Level;

  rooms: Array<Room>

  @ViewChild('roomList')
  roomList: RoomList;

  roomUrlFn = (room: Room) => this.level.url + `/rooms/${room.id}`;


  constructor(items: CurrentItems, public _router: Router,
              @Inject(ROOM_SERVICE_TOKEN) private _service: IRoomService,
              private _httpClient: RoomHttpClient) {
    this.level = items.get('level');
  }

  async ngOnInit() {
    this.rooms = await this._httpClient.listByLevel(this.level);
    this.roomList.addRooms(...this.rooms);
  }

  addRoom() {
    this._service.addRoom(this.department.school, this.department, this.level).then(room => {
      if (room) {
        this.roomList.addRooms(room);
      }
    })
  }

  get department(): Department {
    return this.level.department;
  }
}
