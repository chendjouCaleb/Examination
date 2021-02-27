import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {Course, CourseTeacher, Teacher} from 'examination/entities';
import {CourseTeacherHttpClient, UserHttpClient} from 'examination/models/http';
import {CourseLoader} from './course.loader';
import {TeacherLoader} from '../member/teacher.loader';


@Injectable({providedIn: 'root'})
export class CourseTeacherLoader extends Loader<CourseTeacher, number> {

  constructor(private courseTeacherRepository: CourseTeacherHttpClient,
              private _userHttClient: UserHttpClient,
              private _teacherLoader: TeacherLoader,
              private _courseLoader: CourseLoader) {
    super(courseTeacherRepository);
  }

  async load(item: CourseTeacher): Promise<CourseTeacher> {
    item.teacher = await this._teacherLoader.loadById(item.teacherId);
    item.course = await this._courseLoader.loadById(item.courseId);
    return item;
  }

  async loadById(id: number): Promise<CourseTeacher> {
    const item = await this.courseTeacherRepository.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByCourse(course: Course): Promise<void> {
    if (!course.courseTeachers) {
      const courseTeachers = await this.courseTeacherRepository.listAsync({courseId: course.id});
      for (const courseTeacher of courseTeachers) {
        await this.load(courseTeacher);
      }
      course.courseTeachers = courseTeachers;
    }
  }

  async loadByTeacher(teacher: Teacher): Promise<void> {
    if (!teacher.courseTeachers) {
      const courseTeachers = await this.courseTeacherRepository.listAsync({teacherId: teacher.id});
      for (const courseTeacher of courseTeachers) {
        await this.load(courseTeacher);
      }
      teacher.courseTeachers = courseTeachers;
    }
  }

}
