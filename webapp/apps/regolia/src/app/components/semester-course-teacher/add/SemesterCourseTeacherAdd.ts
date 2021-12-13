import {Component, Inject, OnInit, Optional} from '@angular/core';
import {SemesterCourseTeacherHttpClient, SemesterTeacherHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MS_DIALOG_DATA, MsDialogRef} from '@ms-fluent/components';
import {SemesterCourseTeacherLoader, SemesterTeacherLoader} from 'examination/loaders';
import {SemesterCourse, SemesterCourseTeacher, SemesterDepartment, SemesterTeacher} from 'examination/entities';
import {SemesterCourseTeacherAddForm} from "../semester-course-teacher.form";

@Component({
  templateUrl: 'SemesterCourseTeacherAdd.html',
  selector: 'SemesterCourseTeacher'
})
export class SemesterCourseTeacherAdd implements OnInit {
  semesterCourse: SemesterCourse;
  semesterDepartment: SemesterDepartment;

  semesterCourseTeachers: SemesterCourseTeacher[];

  form: SemesterCourseTeacherAddForm;

  teachers: Array<SemesterTeacher>;

  constructor(private _httpClient: SemesterCourseTeacherHttpClient,
              private _teacherLoader: SemesterTeacherLoader,
              private _teacherHttpClient: SemesterTeacherHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: SemesterCourseTeacherLoader,
              @Inject(MS_DIALOG_DATA) data,
              @Optional() private _modal: MsDialogRef<SemesterCourseTeacherAdd>) {
    this.semesterCourse = data.semesterCourse;
    this.semesterDepartment = this.semesterCourse.semesterLevel.semesterDepartment;
    this.semesterCourseTeachers = data.semesterCourseTeachers;
  }

  async ngOnInit() {
    if (!this.semesterCourse) {
      throw new Error('Course input cannot be null');
    }
    const teachers = await this._teacherHttpClient.listBySemesterDepartment(this.semesterDepartment);
    await this._teacherLoader.loadAll(teachers);

    this.teachers = teachers.toArray()
      .filter(t => !this.semesterCourseTeachers.find(c => c.semesterTeacherId === t.id));


    this.form = new SemesterCourseTeacherAddForm({
      isPrincipal: this.semesterCourseTeachers?.length === 0
    });
  }


  async add() {
    const model = this.form.getModel();
    const courseTeacher = await this._httpClient.addSemesterCourseTeacher(this.semesterCourse, model.semesterTeacher, model.body);

    if (courseTeacher.isPrincipal) {
      this.semesterCourseTeachers.forEach(c => c.isPrincipal = false);
    }

    await this._loader.load(courseTeacher);
    this._alertEmitter.info(`Enseignant ${model.semesterTeacher?.yearTeacher?.teacher.user.fullName} ajouté!`);

    if (this._modal) {
      this._modal.close(courseTeacher);
    }
  }
}
