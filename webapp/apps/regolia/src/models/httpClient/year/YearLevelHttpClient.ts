import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Level, YearDepartment, YearLevel} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class YearLevelHttpClient extends GenericHttpClient<YearLevel, number> {
  url: string = SERVER_URL + '/yearLevels';

  createFromAny(value: any): YearLevel {
    return new YearLevel(value);
  }

  listByLevel(level: Level): Promise<List<YearLevel>> {
    return this.list({levelId: level.id});
  }

  listByYearDepartment(yearDepartment: YearDepartment): Promise<List<YearLevel>> {
    return this.list({yearDepartmentId: yearDepartment.id});
  }
}
