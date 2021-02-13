import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Department} from 'examination/entities';
import {DEPARTMENT_SERVICE_TOKEN, IDepartmentService} from '../department.service.interface';
import {IApplicationService, STUDENT_APPLICATION_SERVICE_TOKEN} from "examination/app/components/member/application";

@Component({
  templateUrl: 'department-banner.html',
  selector: 'app-department-banner',

})
export class DepartmentBanner implements OnInit {
  @Input()
  department: Department;

  @Output()
  onDepartmentDelete = new EventEmitter();

  imageUrl: string = 'https://cdn.spacetelescope.org/archives/images/wallpaper1/potw1345a.jpg';

  constructor(@Inject(DEPARTMENT_SERVICE_TOKEN) public service: IDepartmentService,
              @Inject(STUDENT_APPLICATION_SERVICE_TOKEN) public applicationService: IApplicationService) {
  }

  ngOnInit(): void {
    if (this.department.hasImage) {
      this.imageUrl = this.department.imageUrl;
    }
  }

  changeImage() {
    this.service.changeImage(this.department).then(changed => {
      if (changed) {
        this.imageUrl = this.department.imageUrl;
      }
    });
  }

  changeCoverImage() {
    this.service.changeCoverImage(this.department);
  }

  delete() {
    this.service.delete(this.department).then(deleted => {
      if (deleted) {
        this.onDepartmentDelete.emit();
      }
    });
  }

  sendApplication() {
    this.applicationService.add({department: this.department});
  }
}
