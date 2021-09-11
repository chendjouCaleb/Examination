import {AfterViewInit, Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {Course, Examination, ExaminationDepartment, ExaminationLevel, Test} from 'examination/entities';
import {ITestAddParams, ITestService, TEST_SERVICE_TOKEN} from '../test.service.interface';
import {TestLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {MsTable} from "@ms-fluent/components";

@Component({
  templateUrl: 'test-list.html',
  selector: 'app-test-list'
})
export class TestList implements OnInit, AfterViewInit {
  @Input()
  examination: Examination;

  @Input()
  examinationDepartment: ExaminationDepartment;

  @Input()
  examinationLevel: ExaminationLevel;

  @Input()
  course: Course;

  @ViewChild(MsTable)
  table: MsTable<Test>;

  tests: Test[] = [];

  @Input()
  columns: string[] = [];

  _isLoaded: boolean = false;
  isLoading: boolean = true;

  constructor(@Inject(TEST_SERVICE_TOKEN) public service: ITestService,
              private _testLoader: TestLoader) {
  }


  async ngOnInit() {
    try {
      if (this.examination) {
        await this._testLoader.loadByExamination(this.examination);
      } else if (this.examinationDepartment) {
        await this._testLoader.loadByExaminationDepartment(this.examinationDepartment);
      } else if (this.examinationLevel) {
        await this._testLoader.loadByExaminationLevel(this.examinationLevel);
      } else if (this.course) {
        await this._testLoader.loadByCourse(this.course);
      }

      this._isLoaded = true;
      this.tests = this.getTests().toArray();
      this.table.unshift(...this.tests);
      this.isLoading = false;
    }catch (e) {
      this.isLoading = false;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

    })
  }

  add() {
    const params: ITestAddParams = {
      examination: this.examination,
      examinationDepartment: this.examinationDepartment,
      examinationLevel: this.examinationLevel,
      course: this.course
    };

    this.service.add(params).subscribe(test => {
      if (test && this.table) {
        this.table.unshift(test);
      }
    });
  }


  getTests(): List<Test> {
    if (this.examination) {
      return this.examination.tests;
    } else if (this.examinationDepartment) {
      return this.examinationDepartment.tests;
    } else if (this.examinationLevel) {
      return this.examinationLevel.tests;
    } else if (this.course) {
      return this.course.tests;
    }
    return new List<Test>();
  }

}
