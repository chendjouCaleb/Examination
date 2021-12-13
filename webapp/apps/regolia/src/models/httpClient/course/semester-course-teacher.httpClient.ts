import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {SemesterCourse, SemesterCourseTeacher, SemesterTeacher, Teacher} from 'examination/entities';
import {Injectable} from '@angular/core';
import {CourseTeacherAddBodyModel} from "../../form";


@Injectable()
export class SemesterCourseTeacherHttpClient extends GenericHttpClient<SemesterCourseTeacher, number> {
  url: string = SERVER_URL + '/semesterCourseTeachers';


  createFromAny(value: any): SemesterCourseTeacher {
    return new SemesterCourseTeacher(value);
  }

  addSemesterCourseTeacher(semesterCourse: SemesterCourse, teacher: SemesterTeacher, model: CourseTeacherAddBodyModel): Promise<SemesterCourseTeacher> {
    return this.add(model, {semesterCourseId: semesterCourse.id, semesterTeacherId: teacher.id});
  }

  isTutorial(semesterCourseTeacher: SemesterCourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${semesterCourseTeacher.id}/tutorial`, {}).toPromise();
  }

  isLecture(semesterCourseTeacher: SemesterCourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${semesterCourseTeacher.id}/lecture`, {}).toPromise();
  }

  isPrincipal(semesterCourseTeacher: SemesterCourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${semesterCourseTeacher.id}/principal`, {}).toPromise();
  }
}
