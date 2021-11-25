import {AfterViewInit, Component, Optional} from '@angular/core';
import {School, SemesterLevelSpeciality} from 'examination/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentItems} from '../../../../current-items';

@Component({
  templateUrl: 'SemesterLevelSpecialityPageLayout.html',
})
export class SemesterLevelSpecialityPageLayout implements AfterViewInit {
  school: School;

  semesterLevelSpeciality: SemesterLevelSpeciality;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
    this.semesterLevelSpeciality = currentItems.get('semesterLevelSpeciality');
  }

  ngAfterViewInit(): void {
  }


  url(path: string): string {
    return this.school.getUrl(path);
  }
}
