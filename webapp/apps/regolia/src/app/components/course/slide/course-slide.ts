import {Component, Inject, Input, OnInit} from '@angular/core';
import {Course} from 'examination/entities';
import {
  MS_DIALOG_DATA,
  MsCollectionSideArrayDescriptor,
  MsCollectionSlideDescription,
  MsDialogRef
} from '@ms-fluent/components';

@Component({
  templateUrl: 'course-slide.html',
  selector: 'courseSlide'
})
export class CourseSlide implements OnInit {
  @Input()
  index: number = 0;

  description: MsCollectionSlideDescription<Course>;

  constructor(private dialog: MsDialogRef<CourseSlide>,
              @Inject(MS_DIALOG_DATA) data) {
    const courses = data.courses;
    this.index = data.index;
    this.description = new MsCollectionSideArrayDescriptor(courses);
  }

  ngOnInit(): void {

  }
}
