import {ITestAddParams, ITestService} from './test.service.interface';
import {Injectable} from '@angular/core';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {
  Score,
  ScoreHttpClient,
  Test,
  TestGroupCorrectorHttpClient,
  TestGroupSecretaryHttpClient,
  TestGroupSupervisor,
  TestGroupSupervisorHttpClient,
  TestHttpClient,
  TestLevelSpeciality,
  TestScore
} from 'examination/models';
import {MsfModal} from 'fabric-docs';
import {Observable, ReplaySubject} from 'rxjs';
import {TestAdd} from './add/test-add';
import {TestEdit} from './edit/test-edit';
import {TestEditDate} from './date/test-edit-date';
import {TestScoreAdd} from './score-add/test-score-add';
import {TestDetails} from './test-details/test-details';
import {TestLevelSpecialityDetails} from './test-level-speciality-details/test-level-speciality-details';
import {PublishScore} from "./publish/publish-score";

@Injectable({
  providedIn: 'root'
})
export class TestService implements ITestService {
  get onRemove(): Observable<Test> {
    return this._onRemove.asObservable();
  };

  _onRemove = new ReplaySubject<Test>();

  get onNew(): Observable<Test> {
    return this._onNew.asObservable();
  };

  _onNew = new ReplaySubject<Test>();

  constructor(public _confirmation: Confirmation,
              public _alertEmitter: AlertEmitter,
              public _modal: MsfModal,
              public _httpClient: TestHttpClient,
              private _testGroupCorrectorHttpClient: TestGroupCorrectorHttpClient,
              private _testGroupSupervisorHttpClient: TestGroupSupervisorHttpClient,
              private _testGroupSecretaryHttpClient: TestGroupSecretaryHttpClient,
              public _scoreHttpClient: ScoreHttpClient) {
  }

  details(test: Test) {
    const modalRef = this._modal.open(TestDetails, {autoFocus: false});
    modalRef.componentInstance.test = test;
  }

  detailsTestLevelSpeciality(item: TestLevelSpeciality) {
    const modalRef = this._modal.open(TestLevelSpecialityDetails, {autoFocus: false});
    modalRef.componentInstance.testLevelSpeciality = item;
  }

  add(params: ITestAddParams): Observable<Test> {
    const modalRef = this._modal.open(TestAdd, {disableClose: true});
    modalRef.componentInstance.examination = params.examination;
    modalRef.componentInstance.examinationDepartment = params.examinationDepartment;
    modalRef.componentInstance.examinationLevel = params.examinationLevel;
    modalRef.componentInstance.course = params.course;
    return modalRef.afterClosed();
  }


  edit(test: Test): Observable<Test> {
    const modalRef = this._modal.open(TestEdit, {disableClose: true});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed();
  }

  editDate(test: Test): Observable<Test> {
    const modalRef = this._modal.open(TestEditDate, {disableClose: true});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed();
  }

  publish(test: Test): Observable<void> {
    const modalRef = this._modal.open(PublishScore, {autoFocus: false});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed();
  }

  setAnonymous(test: Test): Promise<Test> {
    return new Promise<Test>(subscriber => {
      const confirm = this._confirmation.open('Rendre cette épreuve anonyme?');
      confirm.accept.subscribe(async () => {
        await this._httpClient.anonymous(test);
        test.useAnonymity = true;
        this._alertEmitter.info(`L'épreuve ${test.course.name}(${test.course.code}) utilise des anonymats`);
        subscriber(test);
      });
    });
  }

  unsetAnonymous(test: Test): Promise<Test> {
    return new Promise<Test>(subscriber => {
      const confirm = this._confirmation.open('Enlever l\'anonymat sur cet épreuve?');
      confirm.accept.subscribe(async () => {
        await this._httpClient.anonymous(test);
        test.useAnonymity = false;
        const m = `L'épreuve ${test.course.name}(${test.course.code}) n'utilise plus des anonymats`;
        this._alertEmitter.info(m);
        subscriber(test);
      });
    });
  }

  delete(test: Test): Promise<boolean> {
    const confirm = this._confirmation.open('Supprimer cette épreuve?');

    return new Promise<boolean>(resolve => {
      confirm.accept.subscribe(async () => {
        await this._httpClient.delete(test.id);
        this._onRemove.next(test);
        test.examinationLevel?.tests?.remove(test);
        this._alertEmitter.error(`L'épreuve ${test.course.name}(${test.course.code}) a été supprimée`);
        resolve(true);
      });
    });
  }

  setPrincipal(testGroupSupervisor: TestGroupSupervisor): Promise<void> {
    let message = 'Rendre ce surveillant comme principal pour groupe?';
    if (testGroupSupervisor.isPrincipal) {
      message = 'Enlever le statut de principal à ce surveillant pour ce groupe?';
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

  changeCloseState(test: Test): Promise<void> {
    let message = `Vérouiller l'épreuve de ${test.course.name} (${test.course.code})`;
    if (test.isClosed) {
      message = `Dévérouiller l'épreuve de ${test.course.name} (${test.course.code})`;
    }


    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.changeCloseState(test);
        test.closingDate = test.isClosed ? null : new Date();
        this._alertEmitter.info(`Modification de statut effectuée`);
        resolve();
      });
    });
  }

  end(test: Test): Promise<void> {
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(`Terminer l'épreuve de ${test.course.name} (${test.course.code})?`);
      confirm.accept.subscribe(async () => {
        await this._httpClient.end(test);
        test.endDate = new Date();
        resolve();
      });
    });
  }

  restart(test: Test): Promise<void> {
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(`Continuer l'épreuve de ${test.course.name} (${test.course.code})?`);
      confirm.accept.subscribe(async () => {
        await this._httpClient.restart(test);
        test.endDate = null;
        resolve();
      });
    });
  }

  start(test: Test): Promise<void> {
    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(`Débuter l'épreuve de ${test.course.name} (${test.course.code})?`);
      confirm.accept.subscribe(async () => {
        await this._httpClient.start(test);
        test.startDate = new Date();
        resolve();
      });
    });
  }


  addScore(test: Test): Promise<Score> {
    const modalRef = this._modal.open(TestScoreAdd, {disableClose: true});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed().toPromise();
  }

  deleteScore(score: TestScore): Promise<boolean> {
    const m = `Supprimer la ligne ${score.name} du barème?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._scoreHttpClient.delete(score.id);
        score.test.testScores.remove(score);
        if (score.test.testScores.length === 0) {
          score.test.multipleScore = false;
        }
        resolve(true);
      });
    });
  }

}
