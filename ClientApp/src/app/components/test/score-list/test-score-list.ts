import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ScoreHttpClient, Test, TestScore, TestScoreLoader} from 'examination/models';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {MsTable} from '@ms-fluent/components';


@Component({
  templateUrl: 'test-score-list.html',
  selector: 'app-test-score-list'
})
export class TestScoreList implements OnInit {
  @Input()
  test: Test;

  scores: TestScore[] = [];
  loaded: boolean = false;

  @ViewChild(MsTable)
  table: MsTable<TestScore>;

  constructor(private _httpClient: ScoreHttpClient,
              @Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _loader: TestScoreLoader) {
  }

  async ngOnInit(): Promise<void> {
    await this._loader.loadByTest(this.test);
    this.scores = this.test.testScores.toArray();
    this.table.unshift(...this.scores);
    this.loaded = true;
  }

  add() {
    this.service.addScore(this.test).then(score => {
      if (score) {
        this.table.unshift(score);
      }
    });
  }


}
