﻿import {Observable} from 'rxjs';
import {ITestGroupService} from './test-group.service.interface';
import {Injectable} from '@angular/core';
import {
  Test,
  TestGroup,
  TestGroupCorrector,
  TestGroupCorrectorHttpClient,
  TestGroupHttpClient,
  TestGroupSecretary,
  TestGroupSecretaryHttpClient,
  TestGroupSupervisor,
  TestGroupSupervisorHttpClient
} from 'examination/models';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {List} from '@positon/collections';
import {TestGroupCorrectorAdd} from './test-group-corrector-add/test-group-corrector-add';
import {TestGroupSecretaryAdd} from './test-group-secretary-add/test-group-secretary-add';
import {TestGroupSupervisorAdd} from './test-group-supervisor-add/test-group-supervisor-add';
import {TestGroupAdd} from 'examination/app/components/test-group/add/test-group-add';
import {MsDialog} from '@ms-fluent/components';

@Injectable({providedIn: 'root'})
export class TestGroupService implements ITestGroupService {

  constructor(private _httpClient: TestGroupHttpClient,
              private _testGroupCorrectorHttpClient: TestGroupCorrectorHttpClient,
              private _testGroupSupervisorHttpClient: TestGroupSupervisorHttpClient,
              private _testGroupSecretaryHttpClient: TestGroupSecretaryHttpClient,
              private _alertEmitter: AlertEmitter,
              private _modal: MsDialog,
              private _confirmation: Confirmation) {

  }

  end(testGroup: TestGroup): Promise<void> {
    const message = `Terminer l'épreuve de ${testGroup.test.course.name} (${testGroup.test.course.code}) pour 
    le groupe ${testGroup.index}?`;
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.end(testGroup);
        testGroup.endDate = new Date();
        resolve();
      });
    });
  }

  restart(testGroup: TestGroup): Promise<void> {
    const message = `Poursuivre l'épreuve de ${testGroup.test.course.name} (${testGroup.test.course.code}) pour 
    le groupe ${testGroup.index}?`;
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.restart(testGroup);
        testGroup.endDate = null;
        resolve();
      });
    });
  }

  start(testGroup: TestGroup): Promise<void> {
    const message = `Débuter l'épreuve de ${testGroup.test.course.name} (${testGroup.test.course.code}) pour 
    le groupe ${testGroup.index}?`;
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.start(testGroup);
        testGroup.startDate = new Date();
        resolve();
      });
    });
  }


  addTestGroupCorrectors(testGroup: TestGroup): Observable<List<TestGroupCorrector>> {
    const modalRef = this._modal.open(TestGroupCorrectorAdd, {autoFocus: false});
    modalRef.componentInstance.testGroup = testGroup;

    return modalRef.afterClosed() as unknown as Observable<List<TestGroupCorrector>>;
  }

  addTestGroupSecretaries(testGroup: TestGroup): Observable<List<TestGroupSecretary>> {
    const modalRef = this._modal.open(TestGroupSecretaryAdd, {autoFocus: false});
    modalRef.componentInstance.testGroup = testGroup;

    return modalRef.afterClosed() as unknown as Observable<List<TestGroupSecretary>>;
  }

  addTestGroupSupervisors(testGroup: TestGroup): Observable<List<TestGroupSupervisor>> {
    const modalRef = this._modal.open(TestGroupSupervisorAdd, {autoFocus: false});
    modalRef.componentInstance.testGroup = testGroup;

    return modalRef.afterClosed() as unknown as Observable<List<TestGroupSupervisor>>;
  }

  removeTestGroupCorrector(testGroup: TestGroup, testGroupCorrector: TestGroupCorrector): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const confirm = this._confirmation.open('Enlever ce correcteur?');
      confirm.accept.subscribe(async () => {
        await this._testGroupCorrectorHttpClient.delete(testGroupCorrector.id);
        testGroup.testGroupCorrectors.removeIf(c => c.id === testGroupCorrector.id);
        this._alertEmitter.info(`Le correcteur a été enlevé`);
        resolve(true);
      });
      confirm.reject.subscribe(() => resolve(false));
    });
  }

  removeTestGroupSecretary(testGroup: TestGroup, testGroupSecretary: TestGroupSecretary): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const confirm = this._confirmation.open('Enlever ce secrétaire?');
      confirm.accept.subscribe(async () => {
        await this._testGroupSecretaryHttpClient.delete(testGroupSecretary.id);
        testGroup.testGroupSecretaries.removeIf(c => c.id === testGroupSecretary.id);
        this._alertEmitter.info(`Le secrétaire a été enlevé`);
        resolve(true);
      });
      confirm.reject.subscribe(() => resolve(false));
    });
  }

  removeTestGroupSupervisor(testGroup: TestGroup, testGroupSupervisor: TestGroupSupervisor): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      const confirm = this._confirmation.open('Enlever ce surveillant?');
      confirm.accept.subscribe(async () => {
        await this._testGroupSupervisorHttpClient.delete(testGroupSupervisor.id);
        testGroup.testGroupSupervisors.removeIf(c => c.id === testGroupSupervisor.id);
        this._alertEmitter.info(`Le surveillant a été enlevé du groupe`);
        resolve(true);
      });
      confirm.reject.subscribe(() => resolve(false));
    });
  }

  setPrincipal(testGroupSupervisor: TestGroupSupervisor): Promise<void> {
    let message = 'Rendre ce surveillant comme principal pour groupe?';
    if (testGroupSupervisor.isPrincipal) {
      message = 'Enlever le statut de principal à ce surveillant pour ce groupe?'
    }


    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._testGroupSupervisorHttpClient.principalState(testGroupSupervisor);
        testGroupSupervisor.isPrincipal = !testGroupSupervisor.isPrincipal;
        this._alertEmitter.info(`Modification de statut effectuée`);
        resolve();
      });
    });
  }

  add(test: Test): Observable<TestGroup> {
    const modalRef = this._modal.open(TestGroupAdd, {autoFocus: false});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed() as unknown as Observable<TestGroup>;
  }

  delete(testGroup: TestGroup): Promise<boolean> {
    const confirm = this._confirmation.open('Supprimer ce groupe?');

    return new Promise<boolean>(resolve => {
      confirm.accept.subscribe(async () => {
        await this._httpClient.delete(testGroup.id);
        testGroup.test.removeTestGroup(testGroup);
        testGroup.test.testGroupCount--;
        this._alertEmitter.error(`Le groupe ${testGroup.index + 1 } a été supprimée`);
        resolve(true);
      });

      confirm.reject.subscribe(() => resolve(false));
    });
  }

}
