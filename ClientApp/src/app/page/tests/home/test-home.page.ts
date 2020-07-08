import {Component, OnDestroy, OnInit} from '@angular/core';
import {ScoreLoader, Test, TestGroupLoader} from 'src/models';
import {CurrentItems} from '../../../current-items';
import {TestService} from "examination/app/test";
import {TestHub} from "examination/hubs";
import {AlertEmitter} from "examination/controls";

@Component({
  templateUrl: 'test-home.page.html',
  selector: 'app-test-home'
})
export class TestHomePage implements OnInit {
  test: Test;

  testEndedSubscription = test => {
    if (test.id === this.test.id) {
      this.test.endDate = test.endDate;
      this._alertEmitter.info("Cette épreuve vient d'être arrêtée.");
    }
  };

  testRestartedSubscription = test => {
    if (test.id === this.test.id) {
      this.test.endDate = null;
      this._alertEmitter.info("Cette épreuve vient d'être relancée.");
    }
  };

  testStartedSubscription = test => {
    if (test.id === this.test.id) {
      this.test.startDate = test.startDate;
      this._alertEmitter.info("Cette épreuve vient d'être relancée.");
    }
  };

  constructor(currentItems: CurrentItems,
              public service: TestService,
              private _testHub: TestHub,
              private _alertEmitter: AlertEmitter,
              private _scoreLoader: ScoreLoader,
              private _testGroupLoader: TestGroupLoader) {
    this.test = currentItems.get('test');
  }

  async ngOnInit() {
    this.test.testGroups = await this._testGroupLoader.loadByTest(this.test);

    this._testHub.testEnded.subscribe(this.testEndedSubscription);

    this._testHub.testRestarted.subscribe(this.testRestartedSubscription);

    this._testHub.testStarted.subscribe(this.testStartedSubscription);
  }

}
