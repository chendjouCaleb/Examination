import {Component} from '@angular/core';
import {Examination, School} from 'examination/models';
import {Router} from '@angular/router';
import {CurrentItems} from 'examination/app/current-items';

@Component({
  templateUrl: 'school-examinations.page.html'
})
export class SchoolExaminationsPage {
  school: School;

  constructor(private currentItems: CurrentItems,
              public router: Router) {
    this.school = this.currentItems.get('school');
  }


  examinationClick(examination: Examination) {
    this.router.navigateByUrl(examination.url)
  }

}
