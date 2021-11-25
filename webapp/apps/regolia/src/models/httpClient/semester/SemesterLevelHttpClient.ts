import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Level, YearDepartment, SemesterLevel, SemesterDepartment, YearLevel} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class SemesterLevelHttpClient extends GenericHttpClient<SemesterLevel, number> {
  url: string = SERVER_URL + '/semesterLevels';

  createFromAny(value: any): SemesterLevel {
    return new SemesterLevel(value);
  }

  listByLevel(level: Level): Promise<List<SemesterLevel>> {
    return this.list({levelId: level.id});
  }

  listByYearLevel(yearLevel: YearLevel): Promise<List<SemesterLevel>> {
    return this.list({yearLevelId: yearLevel.id});
  }

  listBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<List<SemesterLevel>> {
    return this.list({semesterDepartmentId: semesterDepartment.id});
  }
}
