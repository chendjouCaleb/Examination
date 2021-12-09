import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterTeacher, SemesterTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterTeacherDelete.html'
})
export class SemesterTeacherDelete {
  semesterTeacher: SemesterTeacher;

  constructor(private _httpClient: SemesterTeacherHttpClient,
              private _dialogRef: MsDialogRef<SemesterTeacherDelete>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterTeacher = data.semesterTeacher;
  }

  async delete() {
    await this._httpClient.delete(this.semesterTeacher.id);

    this._alertEmitter.info(`L'enseignant a été supprimé du semestre`);
    this._dialogRef.close(true);
  }

}

