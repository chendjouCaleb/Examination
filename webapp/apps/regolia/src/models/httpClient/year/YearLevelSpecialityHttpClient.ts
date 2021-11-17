import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {LevelSpeciality, YearLevel, YearLevelSpeciality, YearSpeciality} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class YearLevelSpecialityHttpClient extends GenericHttpClient<YearLevelSpeciality, number> {
  url: string = SERVER_URL + '/yearLevelSpecialities';

  createFromAny(value: any): YearLevelSpeciality {
    return new YearLevelSpeciality(value);
  }

  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<YearLevelSpeciality>> {
    return this.list({levelSpecialityId: levelSpeciality.id});
  }

  listByYearLevel(yearLevel: YearLevel): Promise<List<YearLevelSpeciality>> {
    return this.list({yearLevelId: yearLevel.id});
  }

  listByYearSpeciality(yearSpeciality: YearSpeciality): Promise<List<YearLevelSpeciality>> {
    return this.list({yearSpecialityId: yearSpeciality.id});
  }
}
