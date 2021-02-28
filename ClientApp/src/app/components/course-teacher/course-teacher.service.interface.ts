import {Course, CourseTeacher} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const COURSE_TEACHER_SERVICE_TOKEN = new InjectionToken<ICourseTeacherService>('COURSE_TEACHER_SERVICE_TOKEN');

export interface ICourseTeacherService {
  details(courseTeacher: CourseTeacher);

  addCourseTeacher(course: Course): Promise<CourseTeacher>;

  deleteCourseTeacher(courseTeacher: CourseTeacher): Promise<boolean>;

  isLecture(courseTeacher: CourseTeacher): Promise<boolean>;

  isPrincipal(courseTeacher: CourseTeacher): Promise<boolean>;

  isTutorial(courseTeacher: CourseTeacher): Promise<boolean>;
}
