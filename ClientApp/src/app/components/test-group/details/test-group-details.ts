import {Component, Inject, Input, OnInit} from "@angular/core";
import {TestGroup} from "examination/entities";
import {ITestGroupService, TEST_GROUP_SERVICE_TOKEN} from "../test-group.service.interface";
import {TestGroupHttpClient} from "examination/models/http";


@Component({
  selector: 'app-test-group-details',
  templateUrl: 'test-group-details.html'
})
export class TestGroupDetails implements OnInit {
  @Input()
  testGroup: TestGroup;

  constructor(@Inject(TEST_GROUP_SERVICE_TOKEN) public  service: ITestGroupService,
              private _httpClient: TestGroupHttpClient) {
  }

  async ngOnInit() {
    const statistics:any = await this._httpClient.getStatistics(this.testGroup);
    statistics.radical = this.testGroup.test.radical;
    Object.assign(this.testGroup.statistics, statistics);
  }
}
