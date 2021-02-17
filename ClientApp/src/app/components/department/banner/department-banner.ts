import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Department} from 'examination/entities';
import {DEPARTMENT_SERVICE_TOKEN, IDepartmentService} from '../department.service.interface';
import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from 'examination/app/components/member/application';
import {Router} from '@angular/router';

@Component({
  templateUrl: 'department-banner.html',
  selector: 'app-department-banner',

})
export class DepartmentBanner implements OnInit {
  @Input()
  department: Department;

  @Output()
  onDepartmentDelete = new EventEmitter();

  constructor(@Inject(DEPARTMENT_SERVICE_TOKEN) public service: IDepartmentService,
              private _router: Router,
              @Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public applicationService: IApplicationService) {
  }

  ngOnInit(): void { }

  changeImage() {
    this.service.changeImage(this.department).then();
  }

  changeCoverImage() {
    this.service.changeCoverImage(this.department).then();
  }

  delete() {
    this.service.delete(this.department).then(deleted => {
      if (deleted) {
        this._router.navigateByUrl(this.department.url).then();
      }
    });
  }

  sendApplication() {
    this.applicationService.add({department: this.department});
  }
}
