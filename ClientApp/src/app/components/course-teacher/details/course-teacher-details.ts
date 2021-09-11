import {Component, Input} from '@angular/core';
import {CourseTeacher} from 'examination/entities';
import {AlertEmitter} from 'examination/controls';
import {CourseTeacherHttpClient} from 'examination/models/http';
import {MsCheckboxChange} from '@ms-fluent/components';

@Component({
  templateUrl: 'course-teacher-details.html',
  selector: 'app-course-teacher-details'
})
export class CourseTeacherDetails {
  @Input()
  courseTeacher: CourseTeacher;

  constructor(private _alertEmitter: AlertEmitter,
              private _httpClient: CourseTeacherHttpClient) {
  }


  principalChange(event: MsCheckboxChange) {
    this._httpClient.isPrincipal(this.courseTeacher).then(() => {
      if (event.checked) {
        this.courseTeacher.course.courseTeachers?.forEach(item => item.isPrincipal = false);
        this._alertEmitter.info(`Cet enseignant est maintenant l'enseignant principal de ce cours`);
      } else {
        this._alertEmitter.info(`Cet enseignant n'est plus l'enseignant principal de ce cours`);
      }
      this.courseTeacher.isPrincipal = event.checked;
    });
  }


  tutorialChange(event: MsCheckboxChange) {
    this._httpClient.isTutorial(this.courseTeacher).then(() => {
      this.courseTeacher.tutorial = event.checked;
      this._alertEmitter.info(`Opération effectuée`);
    });
  }

  lectureChange(event: MsCheckboxChange) {
    this._httpClient.isLecture(this.courseTeacher).then(() => {
      this.courseTeacher.lecture = event.checked;
      this._alertEmitter.info(`Opération effectuée`);
    });
  }
}
