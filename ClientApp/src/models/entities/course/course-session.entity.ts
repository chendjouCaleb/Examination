import {CourseHour} from './course-hour.entity';
import {Entity} from '../entity';
import {CourseTeacher} from './course-teacher.entity';
import {Room, School} from '../organisation';
import {Course} from './course.entity';
import {LocalTime} from '@js-joda/core';

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
    this.realStartDate = value.startDate ? new Date(value.startDate) : undefined;
    this.realEndDate = value.endDate ? new Date(value.endDate) : undefined;
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

  realStartDate: Date;
  realEndDate: Date;

  get startDate(): Date {
    return this.realStartDate || this.expectedStartDate;
  }

  get endDate(): Date {
    return this.realEndDate || this.expectedEndDate;
  }

  isTeacher: boolean = false;

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
    return !this.realStartDate;
  }

  get finished(): boolean {
    return !!this.realEndDate;
  }

  get progress(): boolean {
    return !!this.realStartDate && !this.realEndDate;
  }

  get school(): School {
    return this.room.school;
  }

  get canEdit() {
    return !this.finished && this.school.isPlanner;
  }


  get url(): string {
    return `${this.course.url}/hours/${this.id}`;
  }

}
