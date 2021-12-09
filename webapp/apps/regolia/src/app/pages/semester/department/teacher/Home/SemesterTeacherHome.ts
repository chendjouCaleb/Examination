import {Component, OnInit} from "@angular/core";
import {SemesterTeacher} from "@examination/models/entities";
import {CurrentItems} from "examination/app/current-items";
import {SemesterTeacherService} from "examination/app/components";
import {Router} from "@angular/router";

@Component({
  templateUrl: 'SemesterTeacherHome.html',
  selector: 'SemesterTeacherHome'
})
export class SemesterTeacherHome implements OnInit {
  semesterTeacher: SemesterTeacher;

  constructor(private currentItems: CurrentItems,
              private router: Router,
              private service: SemesterTeacherService) {
    this.semesterTeacher = currentItems.get('semesterTeacher');
  }

  async ngOnInit() {

  }

  delete() {
    this.service.deleteTeacher(this.semesterTeacher).then(result => {
      if(result) {
        this.router.navigateByUrl(this.semesterTeacher.semesterDepartment.url('teachers'))
      }
    })
  }
}
