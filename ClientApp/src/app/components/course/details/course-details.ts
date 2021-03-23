import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {Course} from 'examination/entities';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {MsfModalRef} from 'fabric-docs';
import {CourseLevelSpecialityLoader} from 'examination/loaders';

@Component({
  templateUrl: 'course-details.html',
  selector: 'app-course-details'
})
export class CourseDetails implements OnInit {
  @Input()
  course: Course;

  loaded: boolean = false;

  constructor(@Inject(COURSE_SERVICE_TOKEN) public service: ICourseService,
              private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader,
              @Optional() public _modalRef: MsfModalRef<CourseDetails>) {
  }

  delete() {
    this.service.deleteCourse(this.course).then(() => this._modalRef?.close());
  }

  async ngOnInit(): Promise<void> {
    await this._courseLevelSpecialityLoader.loadByCourse(this.course);
    this.loaded = true;
  }
}
