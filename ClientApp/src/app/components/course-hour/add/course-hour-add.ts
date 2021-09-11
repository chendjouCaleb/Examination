import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHourHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {CourseHourLoader, CourseLoader, CourseTeacherLoader, RoomLoader} from 'examination/loaders';
import {Course, CourseTeacher, Department, Level, Room, School} from 'examination/entities';
import {CourseHourAddForm} from '../course-hour.form';
import {DayOfWeek, TextStyle} from '@js-joda/core';
import {Locale} from '@js-joda/locale_fr'
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'course-hour-add.html',
  selector: 'app-course-hour-add'
})
export class CourseHourAdd implements OnInit {

  @Input()
  level: Level;

  form: CourseHourAddForm;

  courses: Course[];
  rooms: Room[];
  courseTeachers: CourseTeacher[] = [];

  days: DayOfWeek[] = DayOfWeek.values();

  textStyle = TextStyle.FULL_STANDALONE;
  local = Locale.FRANCE;

  constructor(private _httpClient: CourseHourHttpClient,
              private _courseTeacherLoader: CourseTeacherLoader,
              private _roomLoader: RoomLoader,
              private _courseLoader: CourseLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseHourLoader,
              @Optional() private _modal: MsDialogRef<CourseHourAdd>) {
  }

  async ngOnInit() {
    if (!this.level) {
      throw new Error('Level input cannot be null');
    }
    await this._courseLoader.loadByLevel(this.level);
    this.courses = this.level.courses.toArray();

    await this._roomLoader.loadBySchool(this.school);
    this.rooms = this.school.rooms.toArray();

    this.form = new CourseHourAddForm({
      type: 'lecture'
    });
  }

  async loadCourseTeachers(course: Course) {
    await this._courseTeacherLoader.loadByCourse(course);
    this.courseTeachers = course.courseTeachers.toArray();
  }


  async add() {
    const model = this.form.getModel();
    const courseHour = await this._httpClient.addCourseHour(model.course, model.room, model.courseTeacher, model.body);

    this.level.courseHours?.add(courseHour);
    model.course.courseHours?.add(courseHour);
    model.courseTeacher.courseHours?.add(courseHour);
    model.room.courseHours?.add(courseHour);


    this._alertEmitter.info(`Horaire ajouté!`);
    await this._loader.load(courseHour);
    if (this._modal) {
      this._modal.close(courseHour);
    }
  }


  get department(): Department {
    return this.level.department;
  }

  get school(): School {
    return this.level.department.school;
  }
}
