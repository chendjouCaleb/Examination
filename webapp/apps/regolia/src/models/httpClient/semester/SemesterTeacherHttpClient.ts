import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {
  Teacher,
  YearDepartment,
  SemesterTeacher,
  SemesterDepartment,
  YearTeacher,
  SemesterLevel, Year, Semester, SemesterLevelSpeciality
} from "examination/entities";
import {List} from "@positon/collections";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class SemesterTeacherHttpClient extends GenericHttpClient<SemesterTeacher, number> {
  url: string = SERVER_URL + '/semesterTeachers';

  createFromAny(value: any): SemesterTeacher {
    return new SemesterTeacher(value);
  }

  async addAll(semester: Semester): Promise<SemesterTeacher[]> {
    const items = await this.httpClient.post<any[]>(`${this.url}/addAll`, {}, {params: {semesterId: semester.id}}).toPromise();
    return items.map(v => new SemesterTeacher(v));
  }

  async addAllDepartmentTeachers(semester: Semester): Promise<SemesterTeacher[]> {
    const items = await this.httpClient.post<any[]>(`${this.url}/addAllDepartment`, {}, {params: {semesterId: semester.id}}).toPromise();
    return items.map(v => new SemesterTeacher(v));
  }

  async addTeacher(yearTeacher: YearTeacher,
                   semesterDepartment: SemesterDepartment): Promise<SemesterTeacher> {
    return this.add({}, {
      yearTeacherId: yearTeacher.id,
      semesterDepartmentId: semesterDepartment.id
    })
  }

  listByTeacher(teacher: Teacher): Promise<List<SemesterTeacher>> {
    return this.list({teacherId: teacher.id});
  }

  listByYearTeacher(yearTeacher: YearTeacher): Promise<List<SemesterTeacher>> {
    return this.list({yearTeacherId: yearTeacher.id});
  }

  listBySemester(semester: Semester): Promise<List<SemesterTeacher>> {
    return this.list({semesterId: semester.id});
  }

  listBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<List<SemesterTeacher>> {
    return this.list({semesterDepartmentId: semesterDepartment.id});
  }
}
