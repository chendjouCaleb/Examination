import {Component, Input, OnInit, Optional} from '@angular/core';
import {CourseHttpClient} from 'examination/models/http';
import {AlertEmitter} from 'examination/controls';
import {MsDialogRef} from '@ms-fluent/components';
import {CourseLevelSpecialityLoader, CourseLoader, LevelSpecialityLoader} from 'examination/loaders';
import {Course, LevelSpeciality} from 'examination/entities';

@Component({
  templateUrl: 'course-restrict.html',
  selector: 'app-course-restrict'
})
export class CourseRestrict implements OnInit {
  @Input()
  course: Course;

  @Input()
  levelSpecialities = new Array<LevelSpeciality>();

  constructor(private _httpClient: CourseHttpClient,
              private _levelSpecialityLoader: LevelSpecialityLoader,
              private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader,
              private _alertEmitter: AlertEmitter,
              private _loader: CourseLoader,
              @Optional() private _modal: MsDialogRef<CourseRestrict>) {
  }

  async ngOnInit() {
    await this._levelSpecialityLoader.loadByLevel(this.course.level);
  }


  async restrict() {
    const id = this.levelSpecialities.map(l => l.id);
    await this._httpClient.restrictCourse(this.course, id);
    const m = `Le cours est restreint aux spécialités ${this.levelSpecialities.map(l => l.speciality.name).join(', ')}.`;
    this._alertEmitter.info(m);

    this.course.isGeneral = false;
    this.course.courseLevelSpecialities = null;
    await this._courseLevelSpecialityLoader.loadByCourse(this.course);

    this.levelSpecialities.forEach(l => {
      l.addCourseLevelSpecialities(this.course.courseLevelSpecialities);
      l.speciality.addCourse(this.course);
    });

    if (this._modal) {
      this._modal.close(true);
    }
  }
}
