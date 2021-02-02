import {Component, Inject, Input, OnInit} from '@angular/core';
import {Course, Examination, ExaminationDepartment, ExaminationLevel, Test} from 'examination/entities';
import {ITestAddParams, ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {TestLoader} from 'examination/loaders';
import {List} from '@positon/collections';

@Component({
  templateUrl: 'test-list.html',
  selector: 'app-test-list'
})
export class TestList implements OnInit {
  @Input()
  examination: Examination;

  @Input()
  examinationDepartment: ExaminationDepartment;

  @Input()
  examinationLevel: ExaminationLevel;

  @Input()
  course: Course;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testLoader: TestLoader) {
  }


  async ngOnInit() {
    if (this.examination) {
      await this._testLoader.loadByExamination(this.examination);
    } else if (this.examinationDepartment) {
      await this._testLoader.loadByExaminationDepartment(this.examinationDepartment);
    } else if (this.examinationLevel) {
      await this._testLoader.loadByExaminationLevel(this.examinationLevel);
    }
  }

  add() {
    const params: ITestAddParams = {
      examination: this.examination,
      examinationDepartment: this.examinationDepartment,
      examinationLevel: this.examinationLevel,
      course: this.course
    };

    this.service.add(params);
  }


  get tests(): List<Test> {
    if (this.examination) {
      return this.examination.tests;
    } else if (this.examinationDepartment) {
      return this.examinationDepartment.tests;
    } else if (this.examinationLevel) {
      return this.examinationLevel.tests;
    }
    return new List<Test>();
  }

}
