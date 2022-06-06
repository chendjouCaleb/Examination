import {Component} from "@angular/core";
import {Course, School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'SchoolCoursesPage.html'
})
export class SchoolCoursesPage {
  school: School;

  courseUrlFn = (course:Course) => `${this.school.url}/courses/${course.id}`;

  constructor(items: CurrentItems, public _router: Router) {
    this.school = items.get('school');
  }
}
