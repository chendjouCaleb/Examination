import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Department, Level, Room, School} from 'examination/entities';
import {RoomLoader} from 'examination/loaders';
import {IRoomService, ROOM_SERVICE_TOKEN} from '../room.service.interface';
import {List} from '@positon/collections';
import {MsTable} from '@ms-fluent/table';

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

  rooms: Array<Room> = [];

  @ViewChild(MsTable)
  table: MsTable;

  isLoading: boolean = true;

  constructor(private _roomLoader: RoomLoader,
              @Inject(ROOM_SERVICE_TOKEN) public service: IRoomService) {
  }

  async ngOnInit() {
    try {
      await this.loadRooms();
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }

  async loadRooms() {
    if (this.department) {
      await this._roomLoader.loadByDepartment(this.department);
    }

    if (this.school) {
      await this._roomLoader.loadBySchool(this.school);
    }

    if (this.level) {
      await this._roomLoader.loadByLevel(this.level);
    }

    this.table.unshift(...this.getRooms().toArray());
  }


  addRoom() {
    this.service.addRoom(this.school, this.department, this.level).then(room => {
      if (room) {
        this.table.unshift(room);
      }
    });
  }

  deleteRoom(room: Room) {
    this.service.deleteRoom(room).then(deleted => {
      if (deleted) {
        this.table.remove(room);
      }
    });
  }

  getRooms(): List<Room> {
    if (this.school) {
      return this.school.rooms;
    }

    if (this.department) {
      return this.department.rooms;
    }

    if (this.level) {
      return this.level.rooms;
    }

    return new List<Room>();
  }

  get _school(): School {
    if (this.school) {
      return this.school;
    }
    if (this.department) {
      return this.department.school;
    }

    if (this.level) {
      return this.level.department.school;
    }

  }
}
