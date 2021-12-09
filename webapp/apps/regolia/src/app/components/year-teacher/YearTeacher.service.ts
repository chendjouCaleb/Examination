import {Injectable} from "@angular/core";
import {Year, YearTeacher} from "@examination/entities";
import {YearTeacherHttpClient} from "@examination/http";
import {AlertEmitter, Confirmation} from "src/controls";
import {MsDialog} from "@ms-fluent/components";
import {YearTeacherDelete} from "./Delete/YearTeacherDelete";

@Injectable()
export class YearTeacherService {
  constructor(private _httpClient: YearTeacherHttpClient,
              private _alertEmitter: AlertEmitter,
              private _dialog: MsDialog,
              private _confirmation: Confirmation) {}

  addAllForYear(year: Year): Promise<YearTeacher[]> {
      const message = `Ajouter tous les enseignats de l'établissement à cette année scolaire ?`;

    return new Promise<YearTeacher[]>(subscriber => {
      const confirm = this._confirmation.open(message, 'Ajouter des enseignants');
      confirm.accept.subscribe(async () => {
        const items = await this._httpClient.addAll(year);
        this._alertEmitter.info(`${items.length} enseignants ont été ajoutés`);
        subscriber(items);
      });
    });
  }


  deleteTeacher(yearTeacher: YearTeacher): Promise<boolean> {
    const modalRef = this._dialog.open(YearTeacherDelete, {autoFocus: false, data: {yearTeacher}});
    return modalRef.afterClosed().toPromise();
  }
}
