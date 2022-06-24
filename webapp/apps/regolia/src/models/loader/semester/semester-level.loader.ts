import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {Level, Semester, SemesterDepartment, SemesterLevel, YearLevel} from 'examination/entities';
import {SemesterLevelHttpClient} from 'examination/models/http';
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {YearLevelLoader} from "../year";


@Injectable({providedIn: 'root'})
export class SemesterLevelLoader extends Loader<SemesterLevel, number> {

  constructor(public _httpClient: SemesterLevelHttpClient,
              private _semesterDepartmentLoader: SemesterDepartmentLoader,
              private _yearLevelLoader: YearLevelLoader) {
    super(_httpClient);
  }

  async load(item: SemesterLevel): Promise<SemesterLevel> {
    item.yearLevel = await this._yearLevelLoader.loadById(item.yearLevelId);
    item.semesterDepartment = await this._semesterDepartmentLoader.loadById(item.semesterDepartmentId);
    return item;
  }

  async loads(params: any): Promise<SemesterLevel[]> {
    const items = await this._httpClient.list(params);
    await this.loadAll(items);
    return items.toArray();
  }

  async loadById(id: number): Promise<SemesterLevel> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }

  async loadByYearLevel(yearLevel: YearLevel): Promise<SemesterLevel[]> {
    if (!yearLevel.semesterLevels) {
      const semesterLevels = await this._httpClient.listByYearLevel(yearLevel);
      for (const item of semesterLevels) {
        await this.load(item);
      }
      yearLevel.semesterLevels = semesterLevels.toArray();
    }
    return yearLevel.semesterLevels.slice();
  }

  async loadByLevel(level: Level): Promise<SemesterLevel[]> {
    if (!level.semesterLevels) {
      const semesterLevels = await this._httpClient.listAsync({levelId: level.id});
      for (const item of semesterLevels) {
        await this.load(item);
      }
      level.semesterLevels = semesterLevels.toArray();
    }
    return level.semesterLevels.slice();
  }


  async loadBySemesterDepartment(semesterDepartment: SemesterDepartment): Promise<SemesterLevel[]> {
    if (!semesterDepartment.semesterLevels) {
      const semesterLevels = await this._httpClient.listAsync({semesterDepartmentId: semesterDepartment.id});
      for (const item of semesterLevels) {
        await this.load(item);
      }
      semesterDepartment.semesterLevels = semesterLevels.toArray();
    }
    return semesterDepartment.semesterLevels.slice();
  }

  async loadBySemester(semester: Semester): Promise<SemesterLevel[]> {

    const semesterLevels = await this._httpClient.listAsync({semesterId: semester.id});
    for (const item of semesterLevels) {
      await this.load(item);
    }
    return semesterLevels.toArray();
  }
}
