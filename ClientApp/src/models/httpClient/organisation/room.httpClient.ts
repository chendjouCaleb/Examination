import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Department, Level, Room, School} from "examination/entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";
import {RoomAddBody, RoomAddParams} from "../../form";


@Injectable()
export class RoomHttpClient extends GenericHttpClient<Room, number> {
  url: string = SERVER_URL + "/rooms";


  createFromAny(value: any): Room {
    return new Room(value);
  }

  addRoom(body: RoomAddBody, params: RoomAddParams) {
    return this.add(body, params);
  }

  async findByName(school: School, name: string): Promise<Room> {
    const result = this.httpClient.get(`${this.url}/find/name?schoolId=${school.id}&name=${name}`).toPromise();
    if(result) {
      return new Room(result);
    }
    return null;
  }

  listBySchool(school: School): Promise<List<Room>> {
    return this.listAsync({schoolId: school.id});
  }

  listByLevel(level: Level): Promise<List<Room>> {
    return this.listAsync({levelId: level.id});
  }

  listByDepartment(department: Department): Promise<List<Room>> {
    return this.listAsync({departmentId: department.id});
  }
}
