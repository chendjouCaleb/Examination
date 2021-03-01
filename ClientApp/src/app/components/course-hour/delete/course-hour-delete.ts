import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHourHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {CourseHour} from 'examination/entities';

@Component({
  templateUrl: 'course-hour-delete.html',
  selector: 'app-course-hour-deleted'
})
export class CourseHourDelete implements OnInit {

  @Input()
  courseHour: CourseHour;

  deleteSession: boolean = false;

  constructor(private _httpClient: CourseHourHttpClient,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsfModalRef<CourseHourDelete>) {
  }

  async ngOnInit() { }


  async delete() {
    await this._httpClient.delete(this.courseHour.id);

    this.courseHour.course.courseHours?.removeIf(c => c.id === this.courseHour.id);
    this.courseHour.courseTeacher.courseHours?.removeIf(c => c.id === this.courseHour.id);
    this.courseHour.course.level.courseHours?.removeIf(c => c.id === this.courseHour.id);
    this.courseHour.courseTeacher.teacher.courseHours?.removeIf(c => c.id === this.courseHour.id);

    this._alertEmitter.info(`L'horaire a été supprimé!`);
    if (this._modal) {
      this._modal.close(true);
    }
  }

}
