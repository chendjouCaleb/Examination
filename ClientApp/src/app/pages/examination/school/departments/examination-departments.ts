import {Component, Inject, Input, OnInit} from "@angular/core";
import {Examination} from "examination/entities";
import {ExaminationDepartmentLoader, ExaminationLevelLoader, ExaminationSpecialityLoader} from "examination/loaders";
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from "examination/app/components";

@Component({
  templateUrl: 'examination-departments.html',
  selector: 'app-examination-departments'
})
export class ExaminationDepartments implements OnInit{
  @Input()
  examination: Examination;

  constructor(private _examinationDepartmentLoader: ExaminationDepartmentLoader,
              private _examinationSpecialityLoader: ExaminationSpecialityLoader,
              private _examinationLevelLoader: ExaminationLevelLoader,
              @Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService) {

  }

  async ngOnInit() {
    await this._examinationDepartmentLoader.loadByExamination(this.examination);
    await this._examinationSpecialityLoader.loadByExamination(this.examination);
    await this._examinationLevelLoader.loadByExamination(this.examination);

    this.examination.examinationDepartments.forEach(d => {
      d.examinationLevels = this.examination.examinationLevels.findAll(l => l.examinationDepartmentId === d.id);
      d.examinationSpecialities = this.examination.examinationSpecialities.findAll(l => l.examinationDepartmentId === d.id);
    })
  }
}
