import {Injectable} from '@angular/core';
import {List} from '@positon/collections';
import {AuthorizationManager} from 'examination/app/authorization';
import {
  Examination,
  ExaminationDepartment,
  ExaminationLevel, ExaminationLevelSpeciality,
  ExaminationSpeciality,
  ExaminationStudent
} from 'examination/entities';
import {ExaminationStudentHttpClient, UserHttpClient} from 'examination/models/http';
import {ExaminationLevelLoader} from './examination-level.loader';
import {Loader} from '../loader';
import {StudentLoader} from '../member';
import {ExaminationLevelSpecialityLoader} from './examination-level-speciality.loader';


@Injectable({providedIn: 'root'})
export class ExaminationStudentLoader extends Loader<ExaminationStudent, number> {

  constructor(private httpClient: ExaminationStudentHttpClient,
              private _userHttClient: UserHttpClient,
              private identity: AuthorizationManager,
              private _examinationLevelSpecialityLoader: ExaminationLevelSpecialityLoader,
              private _examinationLevelLoader: ExaminationLevelLoader,
              private _studentLoader: StudentLoader) {
    super(httpClient);
  }

  async load(item: ExaminationStudent): Promise<ExaminationStudent> {
    await this._examinationLevelLoader.load(item.examinationLevel);
    if (item.examinationLevelSpecialityId) {
      item.examinationLevelSpeciality = await this._examinationLevelSpecialityLoader.loadById(item.examinationLevelSpecialityId);
    }
    await this._studentLoader.load(item.student);
    return item;
  }

  async loadById(id: number): Promise<ExaminationStudent> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }


  async loadByExamination(examination: Examination): Promise<void> {
    if (examination.examinationStudents) {
      return;
    }
    const students = await this._httpClient.listAsync({examinationId: examination.id});
    examination.examinationStudents = students;
    for (const item of students) {
      await this.load(item);
    }
  }


  async loadByExaminationDepartment(examinationDepartment: ExaminationDepartment): Promise<void> {
    if (examinationDepartment.examinationStudents) {
      return;
    }
    const students = await this._httpClient.listAsync({examinationDepartmentId: examinationDepartment.id});
    examinationDepartment.examinationStudents = students;
    for (const item of students) {
      await this.load(item);
    }
  }

  async loadByExaminationLevel(examinationLevel: ExaminationLevel): Promise<void> {
    if (examinationLevel.examinationStudents) {
      return;
    }
    const students = await this._httpClient.listAsync({examinationLevelId: examinationLevel.id});
    examinationLevel.examinationStudents = students;
    for (const item of students) {
      await this.load(item);
    }
  }

  async loadByExaminationSpeciality(examinationSpeciality: ExaminationSpeciality): Promise<void> {
    if (examinationSpeciality.examinationStudents) {
      return;
    }
    const students = await this._httpClient.listAsync({examinationSpecialityId: examinationSpeciality.id});
    examinationSpeciality.examinationStudents = students;
    for (const item of students) {
      await this.load(item);
    }
  }


  async loadByExaminationLevelSpeciality(examinationLevelSpeciality: ExaminationLevelSpeciality): Promise<void> {
    if (examinationLevelSpeciality.examinationStudents) {
      return;
    }
    const students = await this._httpClient.listAsync(
      {examinationLevelSpecialityId: examinationLevelSpeciality.id}
    );
    examinationLevelSpeciality.examinationStudents = students;
    for (const item of students) {
      await this.load(item);
    }
  }
}
