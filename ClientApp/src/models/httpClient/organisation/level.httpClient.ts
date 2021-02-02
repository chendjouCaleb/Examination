import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Department, Level} from "examination/entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";
import {LevelAddParams} from "../../form";


@Injectable()
export class LevelHttpClient extends GenericHttpClient<Level, number> {
  url: string = SERVER_URL + "/levels";


  createFromAny(value: any): Level {
    return new Level(value);
  }


  async addLevel(department: Department, params: LevelAddParams) {
    return this.add({}, {...params, departmentId: department.id});
  }

  listByDepartment(department: Department): Promise<List<Level>> {
    return this.listAsync({departmentId: department.id});
  }

}
