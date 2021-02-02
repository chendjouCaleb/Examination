import {IPaperService} from "./paper.service.interface";
import {Paper, Test} from "examination/entities";
import {Injectable} from "@angular/core";
import {AlertEmitter, Confirmation} from "examination/controls";
import {PaperHttpClient} from "examination/models/http";
import {MsfModal} from "fabric-docs";
import {AuthorizationManager} from "examination/app/authorization";
import {Observable} from "rxjs";
import {PaperEditDate} from "./date/paper-edit-date";
import {PaperSupervisorComment} from "./supervisor-comment/paper-supervisor-comment";
import {PaperReport} from "./report/paper-report";
import {PaperScores} from "./scores/paper-scores";
import {PaperDetails} from "./details/paper-details";
import {PaperLoader} from "examination/loaders";
import {PaperScore} from "examination/app/components/paper/score/paper-score";


@Injectable()
export class PaperService implements IPaperService {
  constructor(private _confirmation: Confirmation,
              private _httpClient: PaperHttpClient,
              private _loader: PaperLoader,
              private _modal: MsfModal,
              private _auth: AuthorizationManager,
              private _alertEmitter: AlertEmitter) {
  }

  group(test: Test): Promise<number> {
    const m = `Grouper les étudiants de cette épreuve?`;
    const result = this._confirmation.open(m);

    return new Promise<number>(resolve => {
      result.accept.subscribe(async () => {
        const result = await this._httpClient.group(test);
        this._alertEmitter.success( `${result} étudiants de cette épreuve ont été classés en groupe`);
        test.notGroupedStudentCount = test.paperCount - result;
        resolve( result);
      });
    });
  }

  async addPapers(test: Test): Promise<void> {
    await this._httpClient.addPapers(test);
    this._alertEmitter.info(`Les étudiants ont été ajoutés à cette épreuve!`)
  }

  details(paper: Paper) {
    const modalRef = this._modal.open(PaperDetails, {autoFocus: false});
    modalRef.componentInstance.paper = paper;
  }

  editDates(paper: Paper): Observable<Paper> {
    const modalRef = this._modal.open(PaperEditDate, {disableClose: true});
    modalRef.componentInstance.paper = paper;
    return modalRef.afterClosed();
  }

  supervisorComment(paper: Paper): Observable<Paper> {
    const modalRef = this._modal.open(PaperSupervisorComment, {disableClose: true});
    modalRef.componentInstance.paper = paper;
    return modalRef.afterClosed();
  }

  report(paper: Paper): Observable<Paper> {
    const modalRef = this._modal.open(PaperReport, {disableClose: true});
    modalRef.componentInstance.paper = paper;
    return modalRef.afterClosed();
  }

  scores(paper: Paper): Observable<Paper> {
    if(paper.test.multipleScore) {
      const modalRef = this._modal.open(PaperScores, {disableClose: true});
      modalRef.componentInstance.paper = paper;
      return modalRef.afterClosed();
    }

    const modalRef = this._modal.open(PaperScore, {disableClose: true});
    modalRef.componentInstance.paper = paper;
    return modalRef.afterClosed();

  }

  collect(paper: Paper): Promise<void> {
    let message = `Récupérer la copie de cet étudiant?`;


    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.collect(paper);
        paper.collectorUser = this._auth.user;
        paper.collectorUserId = this._auth.user.id;
        paper.endDate = new Date();
        this._alertEmitter.info(`Copié marquée comme réçue!`);
        resolve();
      });
    });
  }

  changePresentState(paper: Paper): Promise<void> {
    let message = `Marquer l'étudiant ${paper.examinationStudent.student.fullName} comme présent?`;
    if (paper.isPresent) {
      message = `Marquer l'étudiant ${paper.examinationStudent.student.fullName} comme absent?`;
    }


    return new Promise<void>(resolve => {
      const confirm = this._confirmation.open(message);
      confirm.accept.subscribe(async () => {
        await this._httpClient.presentState(paper);
        paper.supervisorUser = this._auth.user;
        paper.supervisorUserId = this._auth.user.id;
        paper.startDate = paper.isPresent ? null : new Date();
        this._alertEmitter.info(`Modification de statut effectuée`);
        resolve();
      });
    });
  }
}
