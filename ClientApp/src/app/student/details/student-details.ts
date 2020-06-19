import {Component, Input} from "@angular/core";
import {Student} from "examination/models";

@Component({
  templateUrl: 'student-details.html'
})
export class StudentDetails {
  @Input()
  student: Student;
}
