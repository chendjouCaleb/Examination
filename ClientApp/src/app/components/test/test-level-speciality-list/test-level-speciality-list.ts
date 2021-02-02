import {Component, Inject, Input, OnInit} from '@angular/core';
import {CourseLevelSpeciality, ExaminationLevelSpeciality, ExaminationSpeciality, Test, TestLevelSpeciality} from 'examination/entities';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {TestLevelSpecialityLoader} from 'examination/loaders';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'test-level-speciality-list.html',
  selector: 'app-test-level-speciality-list'
})
export class TestLevelSpecialityList implements OnInit {

  @Input()
  examinationSpeciality: ExaminationSpeciality;

  @Input()
  examinationLevelSpeciality: ExaminationLevelSpeciality;

  @Input()
  courseLevelSpeciality: CourseLevelSpeciality;

  @Input()
  test: Test;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testLevelSpecialityLoader: TestLevelSpecialityLoader) {
  }


  async ngOnInit() {
    if (this.examinationSpeciality) {
      await this._testLevelSpecialityLoader.loadByExaminationSpeciality(this.examinationSpeciality);
    } else if (this.examinationLevelSpeciality) {
      await this._testLevelSpecialityLoader.loadByExaminationLevelSpeciality(this.examinationLevelSpeciality);
    } else if (this.courseLevelSpeciality) {
      await this._testLevelSpecialityLoader.loadByCourseLevelSpeciality(this.courseLevelSpeciality);
    } else if (this.test) {
      await this._testLevelSpecialityLoader.loadByTest(this.test);
    }
  }

  get testLevelSpecialities(): List<TestLevelSpeciality> {
    if (this.examinationSpeciality) {
      return this.examinationSpeciality.testLevelSpecialities;
    } else if (this.examinationLevelSpeciality) {
      return this.examinationLevelSpeciality.testLevelSpecialities;
    } else if (this.courseLevelSpeciality) {
      return this.courseLevelSpeciality.testLevelSpecialities;
    } else if (this.test) {
      return this.test.testLevelSpecialities;
    }
    return new List<TestLevelSpeciality>();
  }

}
