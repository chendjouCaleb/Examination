import {Injectable} from "@angular/core";
import {Course} from "examination/entities";
import {MsDialog} from "@ms-fluent/components";
import {CourseSlide} from "./course-slide";

@Injectable()
export class CourseSlideService {
  constructor(private _modal: MsDialog) {
  }

  slide(courses: Course[], index: number): void {
    this._modal.open(CourseSlide, {
      width: '98%', height: '98vh', maxWidth: '98%',
      data: {courses, index},
      panelClass: ['ms-depth-8', 'ex-dialog-panel']
    });
  }
}
