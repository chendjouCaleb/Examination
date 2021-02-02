import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from "../test-group.service.interface";
import {Component, Inject, Input, OnInit} from "@angular/core";
import {TestGroup, TestGroupSecretaryLoader} from "examination/models";


@Component({
  selector: 'app-testGroupSecretaryList, [app-testGroupSecretaryList]',
  templateUrl: 'test-group-secretary-list.html'
})
export class TestGroupSecretaryList implements OnInit {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public service: ITestGroupService,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader) {
  }

  async ngOnInit() {
    this.testGroup.testGroupSecretaries = await this._testGroupSecretaryLoader.loadByTestGroup(this.testGroup);
  }
}
