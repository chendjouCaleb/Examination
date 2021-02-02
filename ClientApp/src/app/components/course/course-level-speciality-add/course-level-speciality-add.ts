import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseLevelSpecialityHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsfModalRef} from 'fabric-docs';
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from 'examination/loaders';
import {Course, LevelSpeciality} from 'examination/entities';
import {CourseLevelSpecialityAddForm} from '../course-form';


@Component({
  templateUrl: 'course-level-speciality-add.html',
  selector: 'app-course-level-speciality-add'
})
export class CourseLevelSpecialityAdd implements OnInit {
  @Input()
  course: Course;

  @Input()
  levelSpeciality: LevelSpeciality;

  form: CourseLevelSpecialityAddForm;

  constructor(private _httpClient: CourseLevelSpecialityHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _alertEmitter: AlertEmitter,
              private _courseLoader: CourseLoader,
              private _loader: CourseLevelSpecialityLoader,
              @Optional() private _modal: MsfModalRef<CourseLevelSpecialityAdd>) {
  }

  async ngOnInit() {
    if (!this.levelSpeciality && !this.course) {
      throw new Error('LevelSpeciality and course input cannot be null. You must provide at least one of them.');
    }

    if (!this.course) {
      await this._courseLoader.loadByLevel(this.levelSpeciality.level);
    }

    if (!this.levelSpeciality) {
      await this._levelSpecialityLoader.loadByLevel(this.course.level);
    }

    this.form = new CourseLevelSpecialityAddForm({course: this.course, levelSpeciality: this.levelSpeciality});
  }


  async add() {
    const model = this.form.getModel();
    const item = await this._httpClient.addCourseLevelSpeciality(model.params);
    await this._loader.load(item);

    const m = `Le cours ${item.course.name}(${item.course.code}) a été ajouté à la specialité
     ${item.levelSpeciality.speciality.name} du niveau ${item.levelSpeciality.level.index + 1}!`;

    model.course.courseLevelSpecialities.add(item);
    model.levelSpeciality.courseLevelSpecialities.add(item);
    this._alertEmitter.info(m);

    if (this._modal) {
      this._modal.close(item);
    }
  }
}
