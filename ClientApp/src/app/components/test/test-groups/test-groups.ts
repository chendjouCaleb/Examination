import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Test, TestGroup} from 'examination/entities';
import {TestGroupLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from 'examination/app/components/test-group';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {IPaperService, PAPER_SERVICE_TOKEN} from 'examination/app/components/paper';
import {MsTable} from '@ms-fluent/table';


@Component({
  templateUrl: 'test-groups.html',
  selector: 'app-test-groups'
})
export class TestGroups implements OnInit {
  @Input()
  test: Test;

  groups: TestGroup[] = [];
  isLoaded: boolean = false;

  @ViewChild(MsTable)
  table: MsTable;

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              @Inject(TEST_SERVICE_TOKEN) public testService: ITestService,
              @Inject(PAPER_SERVICE_TOKEN) public paperService: IPaperService,
              private _testGroupLoader: TestGroupLoader) {
  }


  async ngOnInit() {
    await this._testGroupLoader.loadByTest(this.test);
    this.isLoaded = true;
    this.table.unshift(...this.getTestGroups().toArray())
  }

  getTestGroups(): List<TestGroup> {
    if (this.test) {
      return this.test.testGroups;
    }
    return new List<TestGroup>();
  }

  delete(group: TestGroup) {
    this.service.delete(group).then(deleted => {
      if (deleted) {
        this.table.remove(group);
      }
    });
  }

  addGroup() {
    this.service.add(this.test).subscribe(group => {
      if (group) {
        this.table.unshift(group);
      }
    });
  }

}
