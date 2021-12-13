import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {
  SemesterCourse,
  Department,
  Level,
  LevelSpeciality,
  Speciality,
  SemesterLevelSpeciality, Semester, SemesterLevel, SemesterDepartment, SemesterSpeciality
} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {SemesterCourseAddBodyModel, SemesterCourseAddParams, SemesterCourseEditModel} from "../../form";


@Injectable()
export class SemesterCourseHttpClient extends GenericHttpClient<SemesterCourse, number> {
  url: string = SERVER_URL + '/semesterCourses';

  createFromAny(value: any): SemesterCourse {
    return new SemesterCourse(value);
  }

  async findByCode(department: Department, code: string): Promise<SemesterCourse> {
    const result = await this.httpClient.get(`${this.url}/find/code?departmentId=${department.id}&code=${code}`).toPromise();
    if (result) {
      return new SemesterCourse(result);
    }
    return null;
  }

  listByLevel(level: Level): Promise<List<SemesterCourse>> {
    return this.listAsync({levelId: level.id});
  }

  listBySemesterLevel(semesterLevel: SemesterLevel): Promise<List<SemesterCourse>> {
    return this.listAsync({semesterLevelId: semesterLevel.id});
  }

  listBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<List<SemesterCourse>> {
    return this.listAsync({semesterDepartmentId: semesterDepartment.id});
  }

  listBySemesterSpeciality(semesterSpeciality: SemesterSpeciality): Promise<List<SemesterCourse>> {
    return this.listAsync({semesterSpecialityId: semesterSpeciality.id});
  }

  listBySemester(semester: Semester): Promise<List<SemesterCourse>> {
    return this.listAsync({semesterId: semester.id});
  }


  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<SemesterCourse>> {
    return this.listAsync({levelSpecialityId: levelSpeciality.id});
  }

  listBySpeciality(speciality: Speciality): Promise<List<SemesterCourse>> {
    return this.listAsync({specialityId: speciality.id});
  }

  addSemesterCourse(model: SemesterCourseAddBodyModel, params: SemesterCourseAddParams): Promise<SemesterCourse> {
    return this.add(model, params);
  }

  editSemesterCourse(semesterCourse: SemesterCourse, model: SemesterCourseEditModel): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${semesterCourse.id}`, model).toPromise();
  }

  general(semesterCourse: SemesterCourse): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${semesterCourse.id}/general`, {}).toPromise();
  }

  restrict(semesterCourse: SemesterCourse, semesterLevelSpecialities: SemesterLevelSpeciality[]): Promise<void> {
    const id = semesterLevelSpecialities.map(s => s.id);
    return this.httpClient.put<void>(`${this.url}/${semesterCourse.id}/restrict`, {}, {params: {id}}).toPromise();
  }

  async addAddSemester(semester: Semester): Promise<SemesterCourse[]> {
    const resultItems = await this.httpClient.post<SemesterCourse[]>(`${this.url}/addAll`, {},
      {params: {semesterId: semester.id}}).toPromise();

    return resultItems.map(s => new SemesterCourse(s));
  }

  async addAddSemesterDepartment(semesterDepartment: SemesterDepartment): Promise<SemesterCourse[]> {
    const resultItems = await this.httpClient.post<SemesterCourse[]>(`${this.url}/addAllSemesterDepartment`, {},
      {params: {semesterDepartmentId: semesterDepartment.id}}).toPromise();

    return resultItems.map(s => new SemesterCourse(s));
  }

  async addAddSemesterLevel(semesterLevel: SemesterLevel): Promise<SemesterCourse[]> {
    const resultItems = await this.httpClient.post<SemesterCourse[]>(`${this.url}/addAllSemesterLevel`, {},
      {params: {semesterLevelId: semesterLevel.id}}).toPromise();

    return resultItems.map(s => new SemesterCourse(s));
  }
}
