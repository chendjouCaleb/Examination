import {Component, Inject, Input} from '@angular/core';
import {CourseSession} from 'examination/entities';
import {CourseSessionHttpClient} from 'examination/models/http';
import {COURSE_SESSION_SERVICE_TOKEN, ICourseSessionService} from '../course-session.service.interface';
import {MsfModalRef, MsfRadioChange} from 'fabric-docs';

@Component({
  templateUrl: 'course-session-details.html',
  selector: 'app-course-session-details'
})
export class CourseSessionDetails {
  @Input()
  courseSession: CourseSession;

  constructor(private _httpClient: CourseSessionHttpClient,

              @Inject(COURSE_SESSION_SERVICE_TOKEN) public service: ICourseSessionService,
              private modal: MsfModalRef<CourseSessionDetails>) {
  }

  lectureChange(event: MsfRadioChange) {
    this.service.isLecture(this.courseSession).then();
  }
}
