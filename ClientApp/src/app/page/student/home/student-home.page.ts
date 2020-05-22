﻿import {Component} from '@angular/core';
import {Student} from "examination/models";
import {CurrentItems} from "examination/app/current-items";

@Component({
  templateUrl: 'student-home.page.html',
  selector: 'app-student-home'
})
export class StudentHomePage {
  student: Student;

  constructor(currentItems: CurrentItems) {
    this.student = currentItems.get('student');
  }
}
