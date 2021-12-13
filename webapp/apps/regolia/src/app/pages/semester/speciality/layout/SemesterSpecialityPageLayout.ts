import {AfterViewInit, Component, Optional} from '@angular/core';
import {School, Semester, SemesterDepartment, SemesterSpeciality, Year} from 'examination/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {RibbonPageLayout} from "../../../../../infrastructure";

@Component({
  templateUrl: 'SemesterSpecialityPageLayout.html',
})
export class SemesterSpecialityPageLayout extends RibbonPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  semester: Semester;
  semesterDepartment: SemesterDepartment;
  semesterSpeciality: SemesterSpeciality;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    super();
    this.school = currentItems.get('school');
    this.semesterSpeciality = currentItems.get('semesterSpeciality');

    this.semesterDepartment = currentItems.get('semesterDepartment');
    this.semester = currentItems.get('semester');
    this.year = this.semester.year;
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.initView();
    })
  }


  url(path: string): string {
    return this.semesterSpeciality?.url(path);
  }
}
