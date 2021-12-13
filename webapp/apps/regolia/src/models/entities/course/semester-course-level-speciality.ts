import {Entity} from "../entity";
import {SemesterLevelSpeciality} from "../semester";
import {SemesterCourse} from "./semester-course";
import {CourseLevelSpeciality} from "./course-level-speciality.entity";

export class SemesterCourseLevelSpeciality extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.semesterCourseId = value.semesterCourseId;
    this.courseLevelSpecialityId = value.courseLevelSpecialityId;
    this.semesterLevelSpecialityId = value.semesterLevelSpecialityId;

    if(value.semesterCourse) {
      this.semesterCourse = new SemesterCourse(value.semesterCourse);
    }
  }

  courseLevelSpeciality: CourseLevelSpeciality;
  courseLevelSpecialityId: number;

  semesterCourse: SemesterCourse;
  semesterCourseId: number;

  semesterLevelSpeciality: SemesterLevelSpeciality;
  semesterLevelSpecialityId: number;
}
