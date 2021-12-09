import {Component, OnInit} from "@angular/core";
import {SemesterTeacher, YearTeacher} from "@examination/models/entities";
import {CurrentItems} from "examination/app/current-items";
import {YearTeacherService} from "examination/app/components";
import {Router} from "@angular/router";
import {SemesterTeacherHttpClient} from "@examination/http";
import {SemesterTeacherLoader} from "@examination/loaders";

@Component({
  templateUrl: 'YearTeacherHome.html',
  selector: 'YearTeacherHome'
})
export class YearTeacherHome implements OnInit {
  yearTeacher: YearTeacher;

  semesterTeachers: SemesterTeacher[];

  constructor(private currentItems: CurrentItems,
              private router: Router,
              private semesterTeacherHttpClient: SemesterTeacherHttpClient,
              private semesterTeacherLoader: SemesterTeacherLoader,
              private service: YearTeacherService) {
    this.yearTeacher = currentItems.get('yearTeacher');
  }

  async ngOnInit() {
    const semesterTeachers = await this.semesterTeacherHttpClient.list({yearTeacherId: this.yearTeacher.id});


    this.semesterTeachers = semesterTeachers.toArray();
  }

  delete() {
    this.service.deleteTeacher(this.yearTeacher).then(result => {
      if(result) {
        this.router.navigateByUrl(this.yearTeacher.yearDepartment.url('teachers'))
      }
    })
  }
}
