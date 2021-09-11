import {ChangeDetectorRef, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, CourseHour, CourseSession, CourseTeacher, Level, Room, Teacher} from 'examination/entities';
import {CourseSessionLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {COURSE_SESSION_SERVICE_TOKEN, ICourseSessionService} from '../course-session.service.interface';
import moment from 'moment';
import {MsTimeLine, MsTimeLineItem} from '@ms-fluent/date-ui';

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

  @ViewChild(MsTimeLine)
  timeline: MsTimeLine<CourseSession>;

  isLoading: boolean = true;
  isLoaded: boolean = false;

  courseSessions: CourseSession[] = [];

  constructor(private _courseSessionLoader: CourseSessionLoader,
              private changeDetector: ChangeDetectorRef,
              @Inject(COURSE_SESSION_SERVICE_TOKEN) public service: ICourseSessionService) {
  }

  async ngOnInit() {
    try {
      await this.loadCourseSessions();
      this.isLoading = false;
      this.isLoaded = true;

      console.log('is loaded')
    } catch (e) {
      this.isLoading = false;
    }
  }

  async loadCourseSessions() {
    if (this.room) {
      await this._courseSessionLoader.loadByRoom(this.room);
    }

    if (this.course) {
      await this._courseSessionLoader.loadByCourse(this.course);
    }

    if (this.courseHour) {
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

    const courseSessions = this.getCourseSessions().toArray()
      .sort((c1, c2) => c1.expectedStartDate.getTime() - c2.expectedStartDate.getTime());

    this.courseSessions = courseSessions;
  }

  addCourseSession() {
    this.service.addCourseSession(this.level, this.course).then(courseSession => {
      if (courseSession) {
        this.timeline.addItem(courseSession);
        this.courseSessions.push(courseSession);
        this.changeDetector.detectChanges();
      }
    });
  }

  delete(item: CourseSession) {
    this.service.deleteCourseSession(item).then(result => {
      if (result) {
        this.timeline.removeItem(item);
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

  get canAdd(): boolean {
    return (this.course && this.course.level.department.school.isPlanner)
      || (this.level && this.level.department.school.isPlanner)

  }

  getDateCourseSession(date: Date): CourseSession[] {
    return this.courseSessions.filter(c => isEqualDay(c.expectedStartDate, date));
  }

  formatDate(date: Date): string {
    const d = moment(date);
    return `${d.format('HH')}h ${d.format('mm')}`;
  }

  cast(item: MsTimeLineItem): CourseSession {
    return item as CourseSession;
  }
}


export function isEqualDay(date1: Date, date2: Date): boolean {
  return date1.getFullYear() === date2.getFullYear()
    && date1.getMonth() === date2.getMonth()
    && date1.getDate() === date2.getDate();
}
