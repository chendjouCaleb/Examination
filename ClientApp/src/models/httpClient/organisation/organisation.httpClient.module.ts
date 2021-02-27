import {NgModule} from '@angular/core';
import {SchoolHttpClient} from './school.httpClient';
import {DepartmentHttpClient} from './department.httpClient';
import {SpecialityHttpClient} from './speciality.httpClient';
import {LevelSpecialityHttpClient} from './level-speciality.httpClient';
import {LevelHttpClient} from './level.httpClient';
import {RoomHttpClient} from './room.httpClient';
import {ScoreHttpClient} from './score.httpClient';
import {CourseHttpClient} from '../course/course.httpClient';
import {CourseLevelSpecialityHttpClient} from "../course/course-level-speciality.httpClient";


@NgModule({
  providers: [SchoolHttpClient, DepartmentHttpClient, LevelHttpClient, LevelSpecialityHttpClient,
    SpecialityHttpClient, RoomHttpClient, CourseHttpClient, CourseLevelSpecialityHttpClient, ScoreHttpClient]
})
export class OrganisationHttpClientModule {

}
