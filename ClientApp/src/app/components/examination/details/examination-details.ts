import {Component, Inject, Input} from "@angular/core";
import {Examination} from "examination/entities";
import {EXAMINATION_SERVICE_TOKEN, IExaminationService} from "../examination.service.contract";

@Component({
  templateUrl: 'examination-details.html',
  selector: 'app-examination-details'
})
export class ExaminationDetails {
  @Input()
  examination: Examination;

  constructor(@Inject(EXAMINATION_SERVICE_TOKEN) public service: IExaminationService) {}
}
