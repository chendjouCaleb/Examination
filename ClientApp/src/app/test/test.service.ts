import {Injectable} from "@angular/core";
import {AlertEmitter, Confirmation} from "examination/controls";
import {Examination, Score, Speciality, Test, TestHttpClient} from "examination/models";
import {MsfModal} from "fabric-docs";
import {TestAddComponent} from "examination/app/test/add/test-add.component";
import {Observable, of, ReplaySubject} from "rxjs";
import {TestEditDateComponent} from "examination/app/test/date/test-edit-date.component";
import {TestEditComponent} from "examination/app/test/edit/test-edit.component";
import {ScoreAddComponent} from "examination/app/test/score-add/score-add.component";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  get onremove(): Observable<Test> {
    return this._onremove.asObservable();
  };

  private _onremove = new ReplaySubject<Test>();

  get onnew(): Observable<Test> {
    return this._onnew.asObservable();
  };

  private _onnew = new ReplaySubject<Test>();

  constructor(private _alert: AlertEmitter,
              private _confirmation: Confirmation,
              private _alertEmitter: AlertEmitter,
              private _modal: MsfModal,
              private _httpClient: TestHttpClient) {
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
    return new Promise<Test> (subscriber => {
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


}
