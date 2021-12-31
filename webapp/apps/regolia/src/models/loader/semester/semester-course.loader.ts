import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {SemesterCourse, SemesterCourseLevelSpeciality} from 'examination/entities';
import {CourseHttpClient, SemesterCourseHttpClient} from 'examination/models/http';
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {SemesterLevelLoader} from "./semester-level.loader";
import {CourseLoader} from "../course";
import {SemesterLevelSpecialityLoader} from "./semester-level-speciality.loader";


@Injectable({providedIn: 'root'})
export class SemesterCourseLoader extends Loader<SemesterCourse, number> {

  constructor( _httpClient: SemesterCourseHttpClient,
               private _semesterLevelLoader: SemesterLevelLoader,
               private _semesterLevelSpecialityLoader: SemesterLevelSpecialityLoader,
               private _courseLoader: CourseLoader,
               private _courseHttpClient: CourseHttpClient,
               ) {
    super(_httpClient);
  }

  async load(item: SemesterCourse): Promise<SemesterCourse> {
    if(item.course) {
      await this._courseLoader.load(item.course);
    }else {
      item.course = await this._courseLoader.loadById(item.courseId);
    }
    item.semesterLevel = await this._semesterLevelLoader.loadById(item.semesterLevelId);

    if(item.semesterCourseLevelSpecialities) {
      for (const _item of item.semesterCourseLevelSpecialities) {
        _item.semesterCourse = item;
        _item.semesterLevelSpeciality = await this._semesterLevelSpecialityLoader.loadById(_item.semesterLevelSpecialityId);
      }
    }

    return item;
  }


  async loads(params: any): Promise<SemesterCourse[]> {
    const items = await this._httpClient.list(params);
    await this.loadAll(items);

    return items.toArray();
  }



  async loadById(id: number): Promise<SemesterCourse> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
