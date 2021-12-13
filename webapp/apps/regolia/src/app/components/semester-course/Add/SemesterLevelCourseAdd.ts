import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseHttpClient, SemesterLevel} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterLevelCourseAdd.html'
})
export class SemesterLevelCourseAdd {
  semesterLevel: SemesterLevel;

  constructor(private _httpClient: SemesterCourseHttpClient,
              private _dialogRef: MsDialogRef<SemesterLevelCourseAdd>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterLevel = data.semesterLevel;
  }

  async addAll() {
    const items = await this._httpClient.addAddSemesterLevel(this.semesterLevel);

    this._alertEmitter.info(`Les cours de la niveau ont été ajoutés au semestre`);
    this._dialogRef.close(items);
  }

}

