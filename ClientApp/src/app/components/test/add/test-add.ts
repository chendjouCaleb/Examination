import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {
  Course,
  CourseLoader,
  Examination,
  ExaminationDepartment,
  ExaminationDepartmentLoader,
  ExaminationLevel,
  ExaminationLevelLoader,
  ExaminationLevelSpecialityLoader,
  TestHttpClient,
  TestLoader
} from 'src/models';
import {TestAddForm} from '../form';
import {MsDialogRef} from '@ms-fluent/components';
import {List} from '@positon/collections';


@Component({
  templateUrl: 'test-add.html'
})
export class TestAdd implements OnInit {
  form: TestAddForm;

  @Input()
  examination: Examination;

  @Input()
  examinationDepartment: ExaminationDepartment;

  @Input()
  examinationLevel: ExaminationLevel;

  @Input()
  course: Course;

  constructor(private _httpClient: TestHttpClient,
              private _examinationDepartmentLoader: ExaminationDepartmentLoader,
              private _examinationLevelLoader: ExaminationLevelLoader,
              private _examinationLevelSpecialityLoader: ExaminationLevelSpecialityLoader,
              private _courseLoader: CourseLoader,
              private _loader: TestLoader,
              private _changeDetector: ChangeDetectorRef,
              private _dialogRef: MsDialogRef<TestAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    if (this.examination) {
      await this._examinationDepartmentLoader.loadByExamination(this.examination);
    } else if (this.examinationDepartment) {
      await this.changeExaminationDepartment(this.examinationDepartment);
    } else if (this.examinationLevel) {
      await this.changeExaminationLevel(this.examinationLevel);
    }

    this.form = new TestAddForm({
      examinationDepartment: this.examinationDepartment,
      examinationLevel: this.examinationLevel,
      course: this.course,
      useAnonymity: true,
    });

  }

  examinationLevels: List<ExaminationLevel>;

  async changeExaminationDepartment(item: ExaminationDepartment) {
    if (item) {
      await this._examinationLevelLoader.loadByExaminationDepartment(item);

      this.examinationLevels = item.examinationLevels;
    } else {
      this.examinationLevels = null;
    }
  }

  courses: List<Course>;


  async changeExaminationLevel(item: ExaminationLevel) {
    if (item) {
      await this._courseLoader.loadByLevel(item.level);
      this.courses = item.level.courses;
    } else {
      this.courses = null;
    }
  }

  selectedCourse: Course;

  changeCourse(item: Course) {
    this.selectedCourse = item;
    this.form.getControl('coefficient').setValue(item.coefficient);
  }


  async add() {
    if (this.form.invalid) {
      return;
    }
    const formModel = this.form.getModel();
    const test = await this._httpClient.addTest(formModel.body, formModel.params);
    await this._loader.load(test);

    this.examinationLevel?.tests?.insert(0, test);
    this.examinationDepartment?.tests?.insert(0, test);
    this.examination?.tests?.insert(0, test);

    this._alertEmitter.info(`L'épreuve ${test.course.name}(${test.course.code}) a été ajouté.`);
    this._dialogRef.close(test);
  }
}
