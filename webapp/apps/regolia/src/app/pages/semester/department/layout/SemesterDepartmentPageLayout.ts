import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Semester} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrentItems} from '../../../../current-items';

@Component({
  templateUrl: 'SemesterDepartmentPageLayout.html',
})
export class SemesterDepartmentPageLayout implements AfterViewInit {
  school: School;
  semester: Semester;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
    this.semester = currentItems.get('semester');
  }

  ngAfterViewInit(): void {
  }


  url(path: string): string {
    return this.school.getUrl(path);
  }
}
