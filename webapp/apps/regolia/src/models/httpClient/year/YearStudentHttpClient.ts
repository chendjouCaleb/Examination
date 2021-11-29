import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {Student, Year, YearLevel, YearLevelSpeciality, YearSpeciality, YearStudent} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class YearStudentHttpClient extends GenericHttpClient<YearStudent, number> {
  url: string = SERVER_URL + '/yearStudents';

  createFromAny(value: any): YearStudent {
    return new YearStudent(value);
  }

  async addAll(year: Year): Promise<YearStudent[]> {
    const results = await this.httpClient.post<YearStudent[]>(`${this.url}/addAll`, {}, {params: {yearId: year.id}})
      .toPromise();

    return results.map(y => new YearStudent(y));
  }

  listByStudent(student: Student): Promise<List<YearStudent>> {
    return this.list({studentId: student.id});
  }

  listByYear(year: Year): Promise<List<YearStudent>> {
    return this.list({yearId: year.id});
  }

  listByYearLevel(yearLevel: YearLevel): Promise<List<YearStudent>> {
    return this.list({yearLevelId: yearLevel.id});
  }

  listByYearSpeciality(yearSpeciality: YearSpeciality): Promise<List<YearStudent>> {
    return this.list({yearSpecialityId: yearSpeciality.id});
  }

  listByYearLevelSpeciality(yearLevelSpeciality: YearLevelSpeciality): Promise<List<YearStudent>> {
    return this.list({yearLevelSpecialityId: yearLevelSpeciality.id});
  }

  listByUser(userId: string): Promise<List<YearStudent>> {
    return this.list({userId});
  }
}
