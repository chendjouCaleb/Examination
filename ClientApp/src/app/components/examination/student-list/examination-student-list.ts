import {Component, Inject, Input, OnInit} from '@angular/core';
import {
  Examination,
  ExaminationDepartment,
  ExaminationLevel,
  ExaminationLevelSpeciality,
  ExaminationSpeciality,
  ExaminationStudent
} from 'examination/entities';
import {ExaminationStudentLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from "../examination.service.contract";

@Component({
  templateUrl: 'examination-student-list.html',
  selector: 'app-examination-student-list'
})
export class ExaminationStudentList implements OnInit {
  @Input()
  examination: Examination;

  @Input()
  examinationDepartment: ExaminationDepartment;

  @Input()
  examinationLevel: ExaminationLevel;

  @Input()
  examinationSpeciality: ExaminationSpeciality;

  @Input()
  examinationLevelSpeciality: ExaminationLevelSpeciality;

  constructor(private _examinationStudentLoader: ExaminationStudentLoader,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService ) {
  }

  ngOnInit(): void {
    if (this.examinationLevelSpeciality) {
      this._examinationStudentLoader.loadByExaminationLevelSpeciality(this.examinationLevelSpeciality);
    }

    if (this.examinationLevel) {
      this._examinationStudentLoader.loadByExaminationLevel(this.examinationLevel);
    }

    if (this.examinationSpeciality) {
      this._examinationStudentLoader.loadByExaminationSpeciality(this.examinationSpeciality);
    }

    if (this.examinationDepartment) {
      this._examinationStudentLoader.loadByExaminationDepartment(this.examinationDepartment);
    }

    if (this.examination) {
      this._examinationStudentLoader.loadByExamination(this.examination);
    }

  }

  get examinationStudents(): List<ExaminationStudent> {
    if (this.examinationLevelSpeciality) {
      return this.examinationLevelSpeciality.examinationStudents;
    }

    if (this.examinationLevel) {
      return this.examinationLevel.examinationStudents;
    }

    if (this.examinationSpeciality) {
      return this.examinationSpeciality.examinationStudents;
    }

    if (this.examinationDepartment) {
      return this.examinationDepartment.examinationStudents;
    }

    if (this.examination) {
      return this.examination.examinationStudents;
    }
  }
}
