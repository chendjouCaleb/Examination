﻿import {Component, EventEmitter, Inject, Input, OnInit, Output} from "@angular/core";
import {School} from "examination/entities";
import {ISchoolService, SCHOOL_SERVICE_TOKEN} from "../school.service.interface";
import {ApplicationService} from "../../member/application";

@Component({
  templateUrl: 'school-banner.html',
  styleUrls: ['school-banner.scss'],
  selector: 'app-school-banner',

})
export class SchoolBanner implements OnInit {
  @Input()
  school: School;

  @Output()
  onSchoolDelete = new EventEmitter();

  imageUrl: string = 'https://cdn.spacetelescope.org/archives/images/wallpaper1/potw1345a.jpg';

  constructor(@Inject(SCHOOL_SERVICE_TOKEN) public service: ISchoolService,
              public applicationService: ApplicationService) {
  }

  ngOnInit(): void {
    if (this.school.hasImage) {
      this.imageUrl = this.school.imageUrl;
    }
  }

  changeImage() {
    this.service.changeImage(this.school).then(changed => {
      if (changed) {
        this.imageUrl = this.school.imageUrl;
      }
    })
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
