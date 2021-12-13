import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseTeacher, SemesterCourseTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'DeleteLectureRole.html'
})
export class DeleteLectureRole {
  semesterCourseTeacher: SemesterCourseTeacher;

  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _dialogRef: MsDialogRef<DeleteLectureRole>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourseTeacher = data.semesterCourseTeacher;
  }

  async delete() {
    await this._httpClient.isLecture(this.semesterCourseTeacher);
    this.semesterCourseTeacher.lecture = false;

    this._alertEmitter.info(`L'enseignant n'a plus la charge du cours magistral du cours pour le compte de ce semestre`);
    this._dialogRef.close(true);
  }

}

