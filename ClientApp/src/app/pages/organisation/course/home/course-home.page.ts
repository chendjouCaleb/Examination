import {Component, Inject, Input} from '@angular/core';
import {Course} from 'examination/entities';
import {ICourseService, COURSE_SERVICE_TOKEN} from 'examination/app/components';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'course-home.page.html',
  selector: 'app-course-home-page'
})
export class CourseHomePage {
  @Input()
  course: Course;

  constructor(@Inject(COURSE_SERVICE_TOKEN) public _courseService: ICourseService,
              private router: Router) {
  }

  delete() {
    this._courseService.deleteCourse(this.course).then(result => {
      if (result) {
        this.router.navigateByUrl(`${this.course.level.url}`, { queryParams: {tab: 'courses'}}).then();
      }
    })
  }
}
