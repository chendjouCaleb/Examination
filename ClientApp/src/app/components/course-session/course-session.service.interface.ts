import {Course, CourseSession, CourseTeacher, Level, Room} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const COURSE_SESSION_SERVICE_TOKEN = new InjectionToken<ICourseSessionService>('COURSE_SESSION_SERVICE_TOKEN');

export interface ICourseSessionService {
  details(courseSession: CourseSession);

  addCourseSession(level: Level, course: Course): Promise<CourseSession>;

  deleteCourseSession(courseSession: CourseSession): Promise<boolean>;

  isLecture(courseSession: CourseSession): Promise<boolean>;

  changeHour(courseSession: CourseSession): Promise<void>;

  report(courseSession: CourseSession): Promise<void>;

  objective(courseSession: CourseSession): Promise<void>;

  changeRoom(courseSession: CourseSession): Promise<Room>;

  changeTeacher(courseSession: CourseSession): Promise<CourseTeacher>;
}
