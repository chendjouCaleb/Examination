import {Component, Inject, Input, OnInit} from '@angular/core';
import {Course, Level, Speciality} from 'examination/entities';
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from 'examination/loaders';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'course-list.html',
  selector: 'app-course-list'
})
export class CourseList implements OnInit {
  @Input()
  level: Level;

  @Input()
  speciality: Speciality;

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

  }


  addCourse() {
    this.service.addCourse(this.level);
  }

  get courses(): List<Course> {
    if (this.level) {
      return this.level.courses;
    }
    return this.speciality.courses;
  }
}
