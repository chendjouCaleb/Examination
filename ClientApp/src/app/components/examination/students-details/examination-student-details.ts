import {Component, Inject, Input, OnInit, ViewChild} from '@angular/core';
import {ExaminationStudent, ExaminationStudentStatistics, Paper, Student} from 'examination/entities';
import {PaperLoader} from 'examination/loaders';
import {IPaperService, PAPER_SERVICE_TOKEN} from 'examination/app/components/paper';
import {MsTable} from '@ms-fluent/table';

@Component({
  templateUrl: 'examination-student-details.html',
  selector: 'app-examination-student-details'
})
export class ExaminationStudentDetails  implements OnInit {
  @Input()
  examinationStudent: ExaminationStudent;

  papers: Paper[] = [];

  @ViewChild(MsTable)
  table: MsTable;

  constructor(private _paperLoader: PaperLoader,
              @Inject(PAPER_SERVICE_TOKEN) public paperService: IPaperService) {}

  async ngOnInit() {
    await this._paperLoader.loadByExaminationStudent(this.examinationStudent);
    this.table.unshiftRange(this.examinationStudent.papers.toArray());
  }

  get student(): Student {
    return this.examinationStudent.student;
  }

  get statistics(): ExaminationStudentStatistics {
    return this.examinationStudent.statistics;
  }
}
