import {Entity} from "../entity";
import {Course} from "./course.entity";
import {SemesterLevel} from "../semester";
import {SemesterCourseTeacher} from "./semester-course-teacher";
import {SemesterCourseLevelSpeciality} from "./semester-course-level-speciality";
import {List} from "@positon/collections";
import {CourseHour} from "./course-hour.entity";
import {CourseSession} from "./course-session.entity";

export class SemesterCourse extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.practicalWork = value.practicalWork;
    this.isGeneral = value.isGeneral;
    this.radical = value.radical;
    this.coefficient = value.coefficient;
    this.courseId = value.courseId;
    this.semesterLevelId = value.semesterLevelId;

    if(value.course) {
      this.course = new Course(value.course);
    }

    if(value.semesterCourseLevelSpecialities) {
      this.semesterCourseLevelSpecialities = value.semesterCourseLevelSpecialities
        .map(u => new SemesterCourseLevelSpeciality(u) );

      this.semesterCourseLevelSpecialities.forEach(s => s.semesterCourse = this);
    }
  }

  coefficient: boolean;
  practicalWork: boolean;
  isGeneral: boolean;
  radical: number;

  course: Course;
  courseId: number;

  semesterLevel: SemesterLevel;
  semesterLevelId: number;

  semesterCourseLevelSpecialities: SemesterCourseLevelSpeciality[];

  semesterCourseTeachers: SemesterCourseTeacher[];

  courseHours: List<CourseHour>;
  courseSessions: List<CourseSession>;

  get specialityNames(): string[] {
    return this.semesterCourseLevelSpecialities
      .map(s => s.semesterLevelSpeciality?.yearLevelSpeciality?.levelSpeciality?.speciality.name)
  }

  url(path?: string): string {
    const url = `${this.semesterLevel?.url()}/courses/${this.id}`;
    if(path) {
      return `${url}/${path}`;
    }
    return url;
  }
}
