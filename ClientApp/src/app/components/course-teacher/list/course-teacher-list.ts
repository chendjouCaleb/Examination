import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, CourseTeacher, Teacher} from 'examination/entities';
import {CourseTeacherLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {MsTable} from '@ms-fluent/table';
import {
  COURSE_TEACHER_SERVICE_TOKEN,
  ICourseTeacherService
} from '../course-teacher.service.interface';


@Component({
  templateUrl: 'course-teacher-list.html',
  selector: 'app-course-teacher-list'
})
export class CourseTeacherList implements OnInit {
  @Input()
  teacher: Teacher;

  @Input()
  course: Course;

  @Input()
  title: string = 'Cours';

  @Input()
  hiddenColumns: string[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  courseTeachers: CourseTeacher[] = [];


  constructor(
    private _courseTeacherLoader: CourseTeacherLoader,
    @Inject(COURSE_TEACHER_SERVICE_TOKEN) public service: ICourseTeacherService) {

  }

  async ngOnInit() {
    if (this.course) {
      await this._courseTeacherLoader.loadByCourse(this.course);
    }
    if (this.teacher) {
      await this._courseTeacherLoader.loadByTeacher(this.teacher);
    }

    this.table.unshift(...this.getCourseTeachers().toArray());
  }


  addCourseTeacher() {
    this.service.addCourseTeacher(this.course).then(course => {
      if (course) {
        this.table.unshift(course);
        this.table.hiddenColumns = (this.hiddenColumns);
      }
    });
  }

  delete(item: CourseTeacher) {
    this.service.deleteCourseTeacher(item).then(result => {
      if (result) {
        this.table.remove(item);
      }
    })
  }

  getCourseTeachers(): List<CourseTeacher> {
    if (this.course) {
      return this.course.courseTeachers;
    }

    if (this.teacher) {
      return this.teacher.courseTeachers;
    }

    return new List<CourseTeacher>();
  }
}
