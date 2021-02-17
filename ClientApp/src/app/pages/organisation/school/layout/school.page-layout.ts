import {Component, Input} from '@angular/core';
import {School} from 'examination/entities';
import {Router} from '@angular/router';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'school.page-layout.html',
  selector: 'app-school-page-layout'
})
export class SchoolPageLayout {
  school: School;

  constructor(public _router: Router, currentItems: CurrentItems) {
    this.school = currentItems.get('school');
  }

  change(value) {
    console.log(value);
  }
}
