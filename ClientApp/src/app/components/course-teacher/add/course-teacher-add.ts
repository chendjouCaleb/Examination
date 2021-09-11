import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseTeacherHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseTeacherLoader, TeacherLoader} from 'examination/loaders';
import {Course, Department, Teacher} from 'examination/entities';
import {CourseTeacherAddForm} from '../course-teacher.form';

@Component({
  templateUrl: 'course-teacher-add.html',
  selector: 'app-course-teacher-add'
})
export class CourseTeacherAdd implements OnInit {
  @Input()
  course: Course;

  form: CourseTeacherAddForm;

  teachers: Array<Teacher>;

  constructor(private _httpClient: CourseTeacherHttpClient,
              private _teacherLoader: TeacherLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseTeacherLoader,
              @Optional() private _modal: MsDialogRef<CourseTeacherAdd>) {
  }

  async ngOnInit() {
    if (!this.course) {
      throw new Error('Course input cannot be null');
    }
    await this._teacherLoader.loadByDepartment(this.course.level.department);
    const teachers = this.course.level.department.teachers.toArray();
    this.teachers = teachers.filter(t => !this.course.courseTeachers.find(c => c.teacherId === t.id));


    this.form = new CourseTeacherAddForm({
      isPrincipal: this.course.courseTeachers?.length === 0
    });
  }


  async add() {
    const model = this.form.getModel();
    const courseTeacher = await this._httpClient.addCourseTeacher(this.course, model.teacher, model.body);

    if (courseTeacher.isPrincipal) {
      this.course.courseTeachers.forEach(c => c.isPrincipal = false);
    }

    this.course.courseTeachers?.add(courseTeacher);
    model.teacher.courseTeachers?.add(courseTeacher);


    this._alertEmitter.info(`Enseignant ${model.teacher.user.fullName} ajouté!`);
    await this._loader.load(courseTeacher);
    if (this._modal) {
      this._modal.close(courseTeacher);
    }
  }


  get department(): Department {
    return this.course.level.department;
  }
}
