import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHourHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseHourLoader, CourseTeacherLoader} from 'examination/loaders';
import {CourseHour, CourseTeacher} from 'examination/entities';

@Component({
  templateUrl: 'course-hour-teacher.html',
  selector: 'app-course-hour-teacher'
})
export class CourseHourTeacher implements OnInit {
  @Input()
  courseHour: CourseHour;

  courseTeachers: CourseTeacher[];
  courseTeacher: CourseTeacher;

  constructor(private _httpClient: CourseHourHttpClient,
              private _courseTeacherLoader: CourseTeacherLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseHourLoader,
              @Optional() private _modal: MsDialogRef<CourseHourTeacher>) {
  }

  async ngOnInit() {
    await this._courseTeacherLoader.loadByCourse(this.courseHour.course);
    this.courseTeachers = this.courseHour.course.courseTeachers.toArray();
    this.courseTeacher = this.courseTeachers.find(r => r.id === this.courseHour.courseTeacherId);
  }


  async change() {
    const oldTeacher = this.courseHour.courseTeacher;

    await this._httpClient.changeTeacher(this.courseHour, this.courseTeacher);
    this.courseHour.courseTeacher = this.courseTeacher;
    oldTeacher.courseHours?.removeIf(c => c.id === oldTeacher.id);
    this.courseTeacher.courseHours?.add(this.courseHour);


    this._alertEmitter.info(`L'enseignant a été changé!`);
    if (this._modal) {
      this._modal.close(this.courseHour.courseTeacher);
    }
  }
}
