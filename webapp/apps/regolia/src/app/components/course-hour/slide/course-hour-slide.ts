import {Component, Inject, Input, OnInit} from '@angular/core';
import {CourseHour} from 'examination/entities';
import {MS_DIALOG_DATA, MsCollectionSlideDescription, MsDialogRef} from '@ms-fluent/components';
import {Observable, Subject} from 'rxjs';

@Component({
  templateUrl: 'course-hour-slide.html',
  selector: 'course-slide'
})
export class CourseHourSlide implements OnInit {
  @Input()
  courseHours: CourseHour[];

  description: MsCollectionSlideDescription<CourseHour>;

  constructor(private dialog: MsDialogRef<CourseHourSlide>,
              @Inject(MS_DIALOG_DATA) data) {
    const courseHours = data.courseHours;
    this.description = new CourseHourSlideDescriptor(courseHours);
  }

  ngOnInit(): void {

  }
}

export class CourseHourSlideDescriptor implements MsCollectionSlideDescription<CourseHour>{
  constructor(public courseHours: CourseHour[]) {}

  change(): Observable<void> {
    return new Subject<void>().asObservable();
  }

  find(index: number): Promise<CourseHour> {
    return Promise.resolve(this.courseHours[index]);
  }

  length(): number {
    return this.courseHours.length;
  }
}
