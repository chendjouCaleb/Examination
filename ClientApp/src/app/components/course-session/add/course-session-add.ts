import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseSessionHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {CourseSessionLoader, CourseLoader, CourseTeacherLoader, RoomLoader} from 'examination/loaders';
import {Course, CourseTeacher, Department, Level, Room, School} from 'examination/entities';
import {CourseSessionAddForm, CourseSessionAddFormModel} from '../course-session.form';
import {DateTimeFormatter, DayOfWeek, LocalDateTime, TextStyle} from '@js-joda/core';
import {Locale} from '@js-joda/locale_fr'

@Component({
  templateUrl: 'course-session-add.html',
  selector: 'app-course-session-add'
})
export class CourseSessionAdd implements OnInit {

  @Input()
  level: Level;

  @Input()
  course: Course;

  form: CourseSessionAddForm;

  courses: Course[];
  rooms: Room[];
  courseTeachers: CourseTeacher[] = [];

  days: DayOfWeek[] = DayOfWeek.values();

  constructor(private _httpClient: CourseSessionHttpClient,
              private _courseTeacherLoader: CourseTeacherLoader,
              private _roomLoader: RoomLoader,
              private _courseLoader: CourseLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseSessionLoader,
              @Optional() private _modal: MsfModalRef<CourseSessionAdd>) {
  }

  async ngOnInit() {
    const formValue = new CourseSessionAddFormModel();
    formValue.type = 'lecture';

    if (this.level) {
      await this._courseLoader.loadByLevel(this.level);
      this.courses = this.level.courses.toArray();
    }
    if (this.course) {
      await this.loadCourseTeachers(this.course);
      formValue.course = this.course;
    }


    await this._roomLoader.loadBySchool(this.school);
    this.rooms = this.school.rooms.toArray();

    this.form = new CourseSessionAddForm(formValue);
  }

  async loadCourseTeachers(course: Course) {
    await this._courseTeacherLoader.loadByCourse(course);
    this.courseTeachers = course.courseTeachers.toArray();
  }


  async add() {
    const model = this.form.getModel();
    const courseSession = await this._httpClient.addCourseSession(
      model.course, model.room, model.courseTeacher, model.courseHour, model.body);

    this.level?.courseSessions?.add(courseSession);
    model.course.courseSessions?.add(courseSession);
    model.courseTeacher.courseSessions?.add(courseSession);
    model.room.courseSessions?.add(courseSession);


    this._alertEmitter.info(`Séance de cours programmé!`);
    await this._loader.load(courseSession);
    if (this._modal) {
      this._modal.close(courseSession);
    }
  }


  get department(): Department {
    return this.level.department;
  }

  get school(): School {
    if (this.level) {
      return this.level.department.school;
    }
    return this.course.level.department.school;
  }
}
