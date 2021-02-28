import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {Course, CourseHour, CourseSession, CourseTeacher, Level, Room, Teacher} from 'examination/entities';
import {CourseSessionHttpClient, UserHttpClient} from 'examination/models/http';
import {CourseLoader} from './course.loader';
import {CourseTeacherLoader} from './course-teacher.loader';
import {RoomLoader} from '../organisation';
import {CourseHourLoader} from './course-hour.loader';


@Injectable({providedIn: 'root'})
export class CourseSessionLoader extends Loader<CourseSession, number> {

  constructor(private courseSessionRepository: CourseSessionHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _courseLoader: CourseLoader,
              private _courseHourLoader: CourseHourLoader,
              private _courseTeacherLoader: CourseTeacherLoader) {
    super(courseSessionRepository);
  }

  async load(item: CourseSession): Promise<CourseSession> {
    item.room = await this._roomLoader.loadById(item.roomId);
    item.course = await this._courseLoader.loadById(item.courseId);
    item.courseTeacher = await this._courseTeacherLoader.loadById(item.courseTeacherId);

    if (item.courseHourId) {
      item.courseHour = await this._courseHourLoader.loadById(item.courseHourId);
    }
    return item;
  }

  async loadById(id: number): Promise<CourseSession> {
    const item = await this.courseSessionRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByCourse(course: Course): Promise<void> {
    if (!course.courseSessions) {
      const courseSessions = await this.courseSessionRepository.listAsync({courseId: course.id});
      for (const courseSession of courseSessions) {
        await this.load(courseSession);
      }
      course.courseSessions = courseSessions;
    }
  }

  async loadByRoom(room: Room): Promise<void> {
    if (!room.courseSessions) {
      const courseSessions = await this.courseSessionRepository.listAsync({roomId: room.id});
      for (const courseSession of courseSessions) {
        await this.load(courseSession);
      }
      room.courseSessions = courseSessions;
    }
  }

  async loadByLevel(level: Level): Promise<void> {
    if (!level.courseSessions) {
      const courseSessions = await this.courseSessionRepository.listAsync({levelId: level.id});
      for (const courseSession of courseSessions) {
        await this.load(courseSession);
      }
      level.courseSessions = courseSessions;
    }
  }

  async loadByTeacher(teacher: Teacher): Promise<void> {
    if (!teacher.courseSessions) {
      const courseSessions = await this.courseSessionRepository.listAsync({teacherId: teacher.id});
      for (const courseSession of courseSessions) {
        await this.load(courseSession);
      }
      teacher.courseSessions = courseSessions;
    }
  }

  async loadByCourseTeacher(courseTeacher: CourseTeacher): Promise<void> {
    if (!courseTeacher.courseSessions) {
      const courseSessions = await this.courseSessionRepository.listAsync({courseTeacherId: courseTeacher.id});
      for (const courseSession of courseSessions) {
        await this.load(courseSession);
      }
      courseTeacher.courseSessions = courseSessions;
    }
  }

  async loadByCourseHour(courseHour: CourseHour): Promise<void> {
    if (!courseHour.courseSessions) {
      const courseSessions = await this.courseSessionRepository.listAsync({courseHourId: courseHour.id});
      for (const courseSession of courseSessions) {
        await this.load(courseSession);
      }
      courseHour.courseSessions = courseSessions;
    }
  }

}
