import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {School, Semester, Year} from 'examination/entities';
import {SemesterHttpClient} from 'examination/models/http';
import {YearLoader} from "../year";


@Injectable({providedIn: 'root'})
export class SemesterLoader extends Loader<Semester, number> {

  constructor( _httpClient: SemesterHttpClient,
               private _yearLoader: YearLoader) {
    super(_httpClient);
  }

  async load(item: Semester): Promise<Semester> {
    item.year = await this._yearLoader.loadById(item.yearId);
    return item;
  }

  async loadById(id: number): Promise<Semester> {
    const item = await this._httpClient.findAsync(id);
    item.year = await this._yearLoader.loadById(item.yearId);
    await this.load(item);
    return item;
  }

  async loadByYear(year: Year): Promise<void> {
    if (!year.semesters) {
      const semesters = await this._httpClient.listAsync({yearId: year.id});
      for (const item of semesters) {
        await this.load(item);
      }
      year.semesters = semesters.toArray();
    }
  }

  async loadBySchool(school: School): Promise<Semester[]> {
    if (!school.semesters) {
      const semesters = await this._httpClient.listAsync({schoolId: school.id});
      for (const item of semesters) {
        await this.load(item);
      }
      school.semesters = semesters.toArray();
    }

    return school.semesters.slice();
  }
}
