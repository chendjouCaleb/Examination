import {Component, Inject} from '@angular/core';
import {AlertEmitter} from 'examination/controls';
import {SemesterCourseTeacher, SemesterCourseTeacherHttpClient} from 'examination/models';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';


@Component({
  templateUrl: 'SemesterCourseTeacherPrincipal.html'
})
export class SemesterCourseTeacherPrincipal {
  semesterCourseTeacher: SemesterCourseTeacher;
  semesterCourseTeachers: SemesterCourseTeacher[];


  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _dialogRef: MsDialogRef<SemesterCourseTeacherPrincipal>,
              @Inject(MS_DIALOG_DATA) data,
              private _alertEmitter: AlertEmitter) {
    this.semesterCourseTeacher = data.semesterCourseTeacher;
    this.semesterCourseTeachers = data.semesterCourseTeachers;
  }

  async add() {
    await this._httpClient.isPrincipal(this.semesterCourseTeacher);
    this.semesterCourseTeachers.forEach(item => item.isPrincipal = false);
    this.semesterCourseTeacher.isPrincipal = true;

    this._alertEmitter.info(`L'enseignant 
      <b> ${this.semesterCourseTeacher.semesterTeacher?.yearTeacher?.teacher?.user?.fullName}</b> est le principal du
     cours ${this.semesterCourseTeacher.courseName}
     pour le compte de ce semestre`);
    this._dialogRef.close(true);
  }

}

