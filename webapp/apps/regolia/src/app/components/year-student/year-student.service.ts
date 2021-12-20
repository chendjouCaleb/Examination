import {Injectable} from "@angular/core";
import {Year, YearDepartment, YearLevel, YearStudent} from "@examination/entities";
import {Observable} from "rxjs";
import {MsDialog} from "@ms-fluent/components";
import {YearStudentAddAll} from "./AddAll/YearStudentAddAll";
import {YearStudentDelete} from "./Delete/YearStudentDelete";
import {YearStudentAddAllLevel} from "examination/app/components/year-student/AddAll/YearStudentAddAllLevel";
import {YearStudentAddAllDepartment} from "examination/app/components/year-student/AddAll/YearStudentAddAllDepartment";

@Injectable({providedIn: 'root'})
export class YearStudentService {

  addAllDepartment(yearDepartment: YearDepartment): Observable<YearStudent[]> {
    const dialogRef = this._dialog.open(YearStudentAddAllDepartment, { autoFocus: false, data: {yearDepartment}});
    return dialogRef.afterClosed();
  }

  addAllLevel(yearLevel: YearLevel): Observable<YearStudent[]> {
    const dialogRef = this._dialog.open(YearStudentAddAllLevel, { autoFocus: false, data: {yearLevel}});
    return dialogRef.afterClosed();
  }

  constructor(private _dialog: MsDialog) {}

  addAll(year: Year): Observable<YearStudent[]> {
    const dialogRef = this._dialog.open(YearStudentAddAll, { autoFocus: false, data: {year}});
    return dialogRef.afterClosed();
  }

  delete(yearStudent: YearStudent): Observable<YearStudent[]> {
    const dialogRef = this._dialog.open(YearStudentDelete, { autoFocus: false, data: {yearStudent}});
    return dialogRef.afterClosed();
  }
}
