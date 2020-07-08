import {Component, Inject, Input} from "@angular/core";
import {TestGroup, TestGroupSupervisorLoader} from "examination/models";
import {ITestService, TEST_SERVICE_TOKEN } from "../test.service.interface";

@Component({
  selector: 'app-testGroupSupervisorList, [app-testGroupSupervisorList]',
  templateUrl: 'test-group-supervisor-list.component.html'
})
export class TestGroupSupervisorListComponent {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader) {}

  async ngOnInit() {
    this.testGroup.testGroupSupervisors = await this._testGroupSupervisorLoader.loadByTestGroup(this.testGroup);
  }
}
