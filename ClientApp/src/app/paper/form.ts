import {EvFormControl, EvFormGroup} from "examination/controls";
import {PaperPeriodModel, PaperReportModel} from "examination/models";

export class PaperPeriodForm extends EvFormGroup<PaperPeriodModel> {
  constructor(value:any = {}) {
    super({
      day: new EvFormControl("day",  value.day),
      startHour: new EvFormControl("startHour",  value.startHour),
      endHour: new EvFormControl("endHour",  value.endHour)
    });
  }

  getModel(): PaperPeriodModel {
    const model = new PaperPeriodModel();
    model.day = this.controls.day.value;
    model.startHour = this.controls.startHour.value;
    model.endHour = this.controls.endHour.value;
    return model;
  }
}


export class PaperReportForm extends EvFormGroup<PaperReportModel> {
  constructor(value:any = {}) {
    super({
      anonymity: new EvFormControl("anonymity",  value.anonymity),
      comment: new EvFormControl("comment",  value.comment)
    });
  }

  getModel(): PaperReportModel {
    const model = new PaperReportModel();
    model.anonymity = this.controls.anonymity.value;
    model.comment = this.controls.comment.value;
    return model;
  }
}
