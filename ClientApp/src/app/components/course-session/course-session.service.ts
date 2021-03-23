import {Injectable} from '@angular/core';
import {ICourseSessionService} from 'examination/app/components';
import {Course, CourseSession, CourseTeacher, Level, Room} from 'examination/entities';
import {MsfModal} from 'fabric-docs';
import {CourseSessionAdd} from './add/course-session-add';
import {CourseSessionDate} from './date/course-session-date';
import {CourseSessionRoom} from './room/course-session-room';
import {CourseSessionTeacher} from './teacher/course-session-teacher';
import {CourseSessionDelete} from './delete/course-session-delete';
import {CourseSessionDetails} from './details/course-session-details';
import {CourseSessionObjective} from './objective/course-session-objective';
import {CourseSessionReport} from './report/course-session-report';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';

@Injectable()
export class CourseSessionService implements ICourseSessionService {

  constructor(private _modal: MsfModal,
              private _alertEmitter: AlertEmitter,
              private _httpClient: CourseSessionHttpClient) {
  }

  addCourseSession(level: Level, course: Course): Promise<CourseSession> {
    const modalRef = this._modal.open(CourseSessionAdd, {autoFocus: true});
    if (level) {
      modalRef.componentInstance.level = level;
    }
    if (course) {
      modalRef.componentInstance.course = course;
    }
    return modalRef.afterClosed().toPromise();
  }

  changeHour(courseSession: CourseSession): Promise<void> {
    const modalRef = this._modal.open(CourseSessionDate, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

  changeRoom(courseSession: CourseSession): Promise<Room> {
    const modalRef = this._modal.open(CourseSessionRoom, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

  changeTeacher(courseSession: CourseSession): Promise<CourseTeacher> {
    const modalRef = this._modal.open(CourseSessionTeacher, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

  deleteCourseSession(courseSession: CourseSession): Promise<boolean> {
    const modalRef = this._modal.open(CourseSessionDelete, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

  details(courseSession: CourseSession) {
    const modalRef = this._modal.open(CourseSessionDetails, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

  async isLecture(courseSession: CourseSession): Promise<boolean> {
    await this._httpClient.isLecture(courseSession);
    courseSession.lecture = !courseSession.lecture;
    this._alertEmitter.info(`Opération effectuée`);
    return Promise.resolve(courseSession.lecture);
  }

  objective(courseSession: CourseSession): Promise<void> {
    const modalRef = this._modal.open(CourseSessionObjective, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

  report(courseSession: CourseSession): Promise<void> {
    const modalRef = this._modal.open(CourseSessionReport, {autoFocus: true});
    modalRef.componentInstance.courseSession = courseSession;
    return modalRef.afterClosed().toPromise();
  }

}
