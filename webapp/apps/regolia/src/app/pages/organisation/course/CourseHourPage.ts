import {Component} from "@angular/core";
import {Course} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  template: `<CourseHourList [params]="{courseId : course.id}"></CourseHourList>`,
  selector: 'CourseHoursPage'
})
export class CourseHoursPage {
  course: Course;

  constructor(items: CurrentItems, public _router: Router) {
    this.course = items.get('course');
  }
}
