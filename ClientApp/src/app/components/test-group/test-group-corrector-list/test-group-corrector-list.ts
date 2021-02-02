import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from '../test-group.service.interface';
import {Component, Inject, Input, OnInit} from '@angular/core';
import {TestGroup, TestGroupCorrectorLoader} from 'examination/models';

@Component({
  selector: 'app-testGroupCorrectorList, [app-testGroupCorrectorList]',
  templateUrl: 'test-group-corrector-list.html'
})
export class TestGroupCorrectorList implements OnInit {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader
  ) {
  }

  async ngOnInit() {
    await this._testGroupCorrectorLoader.loadByTestGroup(this.testGroup);
  }
}
