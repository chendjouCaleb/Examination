import {IStudentService, STUDENT_SERVICE_TOKEN} from "../student.service.interface";

﻿import {Component, Inject, Input} from "@angular/core";
import {Student} from "examination/models";
import {MsfModalRef} from "fabric-docs";

@Component({
  templateUrl: 'student-details.html'
})
export class StudentDetails {
  @Input()
  student: Student;

  constructor(@Inject(STUDENT_SERVICE_TOKEN) public _studentService: IStudentService,
              private _modal: MsfModalRef<StudentDetails>) {}

  delete() {
    this._studentService.deleteStudent(this.student).then((result) => {
      if(result && this._modal) {
        this._modal.close();
      }
    })
  }
}
