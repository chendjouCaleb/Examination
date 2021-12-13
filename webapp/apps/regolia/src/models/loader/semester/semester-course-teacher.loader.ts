import {Injectable} from '@angular/core';
import {Loader} from '../loader';
import {SemesterCourse, SemesterCourseLevelSpeciality, SemesterCourseTeacher} from 'examination/entities';
import {CourseHttpClient, SemesterCourseHttpClient, SemesterCourseTeacherHttpClient} from 'examination/models/http';
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {SemesterLevelLoader} from "./semester-level.loader";
import {CourseLoader} from "../course";
import {SemesterLevelSpecialityLoader} from "./semester-level-speciality.loader";
import {SemesterCourseLoader} from "./semester-course.loader";
import {SemesterTeacherLoader} from "./semester-teacher.loader";


@Injectable({providedIn: 'root'})
export class SemesterCourseTeacherLoader extends Loader<SemesterCourseTeacher, number> {

  constructor( _httpClient: SemesterCourseTeacherHttpClient,
               private _semesterLevelLoader: SemesterLevelLoader,
               private _semesterLevelSpecialityLoader: SemesterLevelSpecialityLoader,
               private _semesterCourseLoader: SemesterCourseLoader,
               private _semesterTeacherLoader: SemesterTeacherLoader,
               private _courseHttpClient: CourseHttpClient,
               ) {
    super(_httpClient);
  }

  async load(item: SemesterCourseTeacher): Promise<SemesterCourseTeacher> {
    if(item.semesterCourse) {
      await this._semesterCourseLoader.load(item.semesterCourse);
    } else {
      item.semesterCourse = await this._semesterCourseLoader.loadById(item.semesterCourseId);
    }

    if(item.semesterTeacher) {
      await this._semesterTeacherLoader.load(item.semesterTeacher);
    } else {
      item.semesterTeacher = await this._semesterTeacherLoader.loadById(item.semesterTeacherId);
    }

    return item;
  }

  async loadById(id: number): Promise<SemesterCourseTeacher> {
    const item = await this._httpClient.findAsync(id);
    await this.load(item);
    return item;
  }
}
