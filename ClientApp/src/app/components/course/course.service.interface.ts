import {Course, CourseLevelSpeciality, Level, LevelSpeciality, Score} from 'examination/entities';
import {InjectionToken} from '@angular/core';

export const COURSE_SERVICE_TOKEN = new InjectionToken<ICourseService>('COURSE_SERVICE_TOKEN');

export interface ICourseService {
  addCourse(level: Level): Promise<Course>;

  deleteCourse(course: Course): Promise<boolean>;

  editCourse(course: Course): Promise<void>;
  chapterText(course: Course): Promise<void>;

  addScore(course: Course): Promise<Score>;

  deleteScore(score: Score): Promise<boolean>;

  addCourseLevelSpeciality(course?: Course, levelSpeciality?: LevelSpeciality): Promise<CourseLevelSpeciality>;

  removeCourseLevelSpeciality(courseLevelSpeciality: CourseLevelSpeciality): Promise<void>;


  general(course: Course): Promise<boolean>;

  restrict(course: Course): Promise<void>;

  details(course: Course);
}
