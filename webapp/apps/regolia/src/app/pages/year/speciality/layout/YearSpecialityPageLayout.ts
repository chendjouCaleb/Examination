import {AfterViewInit, Component, Optional} from '@angular/core';
import {School, Year, YearDepartment, YearSpeciality} from 'examination/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {RibbonPageLayout} from "../../../../../infrastructure";

@Component({
  templateUrl: 'YearSpecialityPageLayout.html',
})
export class YearSpecialityPageLayout extends RibbonPageLayout implements AfterViewInit {
  school: School;
  yearDepartment: YearDepartment;
  year: Year;
  yearSpeciality: YearSpeciality;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    super();
    this.school = currentItems.get('school');
    this.yearDepartment = currentItems.get('yearDepartment');
    this.year = currentItems.get('year');
    this.yearSpeciality = currentItems.get('yearSpeciality');
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.initView();
    })
  }

  url(path: string): string {
    return this.yearSpeciality.url(path);
  }
}
