import {Component, Inject, Input} from '@angular/core';
import {Student} from 'examination/entities';
import {IStudentService, STUDENT_SERVICE_TOKEN} from 'examination/app/components';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'student-home.page.html',
  selector: 'app-student-home-page'
})
export class StudentHomePage {
  @Input()
  student: Student;

  constructor(@Inject(STUDENT_SERVICE_TOKEN) public _studentService: IStudentService,
              private router: Router) {
  }

  delete() {
    this._studentService.deleteStudent(this.student).then(result => {
      if (result) {
        this.router.navigateByUrl(this.student.level.url).then();
      }
    })
  }
}
