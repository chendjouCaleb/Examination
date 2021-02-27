import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Course, CourseTeacher, Teacher} from 'examination/entities';
import {Injectable} from '@angular/core';
import {CourseTeacherAddBodyModel} from 'examination/models';


@Injectable()
export class CourseTeacherHttpClient extends GenericHttpClient<CourseTeacher, number> {
  url: string = SERVER_URL + '/courseTeachers';


  createFromAny(value: any): CourseTeacher {
    return new CourseTeacher(value);
  }

  addCourseTeacher(course: Course, teacher: Teacher, model: CourseTeacherAddBodyModel): Promise<CourseTeacher> {
    return this.add(model, {courseId: course.id, teacherId: teacher.id});
  }

  isTutorial(courseTeacher: CourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseTeacher.id}/tutorial`, {}).toPromise();
  }

  isLecture(courseTeacher: CourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseTeacher.id}/lecture`, {}).toPromise();
  }

  isPrincipal(courseTeacher: CourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseTeacher.id}/principal`, {}).toPromise();
  }
}
