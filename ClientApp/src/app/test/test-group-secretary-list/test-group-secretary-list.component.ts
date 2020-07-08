import {Component, Inject, Input, OnInit} from "@angular/core";
import {TestGroup, TestGroupSecretaryLoader} from "examination/models";
import {ITestService, TEST_SERVICE_TOKEN } from "../test.service.interface";

@Component({
  selector: 'app-testGroupSecretaryList, [app-testGroupSecretaryList]',
  templateUrl: 'test-group-secretary-list.component.html'
})
export class TestGroupSecretaryListComponent implements OnInit{
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader) {}

  async ngOnInit() {
    this.testGroup.testGroupSecretaries = await this._testGroupSecretaryLoader.loadByTestGroup(this.testGroup);
  }
}
