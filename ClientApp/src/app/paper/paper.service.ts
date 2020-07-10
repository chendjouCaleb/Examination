import {IPaperService} from "./paper.service.interface";
import {Paper, Test} from "examination/entities";
import {Injectable} from "@angular/core";
import {AlertEmitter, Confirmation} from "examination/controls";
import {PaperHttpClient} from "examination/models/http";

@Injectable()
export class PaperService implements IPaperService {
  constructor(private _confirmation: Confirmation,
              private _httpClient: PaperHttpClient,
              private _alertEmitter: AlertEmitter) {}

  changePresentState(paper: Paper): Promise<void> {
    let message = `Marquer l'étudiant ${paper.student.fullName} comme présent?`;
    if(paper.isPresent) {
      message = `Marquer l'étudiant ${paper.student.fullName} comme absent?`;
    }


    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.presentState(paper);
        paper.startDate = paper.isPresent ? null: new Date();
        this._alertEmitter.info(`Modification de statut effectuée`);
        resolve();
      });
    });
  }
}
