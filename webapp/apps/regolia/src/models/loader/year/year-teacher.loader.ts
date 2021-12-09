import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {Teacher, Year, YearDepartment, YearTeacher} from 'examination/entities';
import {TeacherHttpClient, UserHttpClient, YearTeacherHttpClient} from 'examination/models/http';
import {TeacherLoader} from "../member";
import {YearDepartmentLoader} from "./year-department.loader";


@Injectable({providedIn: 'root'})
export class YearTeacherLoader extends Loader<YearTeacher, number> {

  constructor( _httpClient: YearTeacherHttpClient,
               private _userHttClient: UserHttpClient,
               private _yearDepartmentLoader: YearDepartmentLoader,
               private _teacherLoader: TeacherLoader,
               private _teacherHttpClient: TeacherHttpClient,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: YearTeacher): Promise<YearTeacher> {
    if(!item.teacher) {
      item.teacher = await this._teacherHttpClient.findAsync(item.teacherId);
    }

    await this._teacherLoader.load(item.teacher);

    item.yearDepartment = await this._yearDepartmentLoader.loadById(item.yearDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<YearTeacher> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByTeacher(teacher: Teacher): Promise<void> {
    if (!teacher.yearTeachers) {
      const yearTeachers = await this._httpClient.listAsync({teacherId: teacher.id});
      for (const item of yearTeachers) {
        await this.load(item);
      }
      teacher.yearTeachers = yearTeachers.toArray();
    }
  }


  async loadByYearDepartment(yearDepartment: YearDepartment): Promise<void> {
    if (!yearDepartment.yearTeachers) {
      const yearTeachers = await this._httpClient.listAsync({yearDepartmentId: yearDepartment.id});
      for (const item of yearTeachers) {
        await this.load(item);
      }
      yearDepartment.yearTeachers = yearTeachers.toArray();
    }
  }

  async loadByYear(year: Year): Promise<void> {
    if (!year.yearTeachers) {
      const yearTeachers = await this._httpClient.listAsync({yearId: year.id});
      for (const item of yearTeachers) {
        await this.load(item);
      }
      year.yearTeachers = yearTeachers.toArray();
    }
  }
}
