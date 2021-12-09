import {Component} from "@angular/core";
import {YearTeacher} from "@examination/models/entities";
import {CurrentItems} from "../../../../current-items";

@Component({
  templateUrl: 'YearTeacherLayout.page.html',
  selector: 'YearTeacherLayout'
})
export class YearTeacherLayoutPage {
  yearTeacher: YearTeacher;

  constructor(private currentItems: CurrentItems) {
    this.yearTeacher = currentItems.get('yearTeacher');
  }
}
