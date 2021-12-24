import {Component, Inject, Input, OnInit} from '@angular/core';
import {Test, TestGroup} from 'examination/entities';
import {TestGroupLoader, TestLevelSpecialityLoader} from 'examination/loaders';
import {TestGroupHttpClient, TestHttpClient} from "examination/models/http";
import {Router} from "@angular/router";
import {ITestService, TEST_SERVICE_TOKEN} from "../../../../components/test";
import {PaperService} from "../../../../components/paper";
import {TestGroupService} from "../../../../components/test-group";

@Component({
  templateUrl: 'TestHome.page.html',
  selector: 'TestHomePage',

})
export class TestHomePage implements OnInit {
  @Input()
  test: Test;

  testGroups: TestGroup[];

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testLevelSpecialityLoader: TestLevelSpecialityLoader,
              private _router: Router,
              private paperService: PaperService,
              private testGroupService: TestGroupService,
              private testGroupHttpClient: TestGroupHttpClient, private testGroupLoader: TestGroupLoader,
              private _httpClient: TestHttpClient) {
  }

  async ngOnInit() {
    this._testLevelSpecialityLoader.loadByTest(this.test);
    const statistics: any = await this._httpClient.getStatistics(this.test);
    statistics.radical = this.test.radical;
    Object.assign(this.test.statistics, statistics);

    this.testGroups = (await this.testGroupHttpClient.list({testId: this.test.id})).toArray();
    this.testGroupLoader.loadAll(this.testGroups);
  }

  addGroup() {
    this.testGroupService.add(this.test).subscribe(testGroup => {
      if (testGroup) {
        this.testGroups.push(testGroup);
      }
    })
  }

  addPapers() {
    this.paperService.addPapers(this.test);
  }

  delete() {
    this.service.delete(this.test).then((deleted) => {
      if (deleted) {
        this._router.navigateByUrl(this.test.examinationLevel.url('tests')).then();
      }
    });
  }
}
