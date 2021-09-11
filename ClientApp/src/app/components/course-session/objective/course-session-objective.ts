import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseSession, School} from 'examination/entities';

@Component({
  templateUrl: 'course-session-objective.html',
  selector: 'app-course-session-objective'
})
export class CourseSessionObjective implements OnInit {

  @Input()
  courseSession: CourseSession;
  objective: string;

  constructor(private _httpClient: CourseSessionHttpClient,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsDialogRef<CourseSessionObjective>) {
  }

  async ngOnInit() {
    this.objective = this.courseSession.objective;
  }


  async change() {
    await this._httpClient.changeObjective(this.courseSession, this.objective);
    this.courseSession.objective = this.objective;

    this._alertEmitter.info(`L'objectif de la séance a été changé!`);
    if (this._modal) {
      this._modal.close(this.courseSession.objective);
    }
  }

  get school(): School {
    return this.courseSession.room.school;
  }
}
