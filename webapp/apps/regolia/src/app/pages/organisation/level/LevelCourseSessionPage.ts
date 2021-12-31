import {Component} from "@angular/core";
import {Level} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {CourseSessionService} from "../../../components/course-session";

@Component({
  template: `
      <h3 class="mb-1 mt-3">Séances de cours</h3>
      <CourseSessionList [params]="{levelId: level.id}"></CourseSessionList>`
})
export class LevelCourseSessionsPage {
  level: Level;

  constructor(items: CurrentItems, public _router: Router, private service: CourseSessionService) {
    this.level = items.get('level');
  }

  addCourseSession() {

  }
}
