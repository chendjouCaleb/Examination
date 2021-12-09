import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {YearTeacher, YearTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'YearTeacherDelete.html'
})
export class YearTeacherDelete {
  yearTeacher: YearTeacher;

  constructor(private _httpClient: YearTeacherHttpClient,
              private _dialogRef: MsDialogRef<YearTeacherDelete>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.yearTeacher = data.yearTeacher;
  }

  async delete() {
    await this._httpClient.delete(this.yearTeacher.id);

    this._alertEmitter.info(`L'enseignant a été supprimé de l'année scolaire`);
    this._dialogRef.close(true);
  }

}

