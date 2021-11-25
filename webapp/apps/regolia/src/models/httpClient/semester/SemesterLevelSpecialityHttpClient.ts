import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {
  LevelSpeciality,
  SemesterLevel,
  SemesterLevelSpeciality,
  SemesterSpeciality,
  YearLevelSpeciality
} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class SemesterLevelSpecialityHttpClient extends GenericHttpClient<SemesterLevelSpeciality, number> {
  url: string = SERVER_URL + '/semesterLevelSpecialities';

  createFromAny(value: any): SemesterLevelSpeciality {
    return new SemesterLevelSpeciality(value);
  }

  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<SemesterLevelSpeciality>> {
    return this.list({levelSpecialityId: levelSpeciality.id});
  }

  listByYearLevelSpeciality(yearLevelSpeciality: YearLevelSpeciality): Promise<List<SemesterLevelSpeciality>> {
    return this.list({yearLevelSpecialityId: yearLevelSpeciality.id});
  }

  listBySemesterLevel(semesterLevel: SemesterLevel): Promise<List<SemesterLevelSpeciality>> {
    return this.list({semesterLevelId: semesterLevel.id});
  }

  listBySemesterSpeciality(semesterSpeciality: SemesterSpeciality): Promise<List<SemesterLevelSpeciality>> {
    return this.list({semesterSpecialityId: semesterSpeciality.id});
  }
}
