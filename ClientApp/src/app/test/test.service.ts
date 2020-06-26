import {Injectable} from "@angular/core";
import {AlertEmitter, Confirmation} from "examination/controls";
import {Examination, Speciality, Test, TestHttpClient} from "examination/models";
import {MsfModal} from "fabric-docs";
import {TestAddComponent} from "examination/app/test/add/test-add.component";
import {Observable, ReplaySubject} from "rxjs";

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
    if(speciality) {
      modalRef.componentInstance.speciality = speciality;
    }

    return modalRef.afterClosed();
  }

  delete(test: Test) {
    const confirm = this._confirmation.open("Supprimer cette épreuve?");
    confirm.accept.subscribe(async () => {
      await this._httpClient.delete(test.id);
      this._onremove.next(test);
      this._alertEmitter.error(`L'épreuve ${test.name}(${test.code}) a été supprimé`)
    })
  }


}
