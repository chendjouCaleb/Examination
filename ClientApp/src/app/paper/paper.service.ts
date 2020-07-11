import {IPaperService} from "./paper.service.interface";
import {Paper, Test} from "examination/entities";
import {Injectable} from "@angular/core";
import {AlertEmitter, Confirmation} from "examination/controls";
import {PaperHttpClient} from "examination/models/http";
import {MsfModal} from "fabric-docs";
import {PaperItemComponent} from "examination/app/paper/item/paper-item.component";
import {AuthorizationManager} from "examination/app/authorization";
import {Observable} from "rxjs";
import {PaperEditDateComponent} from "examination/app/paper/date/paper-edit-date.component";
import {PaperSupervisorCommentComponent} from "examination/app/paper/supervisor-comment/paper-supervisor-comment.component";

@Injectable()
export class PaperService implements IPaperService {
  constructor(private _confirmation: Confirmation,
              private _httpClient: PaperHttpClient,
              private _modal: MsfModal,
              private _auth: AuthorizationManager,
              private _alertEmitter: AlertEmitter) {}


  details(paper: Paper) {
    const modalRef = this._modal.open(PaperItemComponent);
    modalRef.componentInstance.paper = paper;
  }

  editDates(paper: Paper): Observable<Paper> {
    const modalRef = this._modal.open(PaperEditDateComponent, {disableClose: true});
    modalRef.componentInstance.paper = paper;
    return modalRef.afterClosed();
  }

  supervisorComment(paper: Paper): Observable<Paper> {
    const modalRef = this._modal.open(PaperSupervisorCommentComponent, {disableClose: true});
    modalRef.componentInstance.paper = paper;
    return modalRef.afterClosed();
  }

  changePresentState(paper: Paper): Promise<void> {
    let message = `Marquer l'étudiant ${paper.student.fullName} comme présent?`;
    if(paper.isPresent) {
      message = `Marquer l'étudiant ${paper.student.fullName} comme absent?`;
    }


    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.presentState(paper);
        paper.supervisorUser = this._auth.user;
        paper.supervisorUserId = this._auth.user.id;
        paper.startDate = paper.isPresent ? null: new Date();
        this._alertEmitter.info(`Modification de statut effectuée`);
        resolve();
      });
    });
  }
}
