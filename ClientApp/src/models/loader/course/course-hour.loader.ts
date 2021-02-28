import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {Course, CourseHour, CourseTeacher, Level, Room, Teacher} from 'examination/entities';
import {CourseHourHttpClient, UserHttpClient} from 'examination/models/http';
import {CourseLoader} from './course.loader';
import {CourseTeacherLoader} from './course-teacher.loader';
import {RoomLoader} from '../organisation';


@Injectable({providedIn: 'root'})
export class CourseHourLoader extends Loader<CourseHour, number> {

  constructor(private courseHourRepository: CourseHourHttpClient,
              private _userHttClient: UserHttpClient,
              private _roomLoader: RoomLoader,
              private _courseLoader: CourseLoader,
              private _courseTeacherLoader: CourseTeacherLoader) {
    super(courseHourRepository);
  }

  async load(item: CourseHour): Promise<CourseHour> {
    item.room = await this._roomLoader.loadById(item.roomId);
    item.course = await this._courseLoader.loadById(item.courseId);
    item.courseTeacher = await this._courseTeacherLoader.loadById(item.courseTeacherId);
    return item;
  }

  async loadById(id: number): Promise<CourseHour> {
    const item = await this.courseHourRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByCourse(course: Course): Promise<void> {
    if (!course.courseHours) {
      const courseHours = await this.courseHourRepository.listAsync({courseId: course.id});
      for (const courseHour of courseHours) {
        await this.load(courseHour);
      }
      course.courseHours = courseHours;
    }
  }

  async loadByRoom(room: Room): Promise<void> {
    if (!room.courseHours) {
      const courseHours = await this.courseHourRepository.listAsync({roomId: room.id});
      for (const courseHour of courseHours) {
        await this.load(courseHour);
      }
      room.courseHours = courseHours;
    }
  }

  async loadByLevel(level: Level): Promise<void> {
    if (!level.courseHours) {
      const courseHours = await this.courseHourRepository.listAsync({levelId: level.id});
      for (const courseHour of courseHours) {
        await this.load(courseHour);
      }
      level.courseHours = courseHours;
    }
  }

  async loadByTeacher(teacher: Teacher): Promise<void> {
    if (!teacher.courseHours) {
      const courseHours = await this.courseHourRepository.listAsync({teacherId: teacher.id});
      for (const courseHour of courseHours) {
        await this.load(courseHour);
      }
      teacher.courseHours = courseHours;
    }
  }

  async loadByCourseTeacher(courseTeacher: CourseTeacher): Promise<void> {
    if (!courseTeacher.courseHours) {
      const courseHours = await this.courseHourRepository.listAsync({courseTeacherId: courseTeacher.id});
      for (const courseHour of courseHours) {
        await this.load(courseHour);
      }
      courseTeacher.courseHours = courseHours;
    }
  }

}
