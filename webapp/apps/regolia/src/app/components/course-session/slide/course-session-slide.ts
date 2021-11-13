import {Component, Inject, Input, OnInit} from '@angular/core';
import {CourseSession} from 'examination/entities';
import {MS_DIALOG_DATA, MsCollectionSlideDescription, MsDialogRef} from '@ms-fluent/components';
import {Observable, Subject} from 'rxjs';

@Component({
  templateUrl: 'course-session-slide.html',
  selector: 'course-session-slide'
})
export class CourseSessionSlide implements OnInit {
  @Input()
  courseSessions: CourseSession[];

  @Input()
  index: number = 0;

  description: MsCollectionSlideDescription<CourseSession>;

  constructor(private dialog: MsDialogRef<CourseSessionSlide>,
              @Inject(MS_DIALOG_DATA) data) {
    const courseSessions = data.courseSessions;
    this.index = data.index;
    this.description = new CourseSessionSlideDescriptor(courseSessions);
  }

  ngOnInit(): void {

  }
}

export class CourseSessionSlideDescriptor implements MsCollectionSlideDescription<CourseSession>{
  constructor(public courseSessions: CourseSession[]) {}

  change(): Observable<void> {
    return new Subject<void>().asObservable();
  }

  find(index: number): Promise<CourseSession> {
    return Promise.resolve(this.courseSessions[index]);
  }

  length(): number {
    return this.courseSessions.length;
  }
}
