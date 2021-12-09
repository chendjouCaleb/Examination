import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {Semester, SemesterTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterTeacherAdd.html'
})
export class SemesterTeacherAdd {
  semester: Semester;

  constructor(private _httpClient: SemesterTeacherHttpClient,
              private _dialogRef: MsDialogRef<SemesterTeacherAdd>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semester = data.semester;
  }

  async addAll() {
    const items = await this._httpClient.addAll(this.semester);

    this._alertEmitter.info(`Les enseignants ont été ajoutés au semestre`);
    this._dialogRef.close(items);
  }

}

