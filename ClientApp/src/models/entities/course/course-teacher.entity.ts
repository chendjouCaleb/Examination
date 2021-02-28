import {List} from '@positon/collections';
import {Teacher} from '../member';
import {Course} from './course.entity';
import {CourseHour} from './course-hour.entity';
import {CourseSession} from './course-session.entity';
import {Entity} from '../entity';


export class CourseTeacher extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.tutorial = value.tutorial;
    this.lecture = value.lecture;
    this.isPrincipal = value.isPrincipal;

    this.teacherId = value.teacherId;
    this.courseId = value.courseId;
  }

  tutorial: boolean;
  lecture: boolean;
  isPrincipal: boolean;

  teacherId: number;
  teacher: Teacher;

  courseId: number;
  course: Course;

  courseHours: List<CourseHour>;
  courseSessions: List<CourseSession>;

  get url(): string {
    return `${this.course.url}/teachers/${this.id}`;
  }

  get courseName(): string {
    return this.course.name;
  }

  get levelIndex(): number {
    return this.course.level.index;
  }

}
