import {Component} from '@angular/core';
import {SemesterStudent} from 'examination/entities';
import {CurrentItems} from "../../../../../current-items";
import {ActivatedRoute} from "@angular/router";
import {SemesterStudentLoader} from "../../../../../../models/loader/semester/semester-student.loader";

@Component({
  templateUrl: 'SemesterStudentLayout.html',
  selector: 'SemesterStudentLayout'
})
export class SemesterStudentLayout {
  semesterStudent: SemesterStudent;

  constructor(currentItems: CurrentItems,
              private activeRoute: ActivatedRoute,
              private loader: SemesterStudentLoader) {
    const id = +activeRoute.snapshot.paramMap.get('semesterStudentId');

    this.loader.loadById(id).then(item => {
      this.semesterStudent = item;
    })
  }
}
