import {Component, OnInit} from '@angular/core';
import {ScoreLoader, Test, TestGroupLoader} from 'src/models';
import {CurrentItems} from '../../../current-items';
import {TestService} from "examination/app/test";

@Component({
  templateUrl: 'test-home.page.html',
  selector: 'app-test-home'
})
export class TestHomePage implements OnInit{
  test: Test;

  constructor(currentItems: CurrentItems,
              public _testService: TestService,
              private _scoreLoader: ScoreLoader,
              private _testGroupLoader: TestGroupLoader) {
    this.test = currentItems.get('test');
  }

  async ngOnInit() {
    this.test.testGroups = await this._testGroupLoader.loadByTest(this.test);
  }
}
