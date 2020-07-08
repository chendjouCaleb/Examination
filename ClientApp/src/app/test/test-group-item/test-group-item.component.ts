import {Component, Inject, Input} from "@angular/core";
import {TestGroup} from "examination/models";
import {ITestService, TEST_SERVICE_TOKEN} from "../test.service.interface";

@Component({
  selector: 'app-testGroupItem',
  templateUrl: 'test-group-item.component.html'
})
export class TestGroupItemComponent {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService) {
  }

}
