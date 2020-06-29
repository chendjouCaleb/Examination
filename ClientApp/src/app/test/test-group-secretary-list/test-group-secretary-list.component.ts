import {Component, Inject, Input} from "@angular/core";
import {TestGroup} from "examination/models";
import {ITestService, TEST_SERVICE_TOKEN } from "../test.service.interface";

@Component({
  selector: 'app-testGroupSecretaryList, [app-testGroupSecretaryList]',
  templateUrl: 'test-group-secretary-list.component.html'
})
export class TestGroupSecretaryListComponent {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService) {}
}
