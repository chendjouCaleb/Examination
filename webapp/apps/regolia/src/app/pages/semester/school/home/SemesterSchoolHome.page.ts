import {Component} from "@angular/core";
import {CurrentItems} from "../../../../current-items";
import {Router} from "@angular/router";
import {Semester, SemesterLoader, Year} from "examination/models";
import {SemesterAddService, YearAddService} from "@examination/components";

@Component({
  templateUrl: 'SemesterSchoolHome.page.html',
})
export class SemesterSchoolHomePage {
  semester: Semester;

  constructor(items: CurrentItems,
              private _service: SemesterAddService) {
    this.semester = items.get('semester');
  }

  addSemester() {

  }

  changeDate() {

  }
}
