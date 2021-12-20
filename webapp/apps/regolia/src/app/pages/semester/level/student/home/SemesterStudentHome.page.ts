import {Component, Input} from '@angular/core';
import {SemesterStudent} from 'examination/entities';
import {Router} from '@angular/router';
import {SemesterStudentService} from "@examination/components";

@Component({
  templateUrl: 'SemesterStudentHome.page.html',
  selector: 'SemesterStudentHome'
})
export class SemesterStudentHomePage {
  @Input()
  semesterStudent: SemesterStudent;


  constructor(private router: Router, private _service: SemesterStudentService) {
  }

  delete() {
    this._service.delete(this.semesterStudent).subscribe(deleted => {
      if(deleted) {
        this.router.navigateByUrl(`${this.semesterStudent.semesterLevel.url('students')}`)
      }
    })
  }
}
