import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseTeacher, SemesterCourseTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'AddLectureRole.html'
})
export class AddLectureRole {
  semesterCourseTeacher: SemesterCourseTeacher;

  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _dialogRef: MsDialogRef<AddLectureRole>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourseTeacher = data.semesterCourseTeacher;
  }

  async add() {
    await this._httpClient.isLecture(this.semesterCourseTeacher);
    this.semesterCourseTeacher.lecture = true;

    this._alertEmitter.info(`Le role de cours magistrale a été assigné à 
     l'enseignant ${this.semesterCourseTeacher.semesterTeacher?.yearTeacher?.teacher?.user?.fullName} pour le 
     cours ${this.semesterCourseTeacher.courseName}
     pour le compte de ce semestre`);
    this._dialogRef.close(true);
  }

}

