import {Component, Input, OnInit} from '@angular/core';
import {Examination, ExaminationDepartment, ExaminationLevel, Test, TestGroup} from 'examination/entities';
import {Title} from '@angular/platform-browser';
import {CurrentItems} from 'examination/app/current-items';
import {TestGroupCorrectorLoader, TestGroupSecretaryLoader, TestGroupSupervisorLoader} from 'examination/loaders';
import {AuthorizationManager} from 'examination/app/authorization';

@Component({
  templateUrl: 'test-group.page-layout.html',
  selector: 'app-test-group-page-layout'
})
export class TestGroupPageLayout implements OnInit {
  @Input()
  testGroup: TestGroup;

  @Input()
  title: string;

  _isOk: boolean;

  constructor(private _title: Title, private _items: CurrentItems,
              private _authorizer: AuthorizationManager,
              private _testGroupCorrectorLoader: TestGroupCorrectorLoader,
              private _testGroupSupervisorLoader: TestGroupSupervisorLoader,
              private _testGroupSecretaryLoader: TestGroupSecretaryLoader) {
    this.testGroup = _items.get('testGroup');
  }

  async ngOnInit() {

    this._title.setTitle(`Épreuves - ${this.test.course.name}(${this.test.course.code})`);

    await this._testGroupCorrectorLoader.loadByTestGroup(this.testGroup);
    await this._testGroupSupervisorLoader.loadByTestGroup(this.testGroup);
    await this._testGroupSecretaryLoader.loadByTestGroup(this.testGroup);
    this._isOk = true;
  }

  get examination(): Examination {
    return this.examinationDepartment.examination;
  }

  get examinationDepartment(): ExaminationDepartment {
    return this.examinationLevel.examinationDepartment;
  }

  get examinationLevel(): ExaminationLevel {
    return this.test.examinationLevel;
  }

  get test(): Test {
    return this.testGroup.test;
  }
}
