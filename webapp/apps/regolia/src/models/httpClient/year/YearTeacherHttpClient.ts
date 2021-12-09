import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {
  Teacher,
  Year, YearDepartment,
  YearLevel,
  YearLevelSpeciality,
  YearSpeciality,
  YearStudent,
  YearTeacher
} from "examination/entities";
import {List} from "@positon/collections";

@Injectable()
export class YearTeacherHttpClient extends GenericHttpClient<YearTeacher, number> {
  url: string = SERVER_URL + '/yearTeachers';

  createFromAny(value: any): YearTeacher {
    return new YearTeacher(value);
  }

  async addAll(year: Year): Promise<YearTeacher[]> {
    const results = await this.httpClient.post<YearTeacher[]>(`${this.url}/addAll`, {}, {params: {yearId: year.id}})
      .toPromise();

    return results.map(y => new YearTeacher(y));
  }

  listByTeacher(teacher: Teacher): Promise<List<YearTeacher>> {
    return this.list({teacherId: teacher.id});
  }

  listByYear(year: Year): Promise<List<YearTeacher>> {
    return this.list({yearId: year.id});
  }

  listByYearDepartment(yearDepartment: YearDepartment): Promise<List<YearTeacher>> {
    return this.list({yearDepartmentId: yearDepartment.id});
  }

  listByYearSpeciality(yearSpeciality: YearSpeciality): Promise<List<YearTeacher>> {
    return this.list({yearSpecialityId: yearSpeciality.id});
  }

  listByYearLevelSpeciality(yearLevelSpeciality: YearLevelSpeciality): Promise<List<YearTeacher>> {
    return this.list({yearLevelSpecialityId: yearLevelSpeciality.id});
  }

  listByUser(userId: string): Promise<List<YearTeacher>> {
    return this.list({userId});
  }
}
