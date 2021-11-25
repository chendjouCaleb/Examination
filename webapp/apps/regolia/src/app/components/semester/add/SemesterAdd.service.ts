import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Semester, Year} from "examination/models";
import {MsDialog} from "@ms-fluent/components";
import {SemesterAdd} from "./SemesterAdd";

@Injectable({
  providedIn: 'root'
})
export class SemesterAddService {
  constructor(private dialog: MsDialog) {}

  add(year: Year): Observable<Semester> {
    const modelRef = this.dialog.open(SemesterAdd, {data: {year}});

    return modelRef.afterClosed();
  }
}
