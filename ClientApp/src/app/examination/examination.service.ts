import {Injectable} from "@angular/core";
import {Examination, ExaminationHttpClient} from "examination/models";
import {AlertEmitter, Confirmation} from "examination/controls";

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation,
              private _httpClient: ExaminationHttpClient) {}

  async reload(examination: Examination) {
    await this._httpClient.refreshStatistics(examination);
    await this._httpClient.refresh(examination);
  }

  relaunch(examination: Examination) {
    const confirmation = this._confirmation.open('Voulez-vous relancer cet examen?');

    confirmation.accept.subscribe(async () => {
      await this._httpClient.relaunch(examination);
      examination.endDate = null;
      examination.state = 'PROGRESS';
      examination.organisation.statistics.progressExaminationCount++;
      examination.organisation.statistics.closedExaminationCount--;
      this._alertEmitter.info('L\'examen a été relancé.');
    });
  }

  start(examination: Examination) {
    const confirmation = this._confirmation.open('Voulez-vous commencer cet examen?');
    confirmation.accept.subscribe(async () => {
      await this._httpClient.start(examination);
       examination.startDate = new Date();
       examination.organisation.statistics.waitingExaminationCount--;
       examination.organisation.statistics.progressExaminationCount++;
      this._alertEmitter.info('L\'examen a débuté.');
    });
  }

  end(examination: Examination) {
    const confirmation = this._confirmation.open('Voulez-vous fermer cet examen?');

    confirmation.accept.subscribe(async () => {
      await this._httpClient.close(examination);
       examination.endDate = new Date();
       examination.state = 'FINISHED';
       examination.organisation.statistics.progressExaminationCount--;
       examination.organisation.statistics.closedExaminationCount++;
      this._alertEmitter.info('L\'examen a été fermé.');
    });
  }
}
