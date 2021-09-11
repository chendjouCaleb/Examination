import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {
  Examination,
  ExaminationDepartment,
  ExaminationLevel,
  ExaminationLevelSpeciality,
  ExaminationSpeciality,
  ExaminationStudent, Student
} from 'examination/entities';
import {ExaminationStudentLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from '../examination.service.contract';
import {MsPaginator, MsPaginatorItemsFn, MsTable} from "@ms-fluent/components";

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

  @ViewChild(MsTable)
  table: MsTable;

  @ViewChild(MsPaginator)
  paginator: MsPaginator<Student>;

  examinationStudents: ExaminationStudent[] = [];
  filterValue: string = '';

  _isLoaded: boolean = false;
  _isLoading: boolean = true;

  itemsFn: MsPaginatorItemsFn<ExaminationStudent> = (page: number, size: number) => {
    return Promise.resolve(this.items.slice(page * size, page * size + size));
  };

  constructor(private _examinationStudentLoader: ExaminationStudentLoader,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService) {
  }

  async ngOnInit() {
    try {
      if (this.examinationLevelSpeciality) {
        await this._examinationStudentLoader.loadByExaminationLevelSpeciality(this.examinationLevelSpeciality);
      }

      if (this.examinationLevel) {
        await this._examinationStudentLoader.loadByExaminationLevel(this.examinationLevel);
      }

      if (this.examinationSpeciality) {
        await this._examinationStudentLoader.loadByExaminationSpeciality(this.examinationSpeciality);
      }

      if (this.examinationDepartment) {
        await this._examinationStudentLoader.loadByExaminationDepartment(this.examinationDepartment);
      }

      if (this.examination) {
        await this._examinationStudentLoader.loadByExamination(this.examination);
      }

      this.examinationStudents = this.getExaminationStudents().toArray()
        .sort((a, b) => a.student.fullName.localeCompare(b.student.fullName));

      this._isLoaded = true;
      this._isLoading = false;
    } catch (e) {
      this._isLoading = false;
    }
  }

  search() {
    this.paginator.totalSize = this.items.length;
    this.paginator.reset(0);
  }

  getExaminationStudents(): List<ExaminationStudent> {
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

  get items(): ExaminationStudent[] {
    if (this.filterValue) {
      return this.examinationStudents.filter(s =>
        s.student.fullName.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) > -1
        || s.student.registrationId.toLocaleLowerCase().indexOf(this.filterValue.toLocaleLowerCase()) > -1);
    }
    return this.examinationStudents.slice();
  }
}
