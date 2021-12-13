import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Semester, SemesterDepartment, SemesterLevel, Year} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {RibbonPageLayout} from "../../../../../infrastructure";

@Component({
  templateUrl: 'SemesterLevelPageLayout.html',
})
export class SemesterLevelPageLayout extends RibbonPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  semester: Semester;
  semesterLevel: SemesterLevel;
  semesterDepartment: SemesterDepartment;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {

    super();
    this.school = currentItems.get('school');
    this.semesterDepartment = currentItems.get('semesterDepartment');
    this.semesterLevel = currentItems.get('semesterLevel');
    this.semester = currentItems.get('semester');
    this.year = this.semester.year;
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.initView();
    })
  }


  url(path: string): string {
    return this.semesterLevel.url(path);
  }
}
