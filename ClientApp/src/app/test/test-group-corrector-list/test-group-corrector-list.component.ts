import {Component, Inject, Input} from "@angular/core";
import {TestGroup} from "examination/models";
import {ITestService, TEST_SERVICE_TOKEN } from "../test.service.interface";

@Component({
  selector: 'app-testGroupCorrectorList, [app-testGroupCorrectorList]',
  templateUrl: 'test-group-corrector-list.component.html'
})
export class TestGroupCorrectorListComponent {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService) {}
}
