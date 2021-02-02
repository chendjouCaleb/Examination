import {Component, Inject, Input, OnInit, Optional} from '@angular/core';
import {PaperStatistics, TestLevelSpeciality} from 'examination/entities';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {MsfModalRef} from 'fabric-docs';
import {TestLevelSpecialityLoader} from 'examination/loaders';
import {COURSE_SERVICE_TOKEN, ICourseService} from 'examination/app/components/course';
import {TestLevelSpecialityHttpClient} from "examination/models/http";

@Component({
  templateUrl: 'test-level-speciality-details.html',
  selector: 'app-test-level-speciality-details',

})
export class TestLevelSpecialityDetails implements OnInit {
  @Input()
  testLevelSpeciality: TestLevelSpeciality;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              @Inject(COURSE_SERVICE_TOKEN) public courseService: ICourseService,
              private _httpClient: TestLevelSpecialityHttpClient,
              private _testLevelSpecialityLoader: TestLevelSpecialityLoader,
              @Optional() private _modalRef: MsfModalRef<TestLevelSpecialityDetails>) {
  }

  async ngOnInit() {
    const statistics:any = await this._httpClient.getStatistics(this.testLevelSpeciality);
    statistics.radical = this.testLevelSpeciality.test.radical;
    Object.assign(this.testLevelSpeciality.statistics, statistics);
  }


  get statistics(): PaperStatistics {
    return this.testLevelSpeciality.statistics;
  }
}
