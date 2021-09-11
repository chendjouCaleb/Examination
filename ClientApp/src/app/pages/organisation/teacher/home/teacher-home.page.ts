import {Component, Inject, Input} from '@angular/core';
import {Teacher} from 'examination/entities';
import {ITeacherService, TEACHER_SERVICE_TOKEN} from 'examination/app/components';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'teacher-home.page.html',
  selector: 'app-teacher-home-page'
})
export class TeacherHomePage {
  @Input()
  teacher: Teacher;

  constructor(@Inject(TEACHER_SERVICE_TOKEN) public _teacherService: ITeacherService,
              private router: Router) {
  }

  delete() {
    this._teacherService.deleteTeacher(this.teacher).then(result => {
      if (result) {
        this.router.navigate([`${this.teacher.department.url}`], { queryParams: {tab: 'teachers'}}).then();
      }
    })
  }
}
