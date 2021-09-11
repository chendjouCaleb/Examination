import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from 'examination/loaders';
import {Department, Level, LevelSpeciality} from 'examination/entities';
import {CourseAddForm} from '../course-form';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'course-add.html',
  selector: 'app-course-add'
})
export class CourseAdd implements OnInit {
  @Input()
  level: Level;

  @Input()
  levelSpeciality: LevelSpeciality;


  form: CourseAddForm;

  isGeneral: boolean;

  constructor(private _httpClient: CourseHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseLoader,
              @Optional() private _modal: MsDialogRef<CourseAdd>) {
  }

  async ngOnInit() {
    if (this.levelSpeciality) {
      this.level = this.levelSpeciality.level;
    }

    if (!this.level) {
      throw new Error('Level input cannot be null');
    }

    this.form = new CourseAddForm({
      isGeneral: false,
      radical: 20,
      level: this.level,
      levelSpecialities: [this.levelSpeciality]
    });

    if (this.level) {
      await this._levelSpecialityLoader.loadByLevel(this.level);
    }

  }


  async checkCode() {
    const code = this.form.getControl('code');
    if (code.value > 0) {
      const course = await this._httpClient.findByCode(this.department, code.value);
      if (course && course.id) {
        code.addError('Ce nom est déjà utilisé par un autre cours du département.');
      }
    }
  }


  async add() {
    const body = this.form.getModel().body;
    const params = this.form.getModel().params;
    const course = await this._httpClient.addCourse(body, params);

    this.level.addCourse(course);
    await this._courseLevelSpecialityLoader.loadByCourse(course);

    if (!course.isGeneral) {
      this.form.getModel().levelSpecialities.forEach(l => {
        l.addCourseLevelSpecialities(course.courseLevelSpecialities);
        l.speciality.addCourse(course);
      });
    }


    this._alertEmitter.info(`Le cours ${course.name}(${course.code}) a été ajouté!`);
    await this._loader.load(course);
    if (this._modal) {
      this._modal.close(course);
    }
  }

  toggleGeneral() {
    this.isGeneral = !this.isGeneral;
  }

  get department(): Department {
    if (this.level) {
      return this.level.department;
    }
    return this.levelSpeciality.level.department;
  }
}
