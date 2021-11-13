import {Component, Input, OnInit} from "@angular/core";
import {Course} from "examination/entities";
import {CourseLoader} from "examination/loaders";

@Component( {
  templateUrl: 'course-home.html',
  selector: 'CourseHome'
})
export class CourseHome implements OnInit {
  @Input()
  course: Course;

  @Input()
  courseId: number | string;

  constructor(private _courseLoader: CourseLoader) {}

  async ngOnInit() {
    if(!this.course ) {
      this.course = await this._courseLoader.loadById(+this.courseId);
    }
  }
}
