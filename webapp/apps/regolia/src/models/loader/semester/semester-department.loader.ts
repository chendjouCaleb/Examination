import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {Department, Semester, SemesterDepartment, YearDepartment} from 'examination/entities';
import {SemesterDepartmentHttpClient} from 'examination/models/http';
import {SemesterLoader} from "./semester.loader";
import {YearDepartmentLoader} from "../year";


@Injectable({providedIn: 'root'})
export class SemesterDepartmentLoader extends Loader<SemesterDepartment, number> {

  constructor( public _httpClient: SemesterDepartmentHttpClient,
               private _semesterLoader: SemesterLoader,
               private _yearDepartmentLoader: YearDepartmentLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: SemesterDepartment): Promise<SemesterDepartment> {
    item.semester = await this._semesterLoader.loadById(item.semesterId);
    item.yearDepartment = await this._yearDepartmentLoader.loadById(item.yearDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<SemesterDepartment> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByDepartment(department: Department): Promise<SemesterDepartment[]> {
    if (!department.semesterDepartments) {
      const semesterDepartments = await this._httpClient.listByDepartment(department);
      for (const item of semesterDepartments) {
        await this.load(item);
      }
      department.semesterDepartments = semesterDepartments.toArray();
    }

    return department.semesterDepartments.slice();
  }

  async loadBySemester(semester: Semester): Promise<SemesterDepartment[]> {
    if (!semester.semesterDepartments) {
      const semesterDepartments = await this._httpClient.listBySemester(semester);
      for (const item of semesterDepartments) {
        await this.load(item);
      }
      semester.semesterDepartments = semesterDepartments.toArray();
    }

    return semester.semesterDepartments;
  }


  async loadByYearDepartment(yearDepartment: YearDepartment): Promise<SemesterDepartment[]> {
    if (!yearDepartment.semesterDepartments) {
      const semesterDepartments = await this._httpClient.listByYearDepartment(yearDepartment);
      for (const item of semesterDepartments) {
        await this.load(item);
      }
      yearDepartment.semesterDepartments = semesterDepartments.toArray();
    }
    return yearDepartment.semesterDepartments.slice();
  }
}
