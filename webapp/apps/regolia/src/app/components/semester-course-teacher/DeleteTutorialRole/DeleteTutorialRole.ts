import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseTeacher, SemesterCourseTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'DeleteTutorialRole.html'
})
export class DeleteTutorialRole {
  semesterCourseTeacher: SemesterCourseTeacher;

  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _dialogRef: MsDialogRef<DeleteTutorialRole>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourseTeacher = data.semesterCourseTeacher;
  }

  async delete() {
    await this._httpClient.isTutorial(this.semesterCourseTeacher);
    this.semesterCourseTeacher.tutorial = false;

    this._alertEmitter.info(`L'enseignant n'a plus le role de travaux dirigés du cours pour le compte de ce semestre`);
    this._dialogRef.close(true);
  }

}

