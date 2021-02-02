import {Component, Inject, Input, OnInit} from '@angular/core';
import {ScoreHttpClient, Test, TestScoreLoader} from 'examination/models';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';


@Component({
  templateUrl: 'test-score-list.html',
  selector: 'app-test-score-list'
})
export class TestScoreList implements OnInit {
  @Input()
  test: Test;

  loaded: boolean = false;

  constructor(private _httpClient: ScoreHttpClient,
              @Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _loader: TestScoreLoader) {
  }

  async ngOnInit(): Promise<void> {
    await this._loader.loadByTest(this.test);
    this.loaded = true;
  }

  add() {
    this.service.addScore(this.test);
  }


}
