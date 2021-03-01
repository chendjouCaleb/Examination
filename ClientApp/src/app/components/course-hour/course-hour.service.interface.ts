import {CourseHour, Level, Room} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const COURSE_HOUR_SERVICE_TOKEN = new InjectionToken<ICourseHourService>('COURSE_HOUR_SERVICE_TOKEN');

export interface ICourseHourService {
  details(courseHour: CourseHour);

  addCourseHour(level: Level): Promise<CourseHour>;

  deleteCourseHour(courseHour: CourseHour): Promise<boolean>;

  isLecture(courseHour: CourseHour): Promise<boolean>;

  changeRoom(courseHour: CourseHour): Promise<Room>;

  changeTeacher(courseHour: CourseHour): Promise<CourseHour>;
}
