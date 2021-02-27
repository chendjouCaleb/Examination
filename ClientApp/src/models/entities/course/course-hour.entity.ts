import {Course, CourseSession, CourseTeacher, Entity, Room} from 'examination/entities';
import {DayOfWeek, LocalTime} from '@js-joda/core';
import {List} from "@positon/collections";

export class CourseHour extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.lecture = value.lecture;

    this.roomId = value.roomId;
    this.courseId = value.courseId;
    this.courseTeacherId = value.courseTeacherId;

    this.dayOfWeek = DayOfWeek.of(value.dayOfWeek);
    this.startHour = LocalTime.parse(value.startHour);
    this.endHour = LocalTime.parse(value.endHour);
  }

  lecture: boolean;

  courseTeacherId: number;
  courseTeacher: CourseTeacher;

  room: Room;
  roomId: number;

  courseId: number;
  course: Course;

  dayOfWeek: DayOfWeek;
  startHour: LocalTime;
  endHour: LocalTime;

  courseSessions: List<CourseSession>;

  get url(): string {
    return `${this.course.url}/hours/${this.id}`;
  }

}
