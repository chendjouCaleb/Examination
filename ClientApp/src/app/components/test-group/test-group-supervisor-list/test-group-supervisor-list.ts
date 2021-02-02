import { ITestGroupService,  TEST_GROUP_SERVICE_TOKEN } from "../test-group.service.interface";
import {Component, Inject, Input} from "@angular/core";
import {TestGroup, TestGroupSupervisorLoader} from "examination/models";

@Component({
  selector: 'app-testGroupSupervisorList, [app-testGroupSupervisorList]',
  templateUrl: 'test-group-supervisor-list.html'
})
export class TestGroupSupervisorList {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader) {
  }

  async ngOnInit() {
    this.testGroup.testGroupSupervisors = await this._testGroupSupervisorLoader.loadByTestGroup(this.testGroup);
  }
}
