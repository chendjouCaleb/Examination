import {Component} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExaminationStudentLoader} from 'examination/loaders';
import {ExaminationStudent} from 'examination/entities';

@Component({
  templateUrl: 'examination.student.page.html'
})
export class ExaminationStudentPage {
  examinationStudent: ExaminationStudent;
  constructor(private route: ActivatedRoute,
              private examinationStudentLoader: ExaminationStudentLoader) {
    const id = +route.snapshot.paramMap.get('examinationStudentId');

    this.examinationStudentLoader.loadById(id).then(result => this.examinationStudent = result);
  }
}
