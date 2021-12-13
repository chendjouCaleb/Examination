import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {Semester, SemesterCourseHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterCourseAdd.html'
})
export class SemesterCourseAdd {
  semester: Semester;

  constructor(private _httpClient: SemesterCourseHttpClient,
              private _dialogRef: MsDialogRef<SemesterCourseAdd>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semester = data.semester;
  }

  async addAll() {
    const items = await this._httpClient.addAddSemester(this.semester);

    this._alertEmitter.info(`Les cours ont été ajoutés au semestre`);
    this._dialogRef.close(items);
  }

}

