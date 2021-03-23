import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, CourseHour, CourseTeacher, Level, Room, Student, Teacher} from 'examination/entities';
import {MsTable} from '@ms-fluent/table';
import {CourseHourLoader} from 'examination/loaders';
import {COURSE_HOUR_SERVICE_TOKEN, ICourseHourService} from '../course-hour.service.interface';
import {List} from '@positon/collections';
import {Locale} from '@js-joda/locale_fr';
import {DayOfWeek, TextStyle} from "@js-joda/core";

@Component({
  templateUrl: 'course-hour-list.html',
  selector: 'app-course-hour-list'
})
export class CourseHourList implements OnInit {
  @Input()
  room: Room;

  @Input()
  course: Course;

  @Input()
  teacher: Teacher;

  @Input()
  courseTeacher: CourseTeacher;

  @Input()
  level: Level;

  @Input()
  student: Student;

  @Input()
  hiddenColumns: string[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  courseHours: CourseHour[] = [];

  sortFn = (c1: CourseHour, c2: CourseHour) => c1.startTime - c2.startTime;

  constructor(private _courseHourLoader: CourseHourLoader,
              @Inject(COURSE_HOUR_SERVICE_TOKEN) public service: ICourseHourService) {
  }

  async ngOnInit() {
    if (this.room) {
      await this._courseHourLoader.loadByRoom(this.room);
    }

    if (this.course) {
      await this._courseHourLoader.loadByCourse(this.course);
    }

    if (this.courseTeacher) {
      await this._courseHourLoader.loadByCourseTeacher(this.courseTeacher);
    }

    if (this.teacher) {
      await this._courseHourLoader.loadByTeacher(this.teacher);
    }

    if (this.level) {
      await this._courseHourLoader.loadByLevel(this.level);
    }


    let coursesHours = this.getCourseHours().toArray();
    coursesHours = coursesHours.sort(this.sortFn);
    this.table.unshift(...coursesHours);
  }


  addCourseHour() {
    this.service.addCourseHour(this.level).then(course => {
      if (course) {
        this.table.unshift(course);
        this.table.hiddenColumns = (this.hiddenColumns);
      }
    });
  }

  delete(item: CourseHour) {
    this.service.deleteCourseHour(item).then(result => {
      if (result) {
        this.table.remove(item);
      }
    })
  }

  getCourseHours(): List<CourseHour> {
    if (this.room) {
      return this.room.courseHours;
    }

    if (this.course) {
      return this.course.courseHours;
    }

    if (this.courseTeacher) {
      return this.courseTeacher.courseHours;
    }

    if (this.teacher) {
      return this.teacher.courseHours;
    }

    if (this.level) {
      return this.level.courseHours;
    }

    return new List<CourseHour>();
  }

  get canAdd(): boolean {
    return (this.level && this.level.department.school.isPlanner)
  }

  day(v: DayOfWeek) {
    return v.getDisplayName(TextStyle.FULL_STANDALONE, Locale.FRANCE);
  }
}
