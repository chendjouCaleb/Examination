import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from '../test-group.service.interface';
import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {TestGroup, TestGroupSecretary, TestGroupSecretaryLoader} from 'examination/models';
import {MsTable} from '@ms-fluent/components';


@Component({
  selector: 'app-testGroupSecretaryList, [app-testGroupSecretaryList]',
  templateUrl: 'test-group-secretary-list.html'
})
export class TestGroupSecretaryList implements OnInit {
  @Input()
  testGroup: TestGroup;

  @ViewChild(MsTable)
  table: MsTable;

  secretaries: TestGroupSecretary[] = [];

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader) {
  }

  async ngOnInit() {
    this.testGroup.testGroupSecretaries = await this._testGroupSecretaryLoader.loadByTestGroup(this.testGroup);

    this.table.unshift(...this.testGroup.testGroupSecretaries.toArray());
  }

  addTestGroupSecretaries(testGroup: TestGroup) {
    this.service.addTestGroupSecretaries(testGroup).subscribe(items => {
      if (items) {
        this.table.unshift(...items.toArray());
      }
    });
  }

  remove(secretary: TestGroupSecretary) {
    this.service.removeTestGroupSecretary(this.testGroup, secretary).then(deleted => {
      if (deleted) {
        this.table.remove(secretary);
      }
    })
  }
}
