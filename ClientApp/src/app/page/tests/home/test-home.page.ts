import {Component, OnInit} from '@angular/core';
import {ScoreLoader, Test, TestGroupLoader} from 'src/models';
import {CurrentItems} from '../../../current-items';
import {TestService} from "examination/app/test";
import {TestHub} from "examination/hubs";
import {AlertEmitter} from "examination/controls";

@Component({
  templateUrl: 'test-home.page.html',
  selector: 'app-test-home'
})
export class TestHomePage implements OnInit{
  test: Test;

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

    this._testHub.testEnded.subscribe(test => {
      if(test.id === this.test.id) {
        this.test.endDate = test.endDate;
        this._alertEmitter.info("Cette épreuve vient d'être arrêtée.");
      }
    });

    this._testHub.testRestarted.subscribe(test => {
      if(test.id === this.test.id) {
        this.test.endDate = null;
        this._alertEmitter.info("Cette épreuve vient d'être relancée.");
      }
    });

    this._testHub.testStarted.subscribe(test => {
      if(test.id === this.test.id) {
        this.test.startDate = test.startDate;
        this._alertEmitter.info("Cette épreuve vient d'être relancée.");
      }
    });
  }
}
