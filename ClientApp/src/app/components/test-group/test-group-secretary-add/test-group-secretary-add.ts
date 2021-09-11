import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {MsDialogRef} from '@ms-fluent/components';
import {List} from '@positon/collections';
import {
  Department,
  Secretary,
  SecretaryHttpClient,
  SecretaryLoader,
  TestGroup,
  TestGroupSecretaryHttpClient,
  TestGroupSecretaryLoader
} from 'examination/models';

@Component({
  templateUrl: 'test-group-secretary-add.html'
})
export class TestGroupSecretaryAdd implements OnInit {
  secretaryId: number[] = [];

  @Input()
  testGroup: TestGroup;

  secretaries: List<Secretary>;

  constructor(private _httpClient: TestGroupSecretaryHttpClient,
              private _secretaryHttpClient: SecretaryHttpClient,
              private _secretaryLoader: SecretaryLoader,
              private _loader: TestGroupSecretaryLoader,
              private _dialogRef: MsDialogRef<TestGroupSecretaryAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    await this._secretaryLoader.loadByDepartment(this.department);
    this.secretaries = this.department.secretaries;

    for (const item of this.testGroup.testGroupSecretaries) {
      this.secretaries.removeIf(c => c.id === item.secretaryId);
    }
  }


  async add() {
    const secretaries = await this._httpClient.addRange({},
      {
        secretaryId: this.secretaryId,
        testGroupId: this.testGroup.id
      });

    for (const secretary of secretaries) {
      await this._loader.load(secretary);
    }

    this.testGroup.testGroupSecretaries.addRange(secretaries);

    this._alertEmitter.info(`Les sécretaires ont été ajoutés.`);
    this._dialogRef.close(secretaries);
  }

  get department(): Department {
    return this.testGroup.test.course.level.department;
  }
}
