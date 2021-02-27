import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Course, CourseHour, CourseSession, CourseTeacher, Room} from 'examination/entities';
import {Injectable} from '@angular/core';
import {CourseSessionAddBodyModel, CourseSessionHourBodyModel, CourseSessionReportBodyModel} from 'examination/models';

@Injectable()
export class CourseSessionHttpClient extends GenericHttpClient<CourseSession, number> {
  url: string = SERVER_URL + '/courseSessions';


  createFromAny(value: any): CourseSession {
    return new CourseSession(value);
  }

  addCourseSession(course: Course, room: Room, courseTeacher: CourseTeacher, courseHour: CourseHour,
                   model: CourseSessionAddBodyModel): Promise<CourseSession> {
    const params: any = {courseId: course.id, roomId: room.id, courseTeacherId: courseTeacher.id};
    if (courseHour != null) {
      params.courseHourId = courseHour.id;
    }
    return this.add(model, params);
  }

  changeHour(courseSession: CourseSession, hourModel: CourseSessionHourBodyModel): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseSession.id}/hour`, hourModel).toPromise();
  }

  changeReport(courseSession: CourseSession, model: CourseSessionReportBodyModel): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseSession.id}/report`, model).toPromise();
  }

  changeTeacher(courseSession: CourseSession, courseTeacher: CourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseSession.id}/teacher`, {},
      {params: {courseTeacherId: courseTeacher.id.toString()}}).toPromise();
  }

  changeRoom(courseSession: CourseSession, room: Room): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseSession.id}/room`, {},
      {params: {roomId: room.id.toString()}}).toPromise();
  }

  changeObjective(courseSession: CourseSession, objective: string): Promise<void> {
    const form = new FormData();
    form.append('objective', objective);
    return this.httpClient.put<void>(`${this.url}/${courseSession.id}/objective`, objective).toPromise();
  }

  isLecture(courseSession: CourseSession): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseSession.id}/lecture`, {}).toPromise();
  }
}
