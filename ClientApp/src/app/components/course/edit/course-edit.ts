import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHttpClient, LevelSpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseLoader} from 'examination/loaders';
import {Course} from 'examination/entities';
import {CourseEditForm} from '../course-form';

@Component({
  templateUrl: 'course-edit.html',
  selector: 'app-course-edit'
})
export class CourseEdit implements OnInit {
  @Input()
  course: Course;

  form: CourseEditForm;

  constructor(private _httpClient: CourseHttpClient,
              private _levelSpecialityHttpClient: LevelSpecialityHttpClient,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseLoader,
              @Optional() private _modal: MsDialogRef<CourseEdit>) {
  }

  async ngOnInit() {
    this.form = new CourseEditForm(this.course);
  }

  async checkCode() {
    const code = this.form.getControl('code');
    if (code.value.match(/^[a-zA-Z0-9]+$/)) {
      const course = await this._httpClient.findByCode(this.course.level.department, code.value);
      if (course.id && course.id !== this.course.id) {
        code.addError('Ce nom est déjà utilisé par un autre cours du département.');
      }
    }
  }


  async edit() {
    const body = this.form.getModel().body;
    const course = await this._httpClient.update(this.course.id, body);
    this._alertEmitter.info(`Le cours ${course.name}(${course.code}) a été modifié!`);
    this.course.apply(body);
    await this._loader.load(course);
    if (this._modal) {
      this._modal.close(course);
    }
  }

  cancel() {
    if (this._modal) {
      this._modal.close();
    }
  }
}
