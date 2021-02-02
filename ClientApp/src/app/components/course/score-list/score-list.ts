import {Component, Inject, Input, OnInit} from '@angular/core';
import {Course, ScoreHttpClient, ScoreLoader} from 'examination/models';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';


@Component({
  templateUrl: 'score-list.html',
  selector: 'app-score-list'
})
export class ScoreList implements OnInit {
  @Input()
  course: Course;

  constructor(private _httpClient: ScoreHttpClient,
              @Inject(COURSE_SERVICE_TOKEN) public service: ICourseService,
              private _loader: ScoreLoader) {
  }

  async ngOnInit(): Promise<void> {
    await this._loader.loadByCourse(this.course);
  }

  add() {
    this.service.addScore(this.course);
  }

}
