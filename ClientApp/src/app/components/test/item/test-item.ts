import {Component, Inject, Input, OnInit} from '@angular/core';
import {Test} from 'examination/entities';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {TestLevelSpecialityLoader} from 'examination/loaders';

@Component({
  templateUrl: 'test-item.html',
  styleUrls: ['test-item.scss'],
  selector: 'app-test-item'
})
export class TestItem implements OnInit {
  @Input()
  test: Test;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testLevelSpecialityLoader: TestLevelSpecialityLoader) {
  }


  ngOnInit(): void {
    this._testLevelSpecialityLoader.loadByTest(this.test);
  }
}
