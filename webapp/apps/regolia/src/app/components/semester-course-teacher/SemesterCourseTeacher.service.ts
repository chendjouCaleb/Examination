import {Injectable} from "@angular/core";
import {SemesterCourse, SemesterCourseTeacher} from "@examination/entities";
import {Observable} from "rxjs";
import {MsDialog} from "@ms-fluent/components";
import {SemesterCourseTeacherAdd} from "./add/SemesterCourseTeacherAdd";
import {SemesterCourseTeacherDelete} from "./Delete/SemesterCourseTeacherDelete";
import {DeleteTutorialRole} from "./DeleteTutorialRole/DeleteTutorialRole";
import {AddTutorialRole} from "./AddTutorialRole/AddTutorialRole";
import {DeleteLectureRole} from "./DeleteLectureRole/DeleteLectureRole";
import {AddLectureRole} from "./AddLectureRole/AddLectureRole";
import {SemesterCourseTeacherPrincipal} from "examination/app/components/semester-course-teacher/Principal/SemesterCourseTeacherPrincipal";

@Injectable({
  providedIn: 'root'
})
export class SemesterCourseTeacherService {
  constructor(private _dialog: MsDialog) {}

  add(semesterCourse: SemesterCourse, semesterCourseTeachers: SemesterCourseTeacher[]): Observable<SemesterCourseTeacher> {
    const modalRef = this._dialog.open(SemesterCourseTeacherAdd, {
      autoFocus: false,
      data: {semesterCourse, semesterCourseTeachers}
    });

    return modalRef.afterClosed();
  }

  delete(semesterCourseTeacher: SemesterCourseTeacher): Observable<boolean> {
    const modalRef = this._dialog.open(SemesterCourseTeacherDelete, {
      autoFocus: false,
      data: {semesterCourseTeacher}
    });

    return modalRef.afterClosed();
  }

  deleteTutorialRole(semesterCourseTeacher: SemesterCourseTeacher): Observable<boolean> {
    const modalRef = this._dialog.open(DeleteTutorialRole, {
      autoFocus: false,
      data: {semesterCourseTeacher}
    });

    return modalRef.afterClosed();
  }


  addTutorialRole(semesterCourseTeacher: SemesterCourseTeacher): Observable<boolean> {
    const modalRef = this._dialog.open(AddTutorialRole, {
      autoFocus: false,
      data: {semesterCourseTeacher}
    });

    return modalRef.afterClosed();
  }


  deleteLectureRole(semesterCourseTeacher: SemesterCourseTeacher): Observable<boolean> {
    const modalRef = this._dialog.open(DeleteLectureRole, {
      autoFocus: false,
      data: {semesterCourseTeacher}
    });

    return modalRef.afterClosed();
  }

  addLectureRole(semesterCourseTeacher: SemesterCourseTeacher): Observable<boolean> {
    const modalRef = this._dialog.open(AddLectureRole, {
      autoFocus: false,
      data: {semesterCourseTeacher}
    });

    return modalRef.afterClosed();
  }


  principal(semesterCourseTeacher: SemesterCourseTeacher, semesterCourseTeachers: SemesterCourseTeacher[]): Observable<boolean> {
    const modalRef = this._dialog.open(SemesterCourseTeacherPrincipal, {
      autoFocus: false,
      data: {semesterCourseTeacher, semesterCourseTeachers}
    });

    return modalRef.afterClosed();
  }
}
