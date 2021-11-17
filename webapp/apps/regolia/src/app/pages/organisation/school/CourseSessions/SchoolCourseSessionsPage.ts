import {Component} from "@angular/core";
import {School} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";

@Component({
  templateUrl: 'SchoolCourseSessionsPage.html'
})
export class SchoolCourseSessionsPage {
  school: School;

  constructor(items: CurrentItems, public _router: Router) {
    this.school = items.get('school');
  }
}
