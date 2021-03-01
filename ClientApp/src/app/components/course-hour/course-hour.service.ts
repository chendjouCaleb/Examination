import {Injectable} from '@angular/core';
import {ICourseHourService} from 'examination/app/components';
import {CourseHour, Level, Room} from 'examination/entities';
import {CourseHourHttpClient} from 'examination/models/http';
import {MsfModal} from 'fabric-docs';
import {CourseHourAdd} from './add/course-hour-add';
import {AlertEmitter} from 'examination/controls';
import {CourseHourDetails} from './details/course-hour-details';
import {CourseHourRoom} from './room/course-hour-room';
import {CourseHourTeacher} from './teacher/course-hour-teacher';
import {CourseHourDelete} from './delete/course-hour-delete';

@Injectable()
export class CourseHourService implements ICourseHourService {
  constructor(private _httpClient: CourseHourHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modal: MsfModal) {}

  addCourseHour(level: Level): Promise<CourseHour> {
    const modalRef = this._modal.open(CourseHourAdd, {autoFocus: false});
    modalRef.componentInstance.level = level;

    return modalRef.afterClosed().toPromise();
  }

  deleteCourseHour(courseHour: CourseHour): Promise<boolean> {
    const modalRef = this._modal.open(CourseHourDelete, {autoFocus: false});
    modalRef.componentInstance.courseHour = courseHour;
    return modalRef.afterClosed().toPromise();
  }

  details(courseHour: CourseHour) {
    const modalRef = this._modal.open(CourseHourDetails, {autoFocus: false});
    modalRef.componentInstance.courseHour = courseHour;
  }

  async isLecture(courseHour: CourseHour): Promise<boolean> {
    await this._httpClient.isLecture(courseHour);
    courseHour.lecture = !courseHour.lecture;
    this._alertEmitter.info(`Opération effectuée`);
    return Promise.resolve(courseHour.lecture);
  }

  changeRoom(courseHour: CourseHour): Promise<Room> {
    const modalRef = this._modal.open(CourseHourRoom, {autoFocus: false});
    modalRef.componentInstance.courseHour = courseHour;
    return modalRef.afterClosed().toPromise();
  }

  changeTeacher(courseHour: CourseHour): Promise<CourseHour> {
    const modalRef = this._modal.open(CourseHourTeacher, {autoFocus: false});
    modalRef.componentInstance.courseHour = courseHour;
    return modalRef.afterClosed().toPromise();
  }

}
