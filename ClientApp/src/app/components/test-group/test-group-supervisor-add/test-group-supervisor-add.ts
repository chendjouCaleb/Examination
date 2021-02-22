﻿import {Component, Input, OnInit} from '@angular/core';
import {AlertEmitter} from 'src/controls/alert-emitter';
import {MsfModalRef} from 'fabric-docs';
import {List} from '@positon/collections';
import {
  Department,
  Supervisor,
  SupervisorHttpClient,
  SupervisorLoader,
  TestGroup,
  TestGroupSupervisorHttpClient,
  TestGroupSupervisorLoader
} from 'examination/models';

@Component({
  templateUrl: 'test-group-supervisor-add.html'
})
export class TestGroupSupervisorAdd implements OnInit {
  supervisorId: number[] = [];

  @Input()
  testGroup: TestGroup;

  supervisors: List<Supervisor>;

  constructor(private _httpClient: TestGroupSupervisorHttpClient,
              private _supervisorHttpClient: SupervisorHttpClient,
              private _supervisorLoader: SupervisorLoader,
              private _loader: TestGroupSupervisorLoader,
              private _dialogRef: MsfModalRef<TestGroupSupervisorAdd>,
              private _alertEmitter: AlertEmitter) {

  }

  async ngOnInit() {
    await this._supervisorLoader.loadByDepartment(this.department);

    const supervisors = this.department.supervisors;
    for (const item of this.testGroup.testGroupSupervisors) {
      supervisors.removeIf(c => c.id === item.supervisorId);
    }
    this.supervisors = supervisors;
  }


  async add() {
    const supervisors = await this._httpClient.addRange({},
      {
        supervisorId: this.supervisorId,
        testGroupId: this.testGroup.id
      });

    for (const supervisor of supervisors) {
      await this._loader.load(supervisor);
    }

    this.testGroup.testGroupSupervisors.addRange(supervisors);

    this._alertEmitter.info(`Les correcteurs ont été ajoutées.`);
    this._dialogRef.close(supervisors);
  }

  get department(): Department {
    return this.testGroup.test.course.level.department;
  }
}
