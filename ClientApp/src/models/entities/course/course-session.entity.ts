import {CourseHour} from './course-hour.entity';
import {Entity} from '../entity';
import {CourseTeacher} from './course-teacher.entity';
import {Room} from '../organisation';
import {Course} from './course.entity';

export class CourseSession extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.lecture = value.lecture;
    this.objective = value.objective;
    this.report = value.report;
    this.presence = value.presence;

    this.roomId = value.roomId;
    this.courseId = value.courseId;
    this.courseTeacherId = value.courseTeacherId;

    this.expectedStartDate = new Date(value.expectedStartDate);
    this.expectedEndDate = new Date(value.expectedEndDate);
    this.startDate = new Date(value.startDate);
    this.endDate = new Date(value.endDate);
  }

  lecture: boolean;
  objective: string;
  report: string;
  presence: number;

  courseTeacherId: number;
  courseTeacher: CourseTeacher;

  courseHour: CourseHour;
  courseHourId: number;

  room: Room;
  roomId: number;

  courseId: number;
  course: Course;

  expectedStartDate: Date;
  expectedEndDate: Date;

  startDate: Date;
  endDate: Date;


  get url(): string {
    return `${this.course.url}/hours/${this.id}`;
  }

}
