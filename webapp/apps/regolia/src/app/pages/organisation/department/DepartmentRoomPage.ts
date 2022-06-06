import {Component, Inject, ViewChild} from "@angular/core";
import {Department, Room} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {IRoomService, ROOM_SERVICE_TOKEN, RoomList} from "@examination/components";
import {RoomHttpClient} from "@examination/http";

@Component({
  template: `
    <div class="p-2 ms-depth-8" *ngIf="department.isPrincipalUser">
      <MsActionMenu>
        <button MsActionMenuButton icon="Add" (click)="addRoom()">Ajouter une salle</button>
      </MsActionMenu>
    </div>

    <h4 class="mt-3">Salles de cours</h4>

    <RoomList #roomList class="m-4" [roomUrlFn]="roomUrlFn"></RoomList>
  `
})
export class DepartmentRoomPage {
  department: Department;
  rooms: Array<Room>

  @ViewChild('roomList')
  roomList: RoomList;

  roomUrlFn = (room: Room) => this.department.url + `/rooms/${room.id}`;


  constructor(items: CurrentItems, public _router: Router,
              @Inject(ROOM_SERVICE_TOKEN) private _service: IRoomService,
              private _httpClient: RoomHttpClient) {
    this.department = items.get('department');
  }

  async ngOnInit() {
    this.rooms = await this._httpClient.listByDepartment(this.department);
    this.roomList.addRooms(...this.rooms);
  }

  addRoom() {
    this._service.addRoom(this.department.school, this.department).then(room => {
      if(room) {
        this.roomList.addRooms(room);
      }
    })
  }
}
