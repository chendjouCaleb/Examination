import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {
  Speciality,
  SemesterDepartment,
  SemesterSpeciality,
  YearSpeciality,
  Semester,
  SemesterLevel
} from 'examination/entities';
import {SemesterSpecialityHttpClient} from 'examination/models/http';
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {YearSpecialityLoader} from "../year";


@Injectable({providedIn: 'root'})
export class SemesterSpecialityLoader extends Loader<SemesterSpeciality, number> {

  constructor(public _httpClient: SemesterSpecialityHttpClient,
              private _semesterDepartmentLoader: SemesterDepartmentLoader,
              private _yearSpecialityLoader: YearSpecialityLoader) {
    super(_httpClient);
  }

  async load(item: SemesterSpeciality): Promise<SemesterSpeciality> {
    item.yearSpeciality = await this._yearSpecialityLoader.loadById(item.yearSpecialityId);
    item.semesterDepartment = await this._semesterDepartmentLoader.loadById(item.semesterDepartmentId);
    return item;
  }

  async loadById(id: number): Promise<SemesterSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByYearSpeciality(yearSpeciality: YearSpeciality): Promise<SemesterSpeciality[]> {
    if (!yearSpeciality.semesterSpecialities) {
      const semesterSpecialities = await this._httpClient.listByYearSpeciality(yearSpeciality);
      for (const item of semesterSpecialities) {
        await this.load(item);
      }
      yearSpeciality.semesterSpecialities = semesterSpecialities.toArray();
    }
    return yearSpeciality.semesterSpecialities.slice();
  }

  async loadBySpeciality(speciality: Speciality): Promise<SemesterSpeciality[]> {
    if (!speciality.semesterSpecialities) {
      const semesterSpecialities = await this._httpClient.listBySpeciality(speciality);
      for (const item of semesterSpecialities) {
        await this.load(item);
      }
      speciality.semesterSpecialities = semesterSpecialities.toArray();
    }
    return speciality.semesterSpecialities.slice();
  }


  async loadBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<SemesterSpeciality[]> {
    if (!semesterDepartment.semesterSpecialities) {
      const semesterSpecialities = await this._httpClient.listAsync({semesterDepartmentId: semesterDepartment.id});
      for (const item of semesterSpecialities) {
        await this.load(item);
      }
      semesterDepartment.semesterSpecialities = semesterSpecialities.toArray();
    }
    return semesterDepartment.semesterSpecialities.slice();
  }

  async loadBySemester(semester: Semester): Promise<SemesterSpeciality[]> {
    const semesterSpecialities = await this._httpClient.listAsync({semesterId: semester.id});
    for (const item of semesterSpecialities) {
      await this.load(item);
    }
    return semesterSpecialities.toArray();
  }
}
