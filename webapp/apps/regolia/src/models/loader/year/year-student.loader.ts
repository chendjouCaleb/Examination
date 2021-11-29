import {Injectable} from '@angular/core';

import {AuthorizationManager} from 'examination/app/authorization';
import {Loader} from '../loader';
import {
  Student,
  YearDepartment,
  YearLevel,
  YearLevelSpeciality,
  YearSpeciality,
  YearStudent
} from 'examination/entities';
import {UserHttpClient, YearStudentHttpClient } from 'examination/models/http';
import {YearLevelLoader} from "./year-level.loader";
import {YearLevelSpecialityLoader} from "./year-level-speciality.loader";
import {StudentLoader} from "../member";


@Injectable({providedIn: 'root'})
export class YearStudentLoader extends Loader<YearStudent, number> {

  constructor( _httpClient: YearStudentHttpClient,
               private _userHttClient: UserHttpClient,
               private _yearLevelLoader: YearLevelLoader,
               private _yearLevelSpecialityLoader: YearLevelSpecialityLoader,
               private _studentLoader: StudentLoader,
               private _authorization: AuthorizationManager) {
    super(_httpClient);
  }

  async load(item: YearStudent): Promise<YearStudent> {
    await this._studentLoader.load(item.student);
    item.yearLevel = await this._yearLevelLoader.loadById(item.yearLevelId);

    if(item.yearLevelSpecialityId) {
      item.yearLevelSpeciality = await this._yearLevelSpecialityLoader.loadById(item.yearLevelSpecialityId);
    }
    return item;
  }

  async loadById(id: number): Promise<YearStudent> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByStudent(student: Student): Promise<void> {
    if (!student.yearStudents) {
      const yearStudents = await this._httpClient.listAsync({studentId: student.id});
      for (const item of yearStudents) {
        await this.load(item);
      }
      student.yearStudents = yearStudents.toArray();
    }
  }

  async loadByYearLevelSpeciality(yearLevelSpeciality: YearLevelSpeciality): Promise<void> {
    if (!yearLevelSpeciality.yearStudents) {
      const yearStudents = await this._httpClient.listAsync({yearLevelSpecialityId: yearLevelSpeciality.id});
      for (const item of yearStudents) {
        await this.load(item);
      }
      yearLevelSpeciality.yearStudents = yearStudents.toArray();
    }
  }


  async loadByYearSpeciality(yearSpeciality: YearSpeciality): Promise<void> {
    if (!yearSpeciality.yearStudents) {
      const yearStudents = await this._httpClient.listAsync({yearSpecialityId: yearSpeciality.id});
      for (const item of yearStudents) {
        await this.load(item);
      }
      yearSpeciality.yearStudents = yearStudents.toArray();
    }
  }

  async loadByYearLevel(yearLevel: YearLevel): Promise<void> {
    if (!yearLevel.yearStudents) {
      const yearStudents = await this._httpClient.listAsync({yearLevelId: yearLevel.id});
      for (const item of yearStudents) {
        await this.load(item);
      }
      yearLevel.yearStudents = yearStudents.toArray();
    }
  }


  async loadByYearDepartment(yearDepartment: YearDepartment): Promise<void> {
    if (!yearDepartment.yearStudents) {
      const yearStudents = await this._httpClient.listAsync({yearDepartmentId: yearDepartment.id});
      for (const item of yearStudents) {
        await this.load(item);
      }
      yearDepartment.yearStudents = yearStudents.toArray();
    }
  }
}
