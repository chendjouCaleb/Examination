import {CourseHour} from './course-hour.entity';
import {Entity} from '../entity';
import {CourseTeacher} from './course-teacher.entity';
import {Room} from '../organisation';
import {Course} from './course.entity';
import {LocalTime} from "@js-joda/core";

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

  get courseName(): string {
    return this.course.name;
  }

  get levelIndex(): number {
    return this.course.level.index;
  }

  get expectedStartHour(): LocalTime {
    return LocalTime.of(this.expectedStartDate.getHours(), this.expectedStartDate.getMinutes());
  }

  get expectedEndHour(): LocalTime {
    return LocalTime.of(this.expectedEndDate.getHours(), this.expectedEndDate.getMinutes());
  }

  get startHour(): LocalTime {
    return LocalTime.of(this.startDate.getHours(), this.startDate.getMinutes());
  }

  get endHour(): LocalTime {
    return LocalTime.of(this.endDate.getHours(), this.endDate.getMinutes());
  }

  get waiting(): boolean {
    return !this.startDate;
  }

  get finished(): boolean {
    return !!this.endDate;
  }

  get progress(): boolean {
    return !!this.startDate && !this.endDate;
  }


  get url(): string {
    return `${this.course.url}/hours/${this.id}`;
  }

}
