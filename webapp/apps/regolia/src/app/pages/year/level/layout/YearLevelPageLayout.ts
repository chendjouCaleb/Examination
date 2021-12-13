import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School, Year, YearDepartment, YearLevel} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {RibbonPageLayout} from "../../../../../infrastructure";

@Component({
  templateUrl: 'YearLevelPageLayout.html',
})
export class YearLevelPageLayout extends RibbonPageLayout implements AfterViewInit {
  school: School;
  year: Year;
  yearDepartment: YearDepartment;
  yearLevel: YearLevel;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    super();
    this.school = currentItems.get('school');
    this.yearDepartment = currentItems.get('yearDepartment');
    this.year = currentItems.get('year');
    this.yearLevel = currentItems.get('yearLevel');
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => {
      this.initView();
    })
  }


  url(path: string): string {
    return this.yearLevel.url(path);
  }
}
