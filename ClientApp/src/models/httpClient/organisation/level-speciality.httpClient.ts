import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Level, LevelSpeciality, Speciality} from "examination/entities";
import {Injectable} from "@angular/core";
import {List} from "@positon/collections";


@Injectable()
export class LevelSpecialityHttpClient extends GenericHttpClient<LevelSpeciality, number> {
  url: string = SERVER_URL + "/levelSpecialities";


  createFromAny(value: any): LevelSpeciality {
    return new LevelSpeciality(value);
  }


  async addLevelSpeciality(level: Level, speciality: Speciality) {
    return this.add({}, {levelId: level.id, specialityId: speciality.id});
  }

  listByLevel(level: Level): Promise<List<LevelSpeciality>> {
    return this.listAsync({levelId: level.id});
  }

}
