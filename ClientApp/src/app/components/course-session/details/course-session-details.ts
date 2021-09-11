import {Component, Inject, Input} from '@angular/core';
import {CourseSession} from 'examination/entities';
import {CourseSessionHttpClient} from 'examination/models/http';
import {COURSE_SESSION_SERVICE_TOKEN, ICourseSessionService} from '../course-session.service.interface';
import {MsDialogRef, MsRadioChange} from '@ms-fluent/components';

@Component({
  templateUrl: 'course-session-details.html',
  selector: 'app-course-session-details'
})
export class CourseSessionDetails {
  @Input()
  courseSession: CourseSession;

  constructor(private _httpClient: CourseSessionHttpClient,

              @Inject(COURSE_SESSION_SERVICE_TOKEN) public service: ICourseSessionService,
              private modal: MsDialogRef<CourseSessionDetails>) {
  }

  lectureChange(event: MsRadioChange) {
    this.service.isLecture(this.courseSession).then();
  }
}
