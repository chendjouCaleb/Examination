import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, CourseHour, CourseSession, CourseTeacher, Level, Room, Teacher} from 'examination/entities';
import {MsTable} from '@ms-fluent/table';
import {CourseSessionLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {COURSE_SESSION_SERVICE_TOKEN, ICourseSessionService} from '../course-session.service.interface';

@Component({
  templateUrl: 'course-session-list.html',
  selector: 'app-course-session-list'
})
export class CourseSessionList implements OnInit {
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
  courseHour: CourseHour;

  @Input()
  hiddenColumns: string[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  courseSessions: CourseSession[] = [];

  constructor(private _courseSessionLoader: CourseSessionLoader,
              @Inject(COURSE_SESSION_SERVICE_TOKEN) public service: ICourseSessionService) {
  }

  async ngOnInit() {
    if (this.room) {
      await this._courseSessionLoader.loadByRoom(this.room);
    }

    if (this.course) {
      await this._courseSessionLoader.loadByCourse(this.course);
    }

    if (this.course) {
      await this._courseSessionLoader.loadByCourseHour(this.courseHour);
    }

    if (this.courseTeacher) {
      await this._courseSessionLoader.loadByCourseTeacher(this.courseTeacher);
    }

    if (this.teacher) {
      await this._courseSessionLoader.loadByTeacher(this.teacher);
    }

    if (this.level) {
      await this._courseSessionLoader.loadByLevel(this.level);
    }

    this.table.unshift(...this.getCourseSessions().toArray());
  }


  addCourseHour() {
    this.service.addCourseSession(this.course).then(course => {
      if (course) {
        this.table.unshift(course);
        this.table.hiddenColumns = (this.hiddenColumns);
      }
    });
  }

  delete(item: CourseSession) {
    this.service.deleteCourseSession(item).then(result => {
      if (result) {
        this.table.remove(item);
      }
    })
  }

  getCourseSessions(): List<CourseSession> {
    if (this.room) {
      return this.room.courseSessions;
    }

    if (this.course) {
      return this.course.courseSessions;
    }

    if (this.courseHour) {
      return this.courseHour.courseSessions;
    }

    if (this.courseTeacher) {
      return this.courseTeacher.courseSessions;
    }

    if (this.teacher) {
      return this.teacher.courseSessions;
    }

    if (this.level) {
      return this.level.courseSessions;
    }

    return new List<CourseSession>();
  }
}
