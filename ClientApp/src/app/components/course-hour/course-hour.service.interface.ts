import {Course, CourseHour} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const COURSE_HOUR_SERVICE_TOKEN = new InjectionToken<ICourseHourService>('COURSE_HOUR_SERVICE_TOKEN');

export interface ICourseHourService {
  details(courseHour: CourseHour);

  addCourseHour(course: Course): Promise<CourseHour>;

  deleteCourseHour(courseHour: CourseHour): Promise<boolean>;

  isLecture(courseHour: CourseHour): Promise<boolean>;
}
