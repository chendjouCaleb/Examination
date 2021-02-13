import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, Level, School, Speciality} from 'examination/entities';
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from 'examination/loaders';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {List} from '@positon/collections';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'course-list.html',
  selector: 'app-course-list'
})
export class CourseList implements OnInit {
  @Input()
  level: Level;

  @Input()
  speciality: Speciality;

  @ViewChild(MsTable)
  table: MsTable;

  courses: Course[] = [];

  constructor(
    private _levelSpecialityLoader: LevelSpecialityLoader,
    private _courseLevelSpeciality: CourseLevelSpecialityLoader,
    private _courseLoader: CourseLoader,
    @Inject(COURSE_SERVICE_TOKEN) public service: ICourseService) {

  }

  async ngOnInit() {
    if (this.level) {
      await this._levelSpecialityLoader.loadByLevel(this.level);
      await this._courseLoader.loadByLevel(this.level);

    }
    if (this.speciality) {
      await this._courseLoader.loadBySpeciality(this.speciality);
    }
    for (const course of this.courses) {
      await this._courseLevelSpeciality.loadByCourse(course);
    }

    this.table.unshift(...this.getCourses().toArray());
  }


  addCourse() {
    this.service.addCourse(this.level).then(course => {
      if (course) {
        this.table.unshift(course);
      }
    });
  }

  getCourses(): List<Course> {
    if (this.level) {
      return this.level.courses;
    }
    return this.speciality.courses;
  }

  get school(): School {
    if (this.level) {
      return this.level?.department?.school;
    }

    if (this.speciality) {
      return this.speciality?.department?.school;
    }
  }
}
