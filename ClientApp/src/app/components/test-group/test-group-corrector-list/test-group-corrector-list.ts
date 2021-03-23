import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from '../test-group.service.interface';
import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {TestGroup, TestGroupCorrector, TestGroupCorrectorLoader, TestGroupSecretary} from 'examination/models';
import {MsTable} from '@ms-fluent/table';

@Component({
  selector: 'app-testGroupCorrectorList, [app-testGroupCorrectorList]',
  templateUrl: 'test-group-corrector-list.html'
})
export class TestGroupCorrectorList implements OnInit {
  @Input()
  testGroup: TestGroup;

  @ViewChild(MsTable)
  table: MsTable;

  correctors: TestGroupCorrector[] = [];

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader
  ) {
  }

  async ngOnInit() {
    await this._testGroupCorrectorLoader.loadByTestGroup(this.testGroup);
    this.table.unshift(...this.testGroup.testGroupCorrectors.toArray())
  }

  addTestGroupCorrectors(testGroup: TestGroup) {
    this.service.addTestGroupCorrectors(testGroup).subscribe(items => {
      if (items) {
        this.table.unshift(...items?.toArray());
      }
    });
  }

  remove(corrector: TestGroupCorrector) {
    this.service.removeTestGroupCorrector(this.testGroup, corrector).then(deleted => {
      if (deleted) {
        this.table.remove(corrector);
      }
    })
  }
}
