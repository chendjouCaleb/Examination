import {Injectable} from "@angular/core";
import {Examination, ExaminationHttpClient, ExaminationStudent, School} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";
import {MsfModal} from "fabric-docs";
import {ExaminationAdd} from "./add/examination-add";
import {ExaminationDelete} from "./delete/examination-delete";
import {ExaminationDetails} from "./details/examination-details";
import {ExaminationStudentDetails} from "examination/app/components/examination/students-details/examination-student-details";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private _modal: MsfModal,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _httpClient: ExaminationHttpClient) { }

  add(school: School): Promise<Examination> {
    const modalRef = this._modal.open<ExaminationAdd, Examination>(ExaminationAdd, {disableClose: true});
    modalRef.componentInstance.school = school;
    return modalRef.afterClosed().toPromise();
  }

  details(examination: Examination) {
    const modalRef = this._modal.open(ExaminationDetails, {autoFocus: false});
    modalRef.componentInstance.examination = examination;
  }

  delete(examination: Examination): Promise<boolean> {
    const modalRef = this._modal.open(ExaminationDelete, {disableClose: true});
    modalRef.componentInstance.examination = examination;
    return modalRef.afterClosed().toPromise();
  }


  async reload(examination: Examination): Promise<void> {
    await this._httpClient.refreshStatistics(examination);
    await this._httpClient.refresh(examination);
  }

  relaunch(examination: Examination): Promise<void> {
    const confirmation = this._confirmation.open('Voulez-vous relancer cet examen?');

    return new Promise<void>(resolve => {
      confirmation.accept.subscribe(async () => {
        await this._httpClient.relaunch(examination);
        examination.endDate = null;
        examination.school.statistics.progressExaminationCount++;
        examination.school.statistics.closedExaminationCount--;
        this._alertEmitter.info('L\'examen a été relancé.');
      });
      resolve();
    })
  }

  start(examination: Examination): Promise<void> {
    const confirmation = this._confirmation.open('Voulez-vous commencer cet examen?');

    return new Promise<void>(resolve => {
      confirmation.accept.subscribe(async () => {
        await this._httpClient.start(examination);
        examination.startDate = new Date();
        examination.school.statistics.waitingExaminationCount--;
        examination.school.statistics.progressExaminationCount++;
        this._alertEmitter.info('L\'examen a débuté.');
      });
      resolve();
    });
  }

  end(examination: Examination): Promise<void> {
    const confirmation = this._confirmation.open('Voulez-vous fermer cet examen?');

    return new Promise<void>(resolve => {
      confirmation.accept.subscribe(async () => {
        await this._httpClient.close(examination);
        examination.endDate = new Date();
        examination.school.statistics.progressExaminationCount--;
        examination.school.statistics.closedExaminationCount++;
        this._alertEmitter.info('L\'examen a été fermé.');

        resolve();
      });
    });
  }

  studentsDetails(examinationStudent: ExaminationStudent) {
    const modalRef = this._modal.open(ExaminationStudentDetails, {autoFocus: false});
    modalRef.componentInstance.examinationStudent = examinationStudent;
  }

}
