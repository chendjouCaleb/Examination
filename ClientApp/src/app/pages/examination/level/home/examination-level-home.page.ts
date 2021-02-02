import {Component, Input, OnInit} from '@angular/core';
import {ExaminationLevel} from 'examination/entities';
import {ExaminationLevelSpecialityLoader, ExaminationStudentLoader} from 'examination/loaders';

@Component({
  templateUrl: 'examination-level-home.page.html',
  selector: 'app-examination-level-home-page'
})
export class ExaminationLevelHomePage implements OnInit {
  @Input()
  examinationLevel: ExaminationLevel;

  constructor(private _examinationLevelSpecialityLoader: ExaminationLevelSpecialityLoader,
              private _examinationStudentLoader: ExaminationStudentLoader) {
  }

  async ngOnInit() {
    this._examinationLevelSpecialityLoader.loadByExaminationLevel(this.examinationLevel);

    if(this.statistics.minStudent) {
      this.statistics.minStudent.examinationStudent =
        await this._examinationStudentLoader.loadById(this.statistics.minStudent.examinationStudentId);
      console.log(this.statistics.minStudent.examinationStudent)
    }

    if(this.statistics.maxStudent) {
      this.statistics.maxStudent.examinationStudent =
        await this._examinationStudentLoader.loadById(this.statistics.maxStudent.examinationStudentId)
    }
  }


  get statistics() {
    return this.examinationLevel.statistics;
  }
}
