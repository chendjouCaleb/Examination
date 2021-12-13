import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseTeacher, SemesterCourseTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterCourseTeacherDelete.html'
})
export class SemesterCourseTeacherDelete {
  semesterCourseTeacher: SemesterCourseTeacher;

  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _dialogRef: MsDialogRef<SemesterCourseTeacherDelete>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourseTeacher = data.semesterCourseTeacher;
  }

  async delete() {
    await this._httpClient.delete(this.semesterCourseTeacher.id);

    this._alertEmitter.info(`L'enseignant a été supprimé du cours pour le compte de ce semestre`);
    this._dialogRef.close(true);
  }

}

