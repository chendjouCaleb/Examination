import {Course, CourseSession} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const COURSE_SESSION_SERVICE_TOKEN = new InjectionToken<ICourseSessionService>('COURSE_SESSION_SERVICE_TOKEN');

export interface ICourseSessionService {
  details(courseSession: CourseSession);

  addCourseSession(course: Course): Promise<CourseSession>;

  deleteCourseSession(courseSession: CourseSession): Promise<boolean>;

  isLecture(courseSession: CourseSession): Promise<boolean>;
}
