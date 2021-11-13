import {IStudentService, STUDENT_SERVICE_TOKEN} from '../student.service.interface';
import {Component, Inject, Input, Optional} from '@angular/core';
import {Student} from 'examination/models';
import {MsDialogRef} from '@ms-fluent/components';

@Component({
  templateUrl: 'student-details.html',
  selector: 'app-student-details, StudentDetails'
})
export class StudentDetails {
  @Input()
  student: Student;

  constructor(@Inject(STUDENT_SERVICE_TOKEN) public _studentService: IStudentService,
              @Optional() private _modal: MsDialogRef<StudentDetails>) {
  }

  delete() {
    this._studentService.deleteStudent(this.student).then((result) => {
      if (result && this._modal) {
        this._modal?.close();
      }
    })
  }
}
