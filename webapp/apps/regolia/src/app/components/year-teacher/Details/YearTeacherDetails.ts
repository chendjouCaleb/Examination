import {Component, Input} from "@angular/core";
import {YearTeacher} from "@examination/models/entities";

@Component({
  templateUrl: 'YearTeacherDetails.html',
  selector: 'YearTeacherDetails'
})
export class YearTeacherDetails {
  @Input()
  yearTeacher: YearTeacher;

  @Input()
  returnUrl: string;
}
