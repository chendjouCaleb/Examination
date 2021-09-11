import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ExaminationStudent, Student} from 'examination/entities';
import {ExaminationStudentLoader} from 'examination/loaders';
import {List} from '@positon/collections';
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from 'examination/app/components';
import {MsTable} from "@ms-fluent/components";

@Component({
  templateUrl: 'student-examinations.html',
  selector: 'app-student-examinations'
})
export class StudentExaminations implements OnInit {
  @Input()
  student: Student;

  @ViewChild(MsTable)
  table: MsTable;

  examinationStudents: ExaminationStudent[] = [];

  constructor(private _examinationStudentLoader: ExaminationStudentLoader,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService) {
  }

  async ngOnInit() {
    if (this.student) {
      await this._examinationStudentLoader.loadByStudent(this.student);
    }


    this.examinationStudents = this.getExaminationStudents().toArray();

    this.table.unshift(...this.examinationStudents)
  }

  getExaminationStudents(): List<ExaminationStudent> {
    if (this.student) {
      return this.student.examinationStudents;
    }
  }
}
