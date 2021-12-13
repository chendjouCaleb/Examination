import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourse, SemesterCourseHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterCourseDelete.html'
})
export class SemesterCourseDelete {
  semesterCourse: SemesterCourse;

  constructor(private _httpClient: SemesterCourseHttpClient,
              private _dialogRef: MsDialogRef<SemesterCourseDelete>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourse = data.semesterCourse;
  }

  async delete() {
    await this._httpClient.delete(this.semesterCourse.id);

    this._alertEmitter.info(`Les cours ont été supprimé du semestre`);
    this._dialogRef.close(true);
  }

}

