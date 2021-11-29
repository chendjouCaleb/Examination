import {Component, Input, OnInit} from "@angular/core";
import {YearStudent} from "@examination/models/entities";
import {YearStudentService} from "../year-student.service";
import {Router} from "@angular/router";

@Component({
  selector: 'YearStudentDetails',
  templateUrl: 'YearStudentDetails.html'
})
export class YearStudentDetails implements OnInit {
  @Input()
  yearStudent: YearStudent;

  @Input()
  returnUrl: string = '';

  constructor(private service: YearStudentService, private _router: Router) {}

  ngOnInit(): void {
    if(!this.returnUrl) {
      this.returnUrl = this.yearStudent.yearLevel.url('students');
    }
  }

  delete() {
    this.service.delete(this.yearStudent).subscribe(result => {
      if(result) {
        this._router.navigateByUrl(this.returnUrl);
      }
    })

  }
}
