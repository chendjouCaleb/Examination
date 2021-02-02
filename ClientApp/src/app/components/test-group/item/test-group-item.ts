import {Component, Inject, Input, OnInit} from '@angular/core';
import {TestGroup} from 'examination/entities';
import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from '../test-group.service.interface';
import {TestGroupCorrectorLoader} from 'examination/loaders';

@Component({
  templateUrl: 'test-group-item.html',
  styleUrls: ['test-group-item.scss'],
  selector: 'app-test-group-item'
})
export class TestGroupItem implements OnInit {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader) {
  }


  async ngOnInit() {
    await this._testGroupCorrectorLoader.loadByTestGroup(this.testGroup);
  }
}
