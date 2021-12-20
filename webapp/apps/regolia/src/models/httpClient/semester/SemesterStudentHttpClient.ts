import {Injectable} from "@angular/core";
import {GenericHttpClient, SERVER_URL} from "../httpClient";
import {
  Student,
  YearDepartment,
  SemesterStudent,
  SemesterDepartment,
  YearStudent,
  SemesterLevel, Year, Semester, SemesterLevelSpeciality
} from "examination/entities";
import {List} from "@positon/collections";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class SemesterStudentHttpClient extends GenericHttpClient<SemesterStudent, number> {
  url: string = SERVER_URL + '/semesterStudents';

  createFromAny(value: any): SemesterStudent {
    return new SemesterStudent(value);
  }

  async addAll(semester: Semester): Promise<SemesterStudent[]> {
    const items = await this.httpClient.post<any[]>(`${this.url}/addAll`, {}, {params: {semesterId: semester.id}}).toPromise();
    return items.map(v => new SemesterStudent(v));
  }

  async addAllDepartment(semesterDepartment: SemesterDepartment): Promise<SemesterStudent[]> {
    const items = await this.httpClient.post<any[]>(`${this.url}/addAllDepartment`, {},
      {params: {semesterDepartmentId: semesterDepartment.id}}).toPromise();
    return items.map(v => new SemesterStudent(v));
  }

  async addAllLevelStudents(semesterLevel: SemesterLevel): Promise<SemesterStudent[]> {
    const items = await this.httpClient.post<any[]>(`${this.url}/addAllLevel`, {},
      {params: {semesterLevelId: semesterLevel.id}}).toPromise();
    return items.map(v => new SemesterStudent(v));
  }

  async addStudent(yearStudent: YearStudent,
                   semesterLevel: SemesterLevel,
                   semesterLevelSpeciality: SemesterLevelSpeciality): Promise<SemesterStudent> {
    return this.add({}, {
      yearStudentId: yearStudent.id,
      semesterLevelId: semesterLevel.id,
      semesterLevelSpecialityId: semesterLevelSpeciality.id
    })
  }

  listByStudent(student: Student): Promise<List<SemesterStudent>> {
    return this.list({studentId: student.id});
  }

  listByYearStudent(yearStudent: YearStudent): Promise<List<SemesterStudent>> {
    return this.list({yearStudentId: yearStudent.id});
  }

  listBySemesterLevel(semesterLevel: SemesterLevel): Promise<List<SemesterStudent>> {
    return this.list({semesterLevelId: semesterLevel.id});
  }

  listBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<List<SemesterStudent>> {
    return this.list({semesterDepartmentId: semesterDepartment.id});
  }
}
