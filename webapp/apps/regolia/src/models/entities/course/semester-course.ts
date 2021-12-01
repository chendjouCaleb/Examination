import {Entity} from "../entity";
import {Course} from "./course.entity";
import {SemesterLevel} from "../semester";
import {SemesterCourseTeacher} from "./semester-course-teacher";

export class SemesterCourse extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.practicalWork = value.practicalWork;
    this.isGeneral = value.isGeneral;
    this.radical = value.radical;
    this.courseId = value.courseId;
    this.semesterLevelId = value.semesterLevelId;

    if(value.course) {
      this.course = new Course(value.course);
    }
  }

  practicalWork: boolean;
  isGeneral: boolean;
  radical: number;

  course: Course;
  courseId: number;

  semesterLevel: SemesterLevel;
  semesterLevelId: number;

  semesterCourseTeachers: SemesterCourseTeacher[];
}
