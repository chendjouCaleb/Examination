import {Component, Input} from '@angular/core';
import {YearStudent} from 'examination/entities';
import {Router} from '@angular/router';
import {YearStudentService} from "@examination/components";

@Component({
  templateUrl: 'YearStudentHome.page.html',
  selector: 'YearStudentHome'
})
export class YearStudentHomePage {
  @Input()
  yearStudent: YearStudent;


  constructor(private router: Router, private _service: YearStudentService) {
  }

  delete() {
    this._service.delete(this.yearStudent).subscribe(deleted => {
      if(deleted) {
        this.router.navigateByUrl(`${this.yearStudent.yearLevel.url('students')}`)
      }
    })
  }
}
