import {NgModule} from "@angular/core";
import {SemesterLoader} from "./semester.loader";
import {SemesterDepartmentLoader} from "./semester-department.loader";
import {SemesterLevelLoader} from "./semester-level.loader";
import {SemesterLevelSpecialityLoader} from "./semester-level-speciality.loader";
import {SemesterSpecialityLoader} from "./semester-speciality.loader";
import {SemesterTeacherLoader} from "./semester-teacher.loader";
import {SemesterCourseLoader} from "./semester-course.loader";
import {SemesterCourseTeacherLoader} from "./semester-course-teacher.loader";

@NgModule({
  providers: [ SemesterLoader, SemesterDepartmentLoader, SemesterLevelLoader, SemesterTeacherLoader,
    SemesterLevelSpecialityLoader, SemesterSpecialityLoader, SemesterCourseLoader,
    SemesterCourseTeacherLoader ]
})
export class SemesterLoaderModule {

}
