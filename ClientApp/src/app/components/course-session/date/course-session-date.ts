import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseSession, School} from 'examination/entities';
import {CourseSessionHourForm} from '../course-session.form';

@Component({
  templateUrl: 'course-session-date.html',
  selector: 'app-course-session-date'
})
export class CourseSessionDate implements OnInit {

  @Input()
  courseSession: CourseSession;

  form: CourseSessionHourForm;

  constructor(private _httpClient: CourseSessionHttpClient,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsDialogRef<CourseSessionDate>) {
  }

  ngOnInit(): void {
    this.form = new CourseSessionHourForm({
      day: this.courseSession.expectedStartDate,
      startHour: this.courseSession.expectedStartHour,
      endHour: this.courseSession.expectedEndHour
    })
  }

  async change() {
    const model = this.form.getModel();
    await this._httpClient.changeHour(this.courseSession, model.body);
    this.courseSession.expectedStartDate = model.body.expectedStartDate;
    this.courseSession.expectedEndDate = model.body.expectedEndDate;

    this._alertEmitter.info(`Séance de cours reprogrammé!`);
    if (this._modal) {
      this._modal.close(true);
    }
  }


  get school(): School {
    return this.courseSession.room.school;
  }
}
