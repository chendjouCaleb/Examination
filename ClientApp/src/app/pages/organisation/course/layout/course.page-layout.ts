import {Component} from '@angular/core';
import {Course} from 'examination/entities';
import {CourseLoader} from 'examination/loaders';
import {ActivatedRoute} from '@angular/router';

@Component({
  templateUrl: 'course.page-layout.html',
  selector: 'app-course-page-layout'
})
export class CoursePageLayout {
  course: Course;

  constructor(private route: ActivatedRoute, private loader: CourseLoader) {
    const id = + route.snapshot.paramMap.get('courseId');

    this.loader.loadById(id).then(course => this.course = course);
  }
}
