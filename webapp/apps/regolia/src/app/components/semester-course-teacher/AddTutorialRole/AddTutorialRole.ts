import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseTeacher, SemesterCourseTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'AddTutorialRole.html'
})
export class AddTutorialRole {
  semesterCourseTeacher: SemesterCourseTeacher;

  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _dialogRef: MsDialogRef<AddTutorialRole>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourseTeacher = data.semesterCourseTeacher;
  }

  async add() {
    await this._httpClient.isTutorial(this.semesterCourseTeacher);
    this.semesterCourseTeacher.tutorial = true;

    this._alertEmitter.info(`Le role de travaux dirigés a été assigné à cet enseignant pour le 
     cours ${this.semesterCourseTeacher.courseName}
     pour le compte de ce semestre`);
    this._dialogRef.close(true);
  }

}

