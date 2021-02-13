import {ICourseService} from './course.service.interface';
import {Injectable} from '@angular/core';
import {MsfModal} from 'fabric-docs';
import {Course, CourseLevelSpeciality, Level, LevelSpeciality, Score} from 'examination/entities';
import {AlertEmitter, Confirmation} from 'examination/controls';
import {CourseAdd} from './add/course-add';
import {CourseHttpClient, CourseLevelSpecialityHttpClient, ScoreHttpClient} from 'examination/models/http';
import {CourseEdit} from './edit/course-edit';
import {ScoreAdd} from './score-add/score-add';
import {CourseLevelSpecialityAdd} from './course-level-speciality-add/course-level-speciality-add';
import {CourseRestrict} from './restrict/course-restrict';
import {CourseDetails} from './details/course-details';
import {List} from '@positon/collections';


@Injectable()
export class CourseService implements ICourseService {
  constructor(private _modal: MsfModal,
              private _courseHttpClient: CourseHttpClient,
              private _courseLevelSpecialityHttpClient: CourseLevelSpecialityHttpClient,
              private _scoreHttpClient: ScoreHttpClient,
              private _alertEmitter: AlertEmitter,
              private _confirmation: Confirmation) {
  }


  addCourse(level: Level): Promise<Course> {
    const modalRef = this._modal.open(CourseAdd);
    modalRef.componentInstance.level = level;
    return modalRef.afterClosed().toPromise();
  }


  editCourse(course: Course): Promise<void> {
    const modalRef = this._modal.open(CourseEdit);
    modalRef.componentInstance.course = course;
    return modalRef.afterClosed().toPromise();
  }


  deleteCourse(course: Course): Promise<boolean> {
    const m = `Supprimer le cours ${course.name}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._courseHttpClient.delete(course.id);
        course.level.removeCourse(course);
        course.courseLevelSpecialities.forEach(l => l.levelSpeciality.speciality.removeCourse(course));
        this._alertEmitter.error(`Le cours ${course.name}(${course.code}) a été supprimé`);
        resolve(true);
      });
    });
  }

  addScore(course: Course): Promise<Score> {
    const modalRef = this._modal.open(ScoreAdd, {disableClose: true});
    modalRef.componentInstance.course = course;
    return modalRef.afterClosed().toPromise();
  }

  deleteScore(score: Score): Promise<boolean> {
    const m = `Supprimer la ligne ${score.name} du barème?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._scoreHttpClient.delete(score.id);
        score.course.scores.remove(score);
        if (score.course.scores.length == 0) {
          score.course.multipleScore = false;
        }
        resolve(true);
      });
    });
  }

  addCourseLevelSpeciality(course?: Course, levelSpeciality?: LevelSpeciality): Promise<CourseLevelSpeciality> {
    const modalRef = this._modal.open(CourseLevelSpecialityAdd);
    modalRef.componentInstance.levelSpeciality = levelSpeciality;
    modalRef.componentInstance.course = course;

    return modalRef.afterClosed().toPromise();
  }

  general(course: Course): Promise<boolean> {
    const m = `Généraliser le cours ${course.name} à toutes les spécialitités du niveau ${course.level.index + 1}?`;
    const result = this._confirmation.open(m);

    return new Promise<boolean>(resolve => {
      result.accept.subscribe(async () => {
        await this._courseHttpClient.general(course);
        course.courseLevelSpecialities.forEach(s => s.levelSpeciality.speciality.removeCourse(course));
        course.courseLevelSpecialities = new List<CourseLevelSpeciality>();
        course.isGeneral = true;
        this._alertEmitter.info(`Le cours ${course.name} est généralisé à toutes les spécialitités du niveau ${course.level.index + 1}`);
        resolve(true);
      });
    });
  }

  removeCourseLevelSpeciality(item: CourseLevelSpeciality): Promise<void> {
    const m = ` Supprimer le cours ${item.course.name}(${item.course.code}) de la specialité
     ${item.levelSpeciality.speciality.name} du niveau ${item.levelSpeciality.level.index + 1}!`;

    const result = this._confirmation.open(m);

    return new Promise<void>(resolve => {
      result.accept.subscribe(async () => {
        await this._courseLevelSpecialityHttpClient.delete(item.id);
        this._alertEmitter.info(`Le cours ${item.course.name}(${item.course.code}) a été enelvé
         à la specialité ${item.levelSpeciality.speciality.name} du niveau ${item.levelSpeciality.level.index + 1}!`);
        resolve();
      });
    });
  }

  restrict(course: Course): Promise<void> {
    const modalRef = this._modal.open(CourseRestrict);
    modalRef.componentInstance.course = course;
    return modalRef.afterClosed().toPromise();
  }


  details(course: Course) {
    const modalRef = this._modal.open(CourseDetails, {autoFocus: false});
    modalRef.componentInstance.course = course;
  }
}
