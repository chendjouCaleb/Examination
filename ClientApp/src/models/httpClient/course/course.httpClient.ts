import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Course, Department, Level, LevelSpeciality, Speciality} from 'examination/entities';
import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {CourseAddParams, CourseBodyModel} from "examination/models";


@Injectable()
export class CourseHttpClient extends GenericHttpClient<Course, number> {
  url: string = SERVER_URL + '/courses';


  createFromAny(value: any): Course {
    return new Course(value);
  }

  async findByCode(department: Department, code: string): Promise<Course> {
    const result = await this.httpClient.get(`${this.url}/find/code?departmentId=${department.id}&code=${code}`).toPromise();
    if (result) {
      return new Course(result);
    }
    return null;
  }

  listByLevel(level: Level): Promise<List<Course>> {
    return this.listAsync({levelId: level.id});
  }


  listByLevelSpeciality(levelSpeciality: LevelSpeciality): Promise<List<Course>> {
    return this.listAsync({levelSpecialityId: levelSpeciality.id});
  }

  listBySpeciality(speciality: Speciality): Promise<List<Course>> {
    return this.listAsync({specialityId: speciality.id});
  }

  addCourse(model: CourseBodyModel, params: CourseAddParams): Promise<Course> {
    return this.add(model, params);
  }

  chapterText(course: Course, chapterText: string): Promise<void> {
    const form = new FormData();
    form.append('chapterText', chapterText);
    return this.httpClient.put<void>(`${this.url}/${course.id}/chapterText`, form).toPromise();
  }

  general(course: Course): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${course.id}/general`, {}).toPromise();
  }

  async restrictCourse(course: Course, id: number[]): Promise<void> {
    const levelSpecialityId = id.map(i => i.toString());
    return this.httpClient.put<void>(`${this.url}/${course.id}/restrict`, {},
      {params: {levelSpecialityId}}).toPromise();
  }
}
