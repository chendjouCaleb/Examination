import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {SemesterStudent} from 'examination/entities';
import {SemesterStudentHttpClient, YearStudentHttpClient} from 'examination/models/http';
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {YearStudentLoader} from "../year";
import {SemesterLevelLoader} from "./semester-level.loader";
import {SemesterLevelSpecialityLoader} from "./semester-level-speciality.loader";


@Injectable({providedIn: 'root'})
export class SemesterStudentLoader extends Loader<SemesterStudent, number> {

  constructor( _httpClient: SemesterStudentHttpClient,
               private _semesterLevelLoader: SemesterLevelLoader,
               private _semesterLevelSpecialityLoader: SemesterLevelSpecialityLoader,
               private _studentLoader: YearStudentLoader,
               private _studentHttpClient: YearStudentHttpClient) {
    super(_httpClient);
  }

  async load(item: SemesterStudent): Promise<SemesterStudent> {
    if(!item.yearStudent) {
      item.yearStudent = await this._studentHttpClient.findAsync(item.yearStudentId);
    }

    await this._studentLoader.load(item.yearStudent);

    item.semesterLevel = await this._semesterLevelLoader.loadById(item.semesterLevelId);

    if(item.semesterLevelSpecialityId) {
      item.semesterLevelSpeciality = await this._semesterLevelSpecialityLoader.loadById(item.semesterLevelSpecialityId);
    }
    return item;
  }

  async loadById(id: number): Promise<SemesterStudent> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
