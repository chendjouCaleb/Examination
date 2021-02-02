import {Component, Inject, Input, OnInit} from "@angular/core";
import {ExaminationStudent, ExaminationStudentStatistics, Student} from "examination/entities";
import {PaperLoader} from "examination/loaders";
import {IPaperService, PAPER_SERVICE_TOKEN} from "examination/app/components/paper";

@Component({
  templateUrl: 'examination-student-details.html',
  selector: 'app-examination-student-details'
})
export class ExaminationStudentDetails  implements OnInit {
  @Input()
  examinationStudent: ExaminationStudent;

  constructor(private _paperLoader: PaperLoader,
              @Inject(PAPER_SERVICE_TOKEN) public paperService: IPaperService) {}

  ngOnInit(): void {
    this._paperLoader.loadByExaminationStudent(this.examinationStudent);
  }

  get student(): Student {
    return this.examinationStudent.student;
  }

  get statistics(): ExaminationStudentStatistics {
    return this.examinationStudent.statistics;
  }
}
