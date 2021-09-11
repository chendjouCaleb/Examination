import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import { Test} from 'examination/entities';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {MsDialogRef} from '@ms-fluent/components';
import {TestLevelSpecialityLoader} from 'examination/loaders';
import {COURSE_SERVICE_TOKEN, ICourseService} from 'examination/app/components/course';
import {IPaperService, PAPER_SERVICE_TOKEN} from "examination/app/components/paper";
import {TestHttpClient} from "examination/models/http";

@Component({
  templateUrl: 'test-details.html',
  selector: 'app-test-details',

})
export class TestDetails implements OnInit {
  @Input()
  test: Test;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              @Inject(COURSE_SERVICE_TOKEN) public courseService: ICourseService,
              private _testLevelSpecialityLoader: TestLevelSpecialityLoader,
              private _httpClient: TestHttpClient,
              @Optional() private _modalRef: MsDialogRef<TestDetails>) {
  }

  async ngOnInit()  {
    this._testLevelSpecialityLoader.loadByTest(this.test);
    const statistics:any = await this._httpClient.getStatistics(this.test);
    statistics.radical = this.test.radical;
    Object.assign(this.test.statistics, statistics);
  }

  delete() {
    this.service.delete(this.test).then(() => this._modalRef?.close());
  }
}
