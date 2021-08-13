import {Component, Inject, Input} from '@angular/core';
import {CourseHour} from 'examination/entities';
import {CourseHourHttpClient} from 'examination/models/http';
import {COURSE_HOUR_SERVICE_TOKEN, ICourseHourService} from '../course-hour.service.interface';
import {MsfCheckboxChange, MsfModalRef, MsfRadioChange} from 'fabric-docs';

@Component({
  templateUrl: 'course-hour-details.html',
  selector: 'app-course-hour-details'
})
export class CourseHourDetails {
  @Input()
  courseHour: CourseHour;

  constructor(private _httpClient: CourseHourHttpClient,
              @Inject(COURSE_HOUR_SERVICE_TOKEN) public service: ICourseHourService,
              private modal: MsfModalRef<CourseHourDetails>) {
  }

  lectureChange(event: MsfRadioChange) {
    this.service.isLecture(this.courseHour).then();
  }
}