import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {
  SemesterCourse,
  Department,
  Level,
  LevelSpeciality,
  Speciality,
  SemesterLevelSpeciality
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
}
