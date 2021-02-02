import {Component, Inject, Input, OnInit} from '@angular/core';
import {Department, Level, Room, School} from 'examination/entities';
import {RoomLoader} from 'examination/loaders';
import {IRoomService, ROOM_SERVICE_TOKEN} from '../room.service.interface';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'room-list.html',
  selector: 'app-room-list'
})
export class RoomList implements OnInit {
  @Input()
  school: School;

  @Input()
  department: Department;

  @Input()
  level: Level;

  constructor(
    private _roomLoader: RoomLoader,
    @Inject(ROOM_SERVICE_TOKEN) public service: IRoomService) {

  }

  async ngOnInit() {
    if (this.department) {
      await this._roomLoader.loadByDepartment(this.department);
    }

    if (this.school) {
      await this._roomLoader.loadBySchool(this.school);
    }

    if (this.level) {
      await this._roomLoader.loadByLevel(this.level);
    }
  }


  addRoom() {
    this.service.addRoom(this.school, this.department, this.level);
  }

  get rooms(): List<Room> {
    if (this.school) {
      return this.school.rooms;
    }

    if(this.department) {
      return this.department.rooms;
    }

    if(this.level) {
      return this.level.rooms;
    }

    return new List<Room>();
  }
}
