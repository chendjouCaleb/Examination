import {AfterViewInit, Component, Optional} from '@angular/core';
import {School, SemesterSpeciality} from 'examination/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentItems} from '../../../../current-items';

@Component({
  templateUrl: 'SemesterSpecialityPageLayout.html',
})
export class SemesterSpecialityPageLayout implements AfterViewInit {
  school: School;
  semesterSpeciality: SemesterSpeciality;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
    this.semesterSpeciality = currentItems.get('semesterSpeciality');
  }

  ngAfterViewInit(): void {
  }


  url(path: string): string {
    return this.school.getUrl(path);
  }
}
