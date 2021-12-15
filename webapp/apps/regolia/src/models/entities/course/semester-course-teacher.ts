import {Entity} from "../entity";
import {SemesterTeacher} from "../semester";
import {SemesterCourse} from "./semester-course";

export class SemesterCourseTeacher extends Entity<number> {
  constructor(value: any = {}) {
    super();

    this.id = value.id;
    this.registrationDate = new Date(value.registrationDate);

    this.tutorial = value.tutorial;
    this.lecture = value.lecture;
    this.isPrincipal = value.isPrincipal;
    this.semesterCourseId = value.semesterCourseId;
    this.semesterTeacherId = value.semesterTeacherId;

    if(value.semesterCourse) {
      this.semesterCourse = new SemesterCourse(value.semesterCourse);
    }
  }

  tutorial: boolean;
  lecture: boolean;
  isPrincipal: boolean;

  semesterCourse: SemesterCourse;
  semesterCourseId: number;

  semesterTeacher: SemesterTeacher;
  semesterTeacherId: number;

  get courseName() {
    return this.semesterCourse.course?.name;
  }

  get levelIndex(): number {
    return this.semesterCourse.semesterLevel?.yearLevel?.id
  }

  get teacherName(): string {
    return this.semesterTeacher?.yearTeacher?.teacher.user.fullName;
  }
}
