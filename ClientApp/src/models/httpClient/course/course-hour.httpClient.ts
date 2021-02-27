import {GenericHttpClient, SERVER_URL} from '../httpClient';
import {Course, CourseHour, CourseTeacher, Room} from 'examination/entities';
import {Injectable} from '@angular/core';
import {CourseHourAddBodyModel} from 'examination/models';


@Injectable()
export class CourseHourHttpClient extends GenericHttpClient<CourseHour, number> {
  url: string = SERVER_URL + '/courseHours';


  createFromAny(value: any): CourseHour {
    return new CourseHour(value);
  }

  addCourseHour(course: Course, room: Room, courseTeacher: CourseTeacher, model: CourseHourAddBodyModel): Promise<CourseHour> {
    return this.add(model, {courseId: course.id, roomId: room.id, courseTeacherId: courseTeacher.id});
  }

  changeTeacher(courseHour: CourseHour, courseTeacher: CourseTeacher): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseHour.id}/teacher`, {},
      {params: {courseTeacherId: courseTeacher.id.toString()}}).toPromise();
  }

  changeRoom(courseHour: CourseHour, room: Room): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseHour.id}/room`, {},
      {params: {roomId: room.id.toString()}}).toPromise();
  }


  isLecture(courseHour: CourseHour): Promise<void> {
    return this.httpClient.put<void>(`${this.url}/${courseHour.id}/lecture`, {}).toPromise();
  }
}
