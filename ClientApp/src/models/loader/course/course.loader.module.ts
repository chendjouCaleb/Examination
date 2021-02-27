import {NgModule} from '@angular/core';
import {CourseHttpClientModule} from 'examination/models/http';
import {CourseLevelSpecialityLoader} from './course-level-speciality.loader';
import {CourseLoader} from './course.loader';
import {CourseHourLoader} from './course-hour.loader';
import {CourseTeacherLoader} from './course-teacher.loader';
import {CourseSessionLoader} from './course-session.loader';


@NgModule({
  imports: [CourseHttpClientModule],
  providers: [CourseLoader, CourseHourLoader, CourseTeacherLoader, CourseSessionLoader, CourseLevelSpecialityLoader ]
})
export class CourseLoaderModule {

}
