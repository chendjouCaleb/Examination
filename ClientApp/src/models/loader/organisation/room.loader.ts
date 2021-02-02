import {Injectable} from "@angular/core";

import {DepartmentLoader} from "./department.loader";
import {SchoolLoader} from "./school.loader";
import {RoomHttpClient, UserHttpClient} from "examination/models/http";
import {Department, Level, Room, School} from "examination/entities";
import {EntityLoader} from "../entity-loader.interface";
import {LevelLoader} from "./level.loader";


@Injectable({providedIn: "root"})
export class RoomLoader implements EntityLoader<Room, number> {

  constructor(private roomRepository: RoomHttpClient,
              private _userHttClient: UserHttpClient,
              private _schoolLoader: SchoolLoader,
              private _levelLoader: LevelLoader,
              private _departmentLoader: DepartmentLoader) {
  }

  async load(item: Room): Promise<Room> {
    if (item.registerUserId) {
      item.registerUser = await this._userHttClient.findAsync(item.registerUserId);
    }

    if (item.departmentId) {
      item.department = await this._departmentLoader.loadById(item.departmentId);
    }

    if (item.levelId) {
      item.level = await this._levelLoader.loadById(item.levelId);
    }


    item.school = await this._schoolLoader.loadById(item.schoolId);
    return item;
  }

  async loadById(id: number): Promise<Room> {
    const item = await this.roomRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<void> {
    if(department.rooms) {
      return;
    }
    const rooms = await this.roomRepository.listAsync({departmentId: department.id});
    for (const room of rooms) {
      await this.load(room);
      room.department = department;
    }
    department.rooms = rooms;
  }

  async loadBySchool(school: School): Promise<void> {
    if(school.rooms) {
      return;
    }
    const rooms = await this.roomRepository.listAsync({schoolId: school.id});
    for (const room of rooms) {
      await this.load(room);
      room.school = school;
    }
    school.rooms = rooms;
  }

  async loadByLevel(level: Level): Promise<void> {
    if(level.rooms) {
      return;
    }
    const rooms = await this.roomRepository.listAsync({levelId: level.id});
    for (const room of rooms) {
      await this.load(room);
      room.level = level;
    }
    level.rooms = rooms;
  }
}
