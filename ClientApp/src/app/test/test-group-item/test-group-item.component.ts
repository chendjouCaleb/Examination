import {Component, Inject, Input, OnInit} from "@angular/core";
import {
  TestGroup,
  TestGroupCorrectorLoader,
  TestGroupSecretaryLoader,
  TestGroupSupervisorLoader
} from "examination/models";
import {ITestService, TEST_SERVICE_TOKEN} from "../test.service.interface";

@Component({
  selector: 'app-testGroupItem',
  templateUrl: 'test-group-item.component.html'
})
export class TestGroupItemComponent implements OnInit{
  @Input()
  testGroup: TestGroup;

  constructor( @Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader) {
  }


  async ngOnInit() {
    this.testGroup.testGroupCorrectors = await this._testGroupCorrectorLoader.loadByTestGroup(this.testGroup);
    this.testGroup.testGroupSecretaries = await this._testGroupSecretaryLoader.loadByTestGroup(this.testGroup);
    this.testGroup.testGroupSupervisors = await this._testGroupSupervisorLoader.loadByTestGroup(this.testGroup);
  }

}
