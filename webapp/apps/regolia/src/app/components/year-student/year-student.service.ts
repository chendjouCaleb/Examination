import {Injectable} from "@angular/core";
import {Year, YearStudent} from "@examination/entities";
import {Observable} from "rxjs";
import {MsDialog} from "@ms-fluent/components";
import {YearStudentAddAll} from "./AddAll/YearStudentAddAll";
import {YearStudentDelete} from "./Delete/YearStudentDelete";

@Injectable({providedIn: 'root'})
export class YearStudentService {

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
