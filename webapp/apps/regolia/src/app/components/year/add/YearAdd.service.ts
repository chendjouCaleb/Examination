import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {School, Year} from "examination/models";
import {MsDialog} from "@ms-fluent/components";
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
}
