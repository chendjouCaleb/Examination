import {Injectable} from "@angular/core";
import {Semester, SemesterDepartment, SemesterLevel, SemesterStudent} from "@examination/entities";
import {Observable} from "rxjs";
import {MsDialog} from "@ms-fluent/components";
import {SemesterStudentAddAll} from "./AddAll/SemesterStudentAddAll";
import {SemesterStudentDelete} from "./Delete/SemesterStudentDelete";
import {SemesterStudentAddAllDepartment} from "./AddAll/SemesterStudentAddAllDepartment";
import {SemesterStudentAddAllLevel} from "./AddAll/SemesterStudentAddAllLevel";

@Injectable({providedIn: 'root'})
export class SemesterStudentService {
  constructor(private _dialog: MsDialog) {}


  addAllDepartment(semesterDepartment: SemesterDepartment): Observable<SemesterStudent[]> {
    const dialogRef = this._dialog.open(SemesterStudentAddAllDepartment, { autoFocus: false, data: {semesterDepartment}});
    return dialogRef.afterClosed();
  }

  addAllLevel(semesterLevel: SemesterLevel): Observable<SemesterStudent[]> {
    const dialogRef = this._dialog.open(SemesterStudentAddAllLevel, { autoFocus: false, data: {semesterLevel}});
    return dialogRef.afterClosed();
  }

  addAll(semester: Semester): Observable<SemesterStudent[]> {
    const dialogRef = this._dialog.open(SemesterStudentAddAll, { autoFocus: false, data: {semester}});
    return dialogRef.afterClosed();
  }

  delete(semesterStudent: SemesterStudent): Observable<SemesterStudent[]> {
    const dialogRef = this._dialog.open(SemesterStudentDelete, { autoFocus: false, data: {semesterStudent}});
    return dialogRef.afterClosed();
  }
}
