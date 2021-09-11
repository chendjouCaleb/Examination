import {Component, Input, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseSession} from 'examination/entities';

@Component({
  templateUrl: 'course-session-delete.html',
  selector: 'app-course-session-deleted'
})
export class CourseSessionDelete{

  @Input()
  courseSession: CourseSession;

  constructor(private _httpClient: CourseSessionHttpClient,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsDialogRef<CourseSessionDelete>) {
  }


  async delete() {
    await this._httpClient.delete(this.courseSession.id);

    this.courseSession.course.courseSessions?.removeIf(c => c.id === this.courseSession.id);
    this.courseSession.courseTeacher.courseSessions?.removeIf(c => c.id === this.courseSession.id);
    this.courseSession.course.level.courseSessions?.removeIf(c => c.id === this.courseSession.id);
    this.courseSession.courseTeacher.teacher.courseSessions?.removeIf(c => c.id === this.courseSession.id);
    this.courseSession.courseHour?.courseSessions?.removeIf(c => c.id === this.courseSession.id);

    this._alertEmitter.info(`L'horaire a été supprimé!`);
    if (this._modal) {
      this._modal.close(true);
    }
  }

}
