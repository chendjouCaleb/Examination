import {Component, Inject, Input, OnInit} from '@angular/core';
import {Course} from 'examination/entities';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {ChapterTextParser} from '../chapterText-parser';

@Component({
  templateUrl: 'course-chapters.html',
  selector: 'app-course-chapters'
})
export class CourseChapters implements OnInit {
  @Input()
  course: Course;

  constructor(@Inject(COURSE_SERVICE_TOKEN) private service: ICourseService) {}

  ngOnInit(): void {
    this.course.chapters = new ChapterTextParser(this.course.chapterText).parse();
  }

  edit() {
    this.service.chapterText(this.course).then(() => {
      this.course.chapters = new ChapterTextParser(this.course.chapterText).parse();
    });
  }
}
