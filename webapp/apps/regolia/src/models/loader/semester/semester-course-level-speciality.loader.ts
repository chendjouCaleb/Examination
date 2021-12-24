import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {SemesterCourseLevelSpeciality} from 'examination/entities';
import {SemesterCourseHttpClient, SemesterCourseLevelSpecialityHttpClient} from 'examination/models/http';
import {SemesterLevelLoader} from "./semester-level.loader";
import {CourseLevelSpecialityLoader} from "../course";
import {SemesterLevelSpecialityLoader} from "./semester-level-speciality.loader";
import {SemesterCourseLoader} from "./semester-course.loader";


@Injectable({providedIn: 'root'})
export class SemesterCourseLevelSpecialityLoader extends Loader<SemesterCourseLevelSpeciality, number> {

  constructor( _httpClient: SemesterCourseLevelSpecialityHttpClient,
               private _semesterLevelLoader: SemesterLevelLoader,
               private _semesterLevelSpecialityLoader: SemesterLevelSpecialityLoader,
               private _courseLevelSpecialityLoader: CourseLevelSpecialityLoader,
               private _courseLoader: SemesterCourseLoader,
               private _courseHttpClient: SemesterCourseHttpClient,
               ) {
    super(_httpClient);
  }

  async load(item: SemesterCourseLevelSpeciality): Promise<SemesterCourseLevelSpeciality> {
    item.semesterLevelSpeciality = await this._semesterLevelSpecialityLoader.loadById(item.semesterLevelSpecialityId);
    item.semesterCourse = await this._courseLoader.loadById(item.semesterCourseId);

    if(item.courseLevelSpecialityId) {
      item.courseLevelSpeciality = await this._courseLevelSpecialityLoader.loadById(item.courseLevelSpecialityId);
    }

    return item;
  }

  async loadById(id: number): Promise<SemesterCourseLevelSpeciality> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
