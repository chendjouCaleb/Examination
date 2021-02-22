import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from '../test-group.service.interface';
import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {TestGroup, TestGroupSupervisor, TestGroupSupervisorLoader} from 'examination/models';
import {MsTable} from '@ms-fluent/table';

@Component({
  selector: 'app-testGroupSupervisorList, [app-testGroupSupervisorList]',
  templateUrl: 'test-group-supervisor-list.html'
})
export class TestGroupSupervisorList implements OnInit {
  @Input()
  testGroup: TestGroup;

  @ViewChild(MsTable)
  table: MsTable;

  supervisors: TestGroupSupervisor[] = [];

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader) {
  }

  async ngOnInit() {
    this.testGroup.testGroupSupervisors = await this._testGroupSupervisorLoader.loadByTestGroup(this.testGroup);
    this.table.unshift(...this.testGroup.testGroupSupervisors.toArray());
  }

  addTestGroupSupervisors(testGroup: TestGroup) {
    this.service.addTestGroupSupervisors(testGroup).subscribe(items => this.table.unshift(...items.toArray()));
  }

  remove(supervisor: TestGroupSupervisor) {
    this.service.removeTestGroupSupervisor(this.testGroup, supervisor).then(deleted => {
      if (deleted) {
        this.table.remove(supervisor);
      }
    })
  }
}
