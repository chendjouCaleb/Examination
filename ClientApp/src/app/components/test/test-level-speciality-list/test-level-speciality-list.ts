import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {CourseLevelSpeciality, ExaminationLevelSpeciality, ExaminationSpeciality, Test, TestLevelSpeciality} from 'examination/entities';
import {ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {TestLevelSpecialityLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {MsTable} from '@ms-fluent/table';

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

  @ViewChild(MsTable)
  table: MsTable;

  testLevelSpecialities: TestLevelSpeciality[] = [];

  _isLoaded: boolean = false;

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

    this._isLoaded = true;
    this.testLevelSpecialities = this.getTestLevelSpecialities().toArray();
    this.table.unshift(...this.testLevelSpecialities)
  }

  getTestLevelSpecialities(): List<TestLevelSpeciality> {
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
