import {EvFormControl, EvFormGroup} from "examination/controls";
import {ExaminationAddModel, ExaminationDateModel, ExaminationNameModel} from "examination/models";

export class ExaminationAddForm extends EvFormGroup<ExaminationAddModel> {
  constructor() {
    super({
      name: new EvFormControl("name", ""),
      expectedStartDate: new EvFormControl("expectedStartDate", ""),
      expectedEndDate: new EvFormControl("expectedEndDate", ""),
      requireSpeciality: new EvFormControl("requireSpeciality", false)
    });
  }

  getModel(): ExaminationAddModel {
    const model = new ExaminationAddModel();
    model.name = this.controls.name.value;
    model.expectedStartDate = this.controls.expectedStartDate.value;
    model.expectedEndDate = this.controls.expectedEndDate.value;
    model.requireSpeciality = this.controls.requireSpeciality.value;
    return model;
  }
}


export class ExaminationNameForm extends EvFormGroup<ExaminationNameModel> {
  constructor(value: string) {
    super({
      name: new EvFormControl("name", value)
    });
  }

  getModel(): ExaminationNameModel {
    const model = new ExaminationNameModel();
    model.name = this.controls.name.value;
    return model;
  }

  get control() {
    return this.getControl('name');
  }
}


export class ExaminationDateForm extends EvFormGroup<ExaminationDateModel> {
  constructor(value) {
    super({
      date: new EvFormControl("date", value)
    });
  }

  getModel(): ExaminationDateModel {
    const model = new ExaminationDateModel();
    model.date = this.controls.date.value;
    return model;
  }

  get control() {
    return this.getControl('date');
  }
}
