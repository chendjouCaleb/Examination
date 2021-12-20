import {AfterViewInit, Component, Optional} from '@angular/core';
import {School, Year, YearDepartment, YearLevel, YearLevelSpeciality} from 'examination/entities';
import {ActivatedRoute, Router} from '@angular/router';
import {CurrentItems} from '../../../../current-items';
import {RibbonPageLayout} from "../../../../../infrastructure";

@Component({
  templateUrl: 'YearLevelSpecialityPageLayout.html',
})
export class YearLevelSpecialityPageLayout extends RibbonPageLayout implements AfterViewInit {
  school: School;

  yearLevelSpeciality: YearLevelSpeciality;
  yearDepartment: YearDepartment;
  yearLevel: YearLevel;
  year: Year;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    super();
    this.school = currentItems.get('school');
    this.yearLevelSpeciality = currentItems.get('yearLevelSpeciality');
    this.yearDepartment = currentItems.get('yearDepartment');
    this.yearLevel = currentItems.get('yearLevel');
    this.year = this.yearDepartment.year;
  }

  ngAfterViewInit(): void {
    Promise.resolve().then(() => this.initView())
  }


  url(path: string): string {
    return this.yearLevelSpeciality.url(path);
  }

  get specialityName(): string {
    return this.yearLevelSpeciality?.specialityName;
  }

  get departmentName(): string {
    return this.yearDepartment.department?.name;
  }
}
