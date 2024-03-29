﻿import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {Course} from 'examination/entities';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseLevelSpecialityLoader} from 'examination/loaders';

@Component({
  templateUrl: 'course-card.html',
  selector: 'app-course-card, CourseCard'
})
export class CourseCard implements OnInit {
  @Input()
  course: Course;

  loaded: boolean = false;

  constructor(@Inject(COURSE_SERVICE_TOKEN) public service: ICourseService,
              private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader,
              @Optional() public _modalRef: MsDialogRef<CourseCard>) {
  }

  delete() {
    this.service.deleteCourse(this.course).then(() => this._modalRef?.close());
  }

  async ngOnInit(): Promise<void> {
    await this._courseLevelSpecialityLoader.loadByCourse(this.course);
    this.loaded = true;
  }
}
