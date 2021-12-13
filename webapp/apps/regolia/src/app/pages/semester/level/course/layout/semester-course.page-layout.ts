import {Component} from '@angular/core';
import {SemesterCourse} from 'examination/entities';
import {CurrentItems} from "../../../../../current-items";

@Component({
  templateUrl: 'semester-course.page-layout.html',
  selector: 'SemesterCourseLayout'
})
export class SemesterCoursePageLayout {
  semesterCourse: SemesterCourse;

  constructor(currentItems: CurrentItems) {
    this.semesterCourse = currentItems.get('semesterCourse');
  }
}
