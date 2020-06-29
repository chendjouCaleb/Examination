import {Injectable} from "@angular/core";
import {AlertEmitter, Confirmation} from "examination/controls";
import {
  Examination,
  Score,
  ScoreHttpClient,
  Speciality,
  Test,
  TestGroup,
  TestGroupCorrector, TestGroupSecretary, TestGroupSupervisor,
  TestHttpClient
} from "examination/models";
import {MsfModal} from "fabric-docs";
import {TestAddComponent} from "examination/app/test/add/test-add.component";
import {Observable, ReplaySubject} from "rxjs";
import {TestEditDateComponent} from "examination/app/test/date/test-edit-date.component";
import {TestEditComponent} from "examination/app/test/edit/test-edit.component";
import {ScoreAddComponent} from "examination/app/test/score-add/score-add.component";
import {TestGroupItemComponent} from "examination/app/test/test-group-item/test-group-item.component";
import {ITestService} from "examination/app/test/test.service.interface";
import {List} from "@positon/collections";
import {TestGroupCorrectorAddComponent} from "examination/app/test/add-test-group-corrector/test-group-corrector-add.component";

@Injectable({
  providedIn: 'root'
})
export class TestService implements ITestService {

  get onremove(): Observable<Test> {
    return this._onremove.asObservable();
  };

  _onremove = new ReplaySubject<Test>();

  get onnew(): Observable<Test> {
    return this._onnew.asObservable();
  };

  _onnew = new ReplaySubject<Test>();

  constructor(public _alert: AlertEmitter,
              public _confirmation: Confirmation,
              public _alertEmitter: AlertEmitter,
              public _modal: MsfModal,
              public _httpClient: TestHttpClient,
              public _scoreHttpClient: ScoreHttpClient) {
  }

  add(examination: Examination, speciality?: Speciality): Observable<Test> {
    const modalRef = this._modal.open(TestAddComponent, {disableClose: true});
    modalRef.componentInstance.examination = examination;
    if (speciality) {
      modalRef.componentInstance.speciality = speciality;
    }

    return modalRef.afterClosed();
  }


  edit(test: Test): Observable<Test> {
    const modalRef = this._modal.open(TestEditComponent, {disableClose: true});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed();
  }

  editDate(test: Test): Observable<Test> {
    const modalRef = this._modal.open(TestEditDateComponent, {disableClose: true});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed();
  }

  setAnonymous(test: Test): Promise<Test> {
    return new Promise<Test>(subscriber => {
      const confirm = this._confirmation.open("Rendre cet épreuve anonyme?");
      confirm.accept.subscribe(async () => {
        await this._httpClient.anonymous(test);
        test.useAnonymity = true;
        this._alertEmitter.info(`L'épreuve ${test.name}(${test.code}) utilise des anonymats`);
        subscriber(test);
      })
    })
  }

  unsetAnonymous(test: Test): Promise<Test> {
    return new Promise<Test>(subscriber => {
      const confirm = this._confirmation.open("Enlever l'anonymat sur cet épreuve?");
      confirm.accept.subscribe(async () => {
        await this._httpClient.anonymous(test);
        test.useAnonymity = false;
        this._alertEmitter.info(`L'épreuve ${test.name}(${test.code}) n'utilise plus des anonymats`);
        subscriber(test);
      })
    })
  }

  delete(test: Test) {
    const confirm = this._confirmation.open("Supprimer cette épreuve?");
    confirm.accept.subscribe(async () => {
      await this._httpClient.delete(test.id);
      this._onremove.next(test);
      this._alertEmitter.error(`L'épreuve ${test.name}(${test.code}) a été supprimé`)
    })
  }

  addScore(test: Test): Observable<Score> {
    const modalRef = this._modal.open(ScoreAddComponent, {disableClose: true});
    modalRef.componentInstance.test = test;
    return modalRef.afterClosed();
  }


  deleteScore(score: Score) {
    const confirm = this._confirmation.open(`Enlever la ligne ${score.name} du barème`);
    confirm.accept.subscribe(async () => {
      await this._scoreHttpClient.delete(score.id);
      score.test.scores.removeIf(s => s.id === score.id);
      this._alertEmitter.error(`La ligne ${score.name} a été supprimée`);
    });
  }


  testGroupDetails(testGroup: TestGroup) {
    const modalRef = this._modal.open(TestGroupItemComponent,
      {
        panelClass: 'msf-modal-portal',
        autoFocus: false
      });
    modalRef.componentInstance.testGroup = testGroup;
  }

  addTestGroupCorrectors(testGroup: TestGroup): Observable<List<TestGroupCorrector>> {
    const modalRef = this._modal.open(TestGroupCorrectorAddComponent, {disableClose: true});
    modalRef.componentInstance.testGroup = testGroup;

    return modalRef.afterClosed()
  }

  addTestGroupSecretaries(testGroup: TestGroup): Observable<List<TestGroupSecretary>> {
    return undefined;
  }

  addTestGroupSupervisors(testGroup: TestGroup): Observable<List<TestGroupSupervisor>> {
    return undefined;
  }

}
