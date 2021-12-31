import {Component} from "@angular/core";
import {Course} from 'examination/entities';
import {CurrentItems} from 'examination/app/current-items';
import {Router} from "@angular/router";
import {CourseSessionService} from "../../../components/course-session";

@Component({
  template: `
      <h3 class="mb-1 mt-3">Séances de cours</h3>
      <CourseSessionList [params]="{courseId: course.id}"></CourseSessionList>`,
  selector: 'CourseSessionsPage'
})
export class CourseSessionsPage {
  course: Course;

  constructor(items: CurrentItems, public _router: Router, private service: CourseSessionService) {
    this.course = items.get('course');
  }

  addCourseSession() {

  }
}
