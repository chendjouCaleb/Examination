import {Injectable} from "@angular/core";
import {Observable, ReplaySubject} from "rxjs";
import {ITestAddParams} from "../test.service.interface";
import {TestAdd} from "./test-add";
import {MsDialog} from "@ms-fluent/components";
import {Test} from "examination/entities";

@Injectable({
  providedIn: 'root'
})
export class TestAddService {
  get onNew(): Observable<Test> {
    return this._onNew.asObservable();
  };

  _onNew = new ReplaySubject<Test>();

  constructor(private _modal: MsDialog) {}

  add(params: ITestAddParams): Observable<Test> {
    const modalRef = this._modal.open<TestAdd, Test>(TestAdd, {disableClose: true});
    modalRef.componentInstance.examination = params.examination;
    modalRef.componentInstance.examinationDepartment = params.examinationDepartment;
    modalRef.componentInstance.examinationLevel = params.examinationLevel;
    modalRef.componentInstance.course = params.course;
    return modalRef.afterClosed() as unknown as Observable<Test>;
  }
}
