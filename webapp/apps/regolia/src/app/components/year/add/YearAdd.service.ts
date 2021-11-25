import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {School, Year} from "examination/models";
import {MsDialog} from "@ms-fluent/components";
import {YearDate} from "./date/YearDate";
import {YearAdd} from "./YearAdd";

@Injectable({
  providedIn: 'root'
})
export class YearAddService {
  constructor(private dialog: MsDialog) {}

  add(school: School): Observable<Year> {
    const modelRef = this.dialog.open(YearAdd);
    modelRef.componentInstance.school = school;

    return modelRef.afterClosed();
  }

  changeDate(year: Year): Observable<void> {
    const modalRef = this.dialog.open(YearDate, { data: {year}});

    return modalRef.afterClosed();
  }
}
