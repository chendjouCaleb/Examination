import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {CourseSession, School} from 'examination/entities';
import {CourseSessionReportForm} from '../course-session.form';

@Component({
  templateUrl: 'course-session-report.html',
  selector: 'app-course-session-add'
})
export class CourseSessionReport implements OnInit {

  @Input()
  courseSession: CourseSession;

  form: CourseSessionReportForm;

  constructor(private _httpClient: CourseSessionHttpClient,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsfModalRef<CourseSessionReport>) {
  }

  ngOnInit(): void {
    this.form = new CourseSessionReportForm({
      day: this.courseSession.expectedStartDate,
      startHour: this.courseSession.expectedStartHour,
      endHour: this.courseSession.expectedEndHour
    })
  }

  async change() {
    const model = this.form.getModel();
    await this._httpClient.changeReport(this.courseSession, model.body);
    this.courseSession.startDate = model.body.startDate;
    this.courseSession.endDate = model.body.endDate;
    this.courseSession.presence = model.body.presence;
    this.courseSession.report = model.body.report;

    this._alertEmitter.info(`Séance rapportée!`);
    if (this._modal) {
      this._modal.close(true);
    }
  }


  get school(): School {
    return this.courseSession.room.school;
  }
}
