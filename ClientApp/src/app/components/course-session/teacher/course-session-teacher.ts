import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {CourseTeacherLoader} from 'examination/loaders';
import {CourseSession, CourseTeacher} from 'examination/entities';

@Component({
  templateUrl: 'course-session-teacher.html',
  selector: 'app-course-session-teacher'
})
export class CourseSessionTeacher implements OnInit {
  @Input()
  courseSession: CourseSession;

  courseTeachers: CourseTeacher[];
  courseTeacher: CourseTeacher;

  constructor(private _httpClient: CourseSessionHttpClient,
              private _courseTeacherLoader: CourseTeacherLoader,
              private _alertEmitter: AlertEmitter,
              @Optional() private _modal: MsfModalRef<CourseSessionTeacher>) {
  }

  async ngOnInit() {
    await this._courseTeacherLoader.loadByCourse(this.courseSession.course);
    this.courseTeachers = this.courseSession.course.courseTeachers.toArray();
    this.courseTeacher = this.courseTeachers.find(r => r.id === this.courseSession.courseTeacherId);
  }


  async change() {
    const oldTeacher = this.courseSession.courseTeacher;

    await this._httpClient.changeTeacher(this.courseSession, this.courseTeacher);
    this.courseSession.courseTeacher = this.courseTeacher;
    oldTeacher.courseSessions?.removeIf(c => c.id === oldTeacher.id);
    this.courseTeacher.courseSessions?.add(this.courseSession);


    this._alertEmitter.info(`L'enseignant a été changé!`);
    if (this._modal) {
      this._modal.close(this.courseSession.courseTeacher);
    }
  }
}
