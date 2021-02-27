import {NgModule} from '@angular/core';
import {CourseHttpClient} from './course.httpClient';
import {CourseLevelSpecialityHttpClient} from './course-level-speciality.httpClient';
import {CourseTeacherHttpClient} from './course-teacher.httpClient';
import {CourseHourHttpClient} from './course-hour.httpClient';
import {CourseSessionHttpClient} from './course-session.httpClient';


@NgModule({
  providers: [CourseHttpClient, CourseTeacherHttpClient, CourseHourHttpClient, CourseSessionHttpClient,
    CourseLevelSpecialityHttpClient]
})
export class CourseHttpClientModule {

}
