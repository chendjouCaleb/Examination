import {Injectable} from "@angular/core";
import {Semester, SemesterCourse, SemesterDepartment, SemesterLevel} from "examination/entities";
import {Observable} from "rxjs";
import {MsDialog} from "@ms-fluent/components";
import {SemesterLevelCourseAdd} from "./Add/SemesterLevelCourseAdd";
import {SemesterCourseAdd} from "./Add/SemesterCourseAdd";
import {SemesterDepartmentCourseAdd} from "./Add/SemesterDepartmentCourseAdd";
import {SemesterCourseDelete} from "examination/app/components/semester-course/Delete/SemesterCourseDelete";

@Injectable({
  providedIn: 'root'
})
export class SemesterCourseService {

  constructor(private _dialog: MsDialog) {}

  addSemesterDepartmentCourses(semesterDepartment: SemesterDepartment): Observable<SemesterCourse[]> {
    const modalRef = this._dialog.open(SemesterDepartmentCourseAdd, {autoFocus: false, data: {semesterDepartment}});
    return modalRef.afterClosed();
  }

  addSemesterLevelCourses(semesterLevel: SemesterLevel): Observable<SemesterCourse[]> {
    const modalRef = this._dialog.open(SemesterLevelCourseAdd, {autoFocus: false, data: {semesterLevel}});
    return modalRef.afterClosed();
  }

  addSemesterCourses(semester: Semester): Observable<SemesterCourse[]> {
    const modalRef = this._dialog.open(SemesterCourseAdd, {autoFocus: false, data: {semester}});
    return modalRef.afterClosed();
  }

  delete(semesterCourse: SemesterCourse): Observable<SemesterCourse[]> {
    const modalRef = this._dialog.open(SemesterCourseDelete, {autoFocus: false, data: {semesterCourse}});
    return modalRef.afterClosed();
  }
}
