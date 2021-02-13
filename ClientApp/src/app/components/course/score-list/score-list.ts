import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, Score, ScoreHttpClient, ScoreLoader} from 'examination/models';
import {COURSE_SERVICE_TOKEN, ICourseService} from '../course.service.interface';
import {MsTable} from '@ms-fluent/table';


@Component({
  templateUrl: 'score-list.html',
  selector: 'app-score-list'
})
export class ScoreList implements OnInit {
  @Input()
  course: Course;

  scores: Score[] = [];

  @ViewChild(MsTable)
  table: MsTable<Score>;

  constructor(private _httpClient: ScoreHttpClient,
              @Inject(COURSE_SERVICE_TOKEN) public service: ICourseService,
              private _loader: ScoreLoader) {
  }

  async ngOnInit(): Promise<void> {
    await this._loader.loadByCourse(this.course);
    this.table.unshift(...this.course.scores);
  }

  add() {
    this.service.addScore(this.course).then(score => {
      if (score) {
        this.table.unshift(score);
      }
    });
  }

  deleteScore(score: Score) {}
}
