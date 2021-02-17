import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {School} from 'examination/entities';
import {ISchoolService, SCHOOL_SERVICE_TOKEN} from '../school.service.interface';
import {ApplicationService} from '../../member/application';

@Component({
  templateUrl: 'school-banner.html',
  encapsulation: ViewEncapsulation.None,
  selector: 'app-school-banner',
  host: {
    'class': 'school-banner'
  }
})
export class SchoolBanner implements OnInit {
  @Input()
  school: School;

  @Output()
  onSchoolDelete = new EventEmitter();

  constructor(@Inject(SCHOOL_SERVICE_TOKEN) public service: ISchoolService,
              private _elementRef: ElementRef<HTMLElement>,
              public applicationService: ApplicationService) {
  }

  ngOnInit(): void { }

  changeImage() {
    this.service.changeImage(this.school);
  }

  changeCoverImage() {
    this.service.changeCoverImage(this.school);
  }

  delete() {
    this.service.delete(this.school).then(deleted => {
      if (deleted) {
        this.onSchoolDelete.emit();
      }
    });
  }

  sendApplication() {
    this.applicationService.add({school: this.school});
  }
}
