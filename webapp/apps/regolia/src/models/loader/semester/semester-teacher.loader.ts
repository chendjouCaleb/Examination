import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {SemesterTeacher} from 'examination/entities';
import {SemesterTeacherHttpClient, YearTeacherHttpClient} from 'examination/models/http';
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {YearTeacherLoader} from "../year";


@Injectable({providedIn: 'root'})
export class SemesterTeacherLoader extends Loader<SemesterTeacher, number> {

  constructor( _httpClient: SemesterTeacherHttpClient,
               private _semesterDepartmentLoader: SemesterDepartmentLoader,
               private _teacherLoader: YearTeacherLoader,
               private _teacherHttpClient: YearTeacherHttpClient) {
    super(_httpClient);
  }

  async load(item: SemesterTeacher): Promise<SemesterTeacher> {
    if(!item.yearTeacher) {
      item.yearTeacher = await this._teacherHttpClient.findAsync(item.yearTeacherId);
    }

    await this._teacherLoader.load(item.yearTeacher);

    item.semesterDepartment = await this._semesterDepartmentLoader.loadById(item.semesterDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<SemesterTeacher> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
