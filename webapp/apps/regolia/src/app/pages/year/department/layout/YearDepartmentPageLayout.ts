import {AfterViewInit, Component, Optional, ViewChild} from '@angular/core';
import {School} from 'examination/entities';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {CurrentItems} from '../../../../current-items';

@Component({
  templateUrl: 'YearDepartmentPageLayout.html',
})
export class YearDepartmentPageLayout implements AfterViewInit {
  school: School;

  @ViewChild(RouterLink)
  private activeLink : RouterLink;

  constructor(public _router: Router, currentItems: CurrentItems,
              @Optional() private route: ActivatedRoute) {
    this.school = currentItems.get('school');
  }

  ngAfterViewInit(): void {
  }


  url(path: string): string {
    return this.school.getUrl(path);
  }
}
