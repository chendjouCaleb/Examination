import {Component} from "@angular/core";
import {SemesterTeacher} from "@examination/models/entities";
import {CurrentItems} from "../../../../current-items";

@Component({
  templateUrl: 'SemesterTeacherLayout.page.html',
  selector: 'SemesterTeacherLayout'
})
export class SemesterTeacherLayoutPage {
  semesterTeacher: SemesterTeacher;

  constructor(private currentItems: CurrentItems) {
    this.semesterTeacher = currentItems.get('yearTeacher');
  }
}
